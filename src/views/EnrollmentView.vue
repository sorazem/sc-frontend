<template>
    <div v-if="!submitted">
        <h1 class="mt-4">Inscrição</h1>
        <p class="mb-8">{{ talksToEnroll.length }} atividade<span v-if="talksToEnroll.length!=1">s</span> selecionada<span v-if="talksToEnroll.length!=1">s</span></p>
        <div class="content d-flex flex-column align-center justify-center">
            <v-tabs v-model='diaAtual' show-arrows>
                <v-tab v-for='dia in dias' :key='dia' :value='dia'>{{dia}}</v-tab>
            </v-tabs>
            <v-tabs-window v-model='diaAtual' >
                <v-tabs-window-item v-for='dia in dias' :key='dia' :value='dia'>
                    <div v-for="palestra in palestras[dia]" :key="palestra.title" class='d-flex flex-row align-center justify-center'>
                        <v-checkbox
                            v-model="talksToEnroll"
                            label=""
                            :value="palestra.id"
                        ></v-checkbox>
                        <TalkCard :palestra="palestra" :key="palestra.title"/>
                    </div>
                </v-tabs-window-item>
            </v-tabs-window>
        </div>
        <v-btn
            @click="enroll"
            :loading="loading"
            color="#9C66BD"
            size="large"
            type="submit"
            variant="flat"
            class="mt-4"
        >Confirmar</v-btn>
    </div>
    <div v-if="submitted" class="submitted d-flex flex-column align-center">
        <h1>Confirmação do pedido</h1>
        <v-img src="../assets/Calendar.png" :width="300"></v-img>
        <v-card v-if="confirmed.length" variant="tonal" color="success">
            <v-card-title>Inscrição confirmada nas seguintes atividades</v-card-title>
            <v-card-item>
                <p v-for="palestra in confirmed" :key="palestra.id">{{ palestra.talk.title }}</p>
            </v-card-item>
        </v-card>
        <v-card v-if="denied.length" variant="tonal" color="error">
            <v-card-title>Infelizmente você não conseguiu vaga nas seguintes atividades</v-card-title>
            <v-card-item>
                <div v-for="palestra in denied" :key="palestra.talk.id" class="mb-4">
                    <p class="font-weight-bold">{{ palestra.talk.title }}</p>
                    <p>Motivo: {{ palestra.errors.user_id[0] }}</p>
                </div>
            </v-card-item>
        </v-card>
        <v-btn
            color="#9C66BD"
            size="large"
            variant="flat"
            class="mt-8"
            @click="$router.push('/' + $route.params.slug + '/agenda')"
        >
            Minha agenda
        </v-btn>
    </div>
</template>
<script>
import EventService from '../services/event.service.js';
import TalkCard from '../components/TalkCard.vue';

export default {
    data(){
        return{
            talksToEnroll: [],
            loading: false,
            palestras: [],
            dias: [],
            diaAtual: null,
            submitted: false,
            confirmed: [],
            denied: []
        }
    },
    components:{
      TalkCard
    },
    methods:{
        enroll(){
            this.loading = true;
            EventService.enroll(this.talksToEnroll, this.$route.params.slug).then(
                (response) =>{
                    this.submitted = true;
                    this.confirmed = response.data.confirmed;
                    this.denied = response.data.denied;
                }
            );
            this.loading = false;
        }
    },
    created(){
        this.$store.commit('changeCurrentEventSlug', this.$route.params.slug);
        if (this.$route.query.talk_id) {
            this.talksToEnroll = [parseInt(this.$route.query.talk_id)]
        }
        EventService.getEventSchedule(this.$store.state.eventSlug).then(
          (response) =>{
              this.palestras = response.talks;
              this.dias = Object.keys(response.talks);
              this.diaAtual = this.dias[0];
          }
      );
    }
}
</script>
<style scoped>
    .submitted .v-card-title{
        width: 320px;
        white-space: wrap;
    }
</style>
