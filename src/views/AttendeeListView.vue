<template>
    <v-row id="header" class="d-flex flex-column align-end pa-4 text-right">
        <v-chip density="compact" variant="tonal" v-if="palestra?.category" :color="palestra?.category?.color">{{ palestra?.category?.name }}</v-chip>
        <h2>{{ palestra?.title }}</h2>
        <p>{{ palestra.type?.name }}</p>
        <p>{{palestra.vacancy_count}}/{{palestra.vacancy_limit}} inscrições</p>
    </v-row>

    <v-row class="pa-4 justify-content-center">
        <v-card class="mb-4 vacancy_card" v-for="attendee in attendeeList" :key="attendee.id">
            <template v-slot:prepend>
                <v-checkbox v-model="confirmed" :value="attendee.id" :label="attendee.name" hide-details></v-checkbox>
            </template>
            <template v-slot:append>
                <v-icon icon='mdi-trash-can' @click='openDelistPopup(attendee)'></v-icon>
            </template>
        </v-card>
        <v-btn color="#FF7A00" @click="confirmPresence" flat block class="mt-4">Atualizar presença</v-btn>
        <v-btn color="#FF7A00" @click='openEnrollPopup' flat block class='mt-4'>Adicionar inscrição</v-btn>
    </v-row>

    <v-dialog v-model='enrollPopup' @afterLeave='cancelEnroll'>
        <v-card>
            <v-text-field v-model='searchValue' label='Pesquisar pessoa'></v-text-field>
            <v-checkbox v-for='user in filteredUsers' v-model='usersToAdd' :key='user.name' :label='user.name' :value='user.id' hide-details></v-checkbox>
            <p>{{this.usersToAdd}}</p>
            <v-card-actions>
                <v-btn @click='this.enrollPopup = false'>Cancelar</v-btn>
                <v-btn @click='enrollUsers'>Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model='delistPopup'>
        <v-card>
            <v-card-title>Tem certeza que quer excluir essa inscrição?</v-card-title>
            <v-card-actions>
                <v-btn @click='cancelDelist'>Cancelar</v-btn>
                <v-btn @click='deleteVacancy'>Excluir</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { DateTime } from 'luxon';
import TalkService from '../services/talk.service.js';
import EventService from '@/services/event.service';
import UserService from '@/services/user.service';

export default {
    data(){
        return{
            palestra: {},

            message: '',

            attendeeList: [],
            confirmed: [],

            users: [],
            usersToAdd: [],
            searchValue: '',

            enrollPopup: false,

            delistPopup: false,
            selectedUser: null,
        }
    },
    methods:{
        confirmPresence(){
            let main = this.attendeeList.map((item)=>item.id); // array de ids do attendeeList
            let absence = main.filter((item)=> !this.confirmed.includes(item)); // ids não inclusos em confirmed
            TalkService.validatePresence(
                {
                    talk_id: this.$route.params.talkid, 
                    presence: this.confirmed, 
                    absence
                }
            )
        },

        openEnrollPopup() { this.enrollPopup = true; },

        cancelEnroll() {
            this.enrollPopup = false;
            this.usersToAdd = [];
            this.searchValue = '';
        },

        openDelistPopup(vacancy) {
            this.delistPopup = true;
            this.selectedUser = vacancy;
        },

        cancelDelist() {
            this.delistPopup = false;
            this.selectedUser = null;
        },

        deleteVacancy() {
            EventService.deleteVacancy(this.selectedUser.vacancyID).then(
                () => {
                    this.attendeeList.splice(this.attendeeList.indexOf(this.selectedUser), 1)
                    this.selectedUser = null;
                    this.delistPopup = false;
                }
            )
        },

        enrollUsers() {
            EventService.enrollAsStaff(this.$route.params.talkid, this.usersToAdd, this.$route.params.slug).then(
                () => {
                    this.cancelEnroll();
                    this.updateAttendeeList();
                    this.getTalk();
                }
            )
        },

        updateAttendeeList() {
            TalkService.getAttendeeList(this.$route.params.talkid).then(
                (response) => {
                    const users = response.vacancies.map((vacancy) => ({ ...vacancy.user, vacancyID: vacancy.id }));
                    this.attendeeList = users;
                }
            )
        },

        getTalk() {
            TalkService.getTalk(this.$route.params.talkid).then(
                (response) => this.palestra = response
            );
        }
    },
    created(){
        const exp = localStorage.getItem('exp');

        this.getTalk()

        UserService.listUsers(this.$route.params.slug).then(
            (response) => this.users = response
        );

        if(this.$store.state.auth.status.loggedIn && DateTime.now() < DateTime.fromISO(exp)){
            TalkService.checkUserVacancy(this.$route.params.talkid).then(
                (response) => this.participated = response.data.participated?.presence
            )

            this.updateAttendeeList()
        }
    },
    computed: {
        filteredUsers() {
            if (this.searchValue === '')
                return this.users;

            return this.users.filter((user) => user.name.toLowerCase().includes(this.searchValue) )
        }
    }
}
</script>
<style scoped>
#header{
    background-color: #9C66BD08;
    border-bottom-left-radius: 80px;
}

.v-card {
    width: 100%;
}

.vacancy_card {
    width: 100%;
    background-color: #FF7A0022;
    border-radius: 16px;
}
.v-label--clickable{
    opacity: 100%;
}
.v-row{
    width: 50vw;
}
@media screen and (max-width: 600px) {
    .v-row{
        width: 100vw;
    }
}
</style>
