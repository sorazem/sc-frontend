<template>
    <v-row id="header" class="d-flex flex-column align-end pa-4 text-right">
        <v-chip density="compact" variant="tonal" v-if="palestra?.category" :color="palestra?.category?.color">{{ palestra?.category?.name }}</v-chip>
        <h2>{{ palestra?.title }}</h2>
        <p>{{ palestra.type?.name }}</p>
    </v-row>
    <v-row class="pa-4 justify-content-center">
        <v-checkbox class="mb-4" v-model="confirmed" v-for="attendee in attendeeList" :value="attendee.id" :label="attendee.name" :key="attendee.id" hide-details></v-checkbox>
        <v-btn color="#FF7A00" @click="confirmPresence" flat block class="mt-4">Atualizar</v-btn>
    </v-row>
</template>
<script>
import { DateTime } from 'luxon';
import TalkService from '../services/talk.service.js';
export default {
    data(){
        return{
            palestra: {},
            message: '',
            attendeeList: [],
            confirmed: []
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
                    absence: absence}
            )
        }
    },
    created(){
        const loggedIn = JSON.parse(localStorage.getItem('user'))?.token;
        const exp = JSON.parse(localStorage.getItem('user'))?.exp;

        TalkService.getTalk(this.$route.params.talkid).then(
            (response) => this.palestra = response
        );

        if(loggedIn && DateTime.now() < DateTime.fromISO(exp)){
            TalkService.checkUserVacancy(this.$route.params.talkid).then(
                (response) => this.participated = response.data.participated?.presence
            )

            TalkService.getAttendeeList(this.$route.params.talkid).then(
                (response) =>{
                    this.attendeeList = response.users;
                }
            )
        }
    }
}
</script>
<style scoped>
#header{
    background-color: #9C66BD08;
    border-bottom-left-radius: 80px;
}
.v-checkbox{
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