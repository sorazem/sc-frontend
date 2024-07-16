<template>
    <v-row id="header" class="d-flex flex-column align-end pa-4 text-right">
        <v-chip density="compact" variant="tonal" v-if="palestra?.category" :color="palestra?.category?.color">{{ palestra?.category?.name }}</v-chip>
        <h2>{{ palestra?.title }}</h2>
        <p>{{ palestra.type?.name }}</p>
    </v-row>
    <v-row class="pa-8 align-end">
        <v-col>
            <p class="purple">Data</p>
            <p>{{ startDate }}</p>
        </v-col>
        <v-col>
            <p class="purple">Local</p>
            <p>{{ palestra.location?.name }}</p>
        </v-col>
        <v-col>
            <p class="purple">Vagas</p>
            <p>{{ palestra.vacancy_limit }}</p>
        </v-col>
    </v-row>
    <v-row v-if="isStaff" justify="center" class="my-4">
        <router-link :to="this.$route.path + '/lista'">
            <v-btn color="#FF7A00" size="large" variant="flat">Lista de participantes</v-btn>
        </router-link>
    </v-row>
    <v-row class="pa-4 text-left flex-column">
        <p class="purple">Descrição</p>
        <p>{{ palestra.description }}</p>
    </v-row>
    <v-row class="pa-4 text-left flex-column">
        <p class="purple">Palestrante</p>
        <v-row class="py-4">
            <v-col cols="4">
                <v-avatar size="x-large">
                    <v-img :src="speakerImage"></v-img>
                </v-avatar>
            </v-col>
            <v-col>
                <p class="font-weight-bold">{{ palestra.speaker?.name }}</p>
                <p>{{ palestra.speaker?.bio }}</p>
            </v-col>
        </v-row>
    </v-row>
    <v-row v-if="rateAvailable && participated" class="pa-4 text-left flex-column mb-8">
        <p class="purple mb-4">Avalie a palestra</p>
        <p>{{ message }}</p>
        <v-rating
            v-model="score"
            active-color="orange"
            color="orange-lighten-1"
            half-increments
            hover
            v-if="!message"
        ></v-rating>
        <v-btn @click="sendRating" v-if="!message" density="comfortable" size="small" color="#9C66BD" variant="flat" class="mt-4 align-self-start">Enviar</v-btn>
    </v-row>
</template>
<script>
import { DateTime } from 'luxon';
import TalkService from '@/services/talk.service.js';
import EventService from '@/services/event.service.js';
const API_URL = 'http://localhost:3000'
export default {
    data(){
        return{
            palestra: {},
            score: null,
            message: '',
            participated: false,
            isStaff: false
        }
    },
    computed:{
        startDate(){
            return DateTime.fromISO(this.palestra.start_date).toFormat('dd/MM/yy');
        },
        rateAvailable(){
            return DateTime.fromISO(this.palestra.start_date) < DateTime.now();
        },
        speakerImage(){
            if (this.palestra.speaker) 
                return API_URL + this.palestra.speaker?.image_url;
            else return '';
        }
    },
    methods:{
        sendRating(){
            TalkService.sendRating(this.score, this.$route.params.talkid).then(
                (response) => this.message = response.data.message
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
                (response) => {
                    this.participated = response.data.participated
                }
            )
        }

        EventService.isEventStaff(this.$route.params.slug)
            .then((response)=>{
                if (response) {
                    this.isStaff = true;
                }
            }).catch((err) => {
                if (err.response.status !== 401) {
                    throw err;
                }
            });
    }
}
</script>
<style scoped>
#header{
    background-color: #9C66BD08;
    border-bottom-left-radius: 80px;
}
.purple{
    color: #9C66BD;
    font-weight: bold;
}
.v-avatar{
    border: 2px solid #9C66BD;
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
