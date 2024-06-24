<template>
    <v-row id="header" class="d-flex flex-column align-end pa-4 text-right">
        <v-chip density="compact" variant="tonal" v-if="palestra?.category" :color="palestra?.category?.color">{{ palestra?.category?.name }}</v-chip>
        <h2>{{ palestra?.title }}</h2>
        <p>{{ palestra.type?.name }}</p>
    </v-row>
    <v-row class="pa-8 align-end">
        <v-col>
            <p class="purple">{{ startDate }}</p>
            <p>data</p>
        </v-col>
        <v-col>
            <p class="purple">{{ palestra.location?.name }}</p>
            <p>local</p>
        </v-col>
        <v-col>
            <p class="purple">{{ palestra.vacancy_limit }}</p>
            <p>vagas</p>
        </v-col>
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
                    <v-img src="../assets/logo.png"></v-img>
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
import TalkService from '../services/talk.service.js';
export default {
    data(){
        return{
            palestra: {},
            score: null,
            message: '',
            participated: false
        }
    },
    computed:{
        startDate(){
            return DateTime.fromISO(this.palestra.start_date).toFormat('dd/MM/yy');
        },
        rateAvailable(){
            return DateTime.fromISO(this.palestra.start_date) < DateTime.now();
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
        TalkService.getTalk(this.$route.params.talkid).then(
            (response) => this.palestra = response
        );
        TalkService.checkUserVacancy(this.$route.params.talkid).then(
            (response) => this.participated = response.data.participated.presence? true : false
        )
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