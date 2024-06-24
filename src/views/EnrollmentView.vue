<template>
    <div v-if="!submitted">
        <h1>Inscrição</h1>
        <p class="mb-8">{{ talksToEnroll.length }} palestra<span v-if="talksToEnroll.length!=1">s</span> selecionada<span v-if="talksToEnroll.length!=1">s</span></p>
        <div v-for="palestra in Object.values(palestras).flat()" :key="palestra.title" class="d-flex align-center justify-center">
            <v-checkbox
                v-model="talksToEnroll"
                label=""
                :value="palestra.id"
            ></v-checkbox>
            <TalkCard :palestra="palestra" :key="palestra.title"/>
        </div>
        <v-btn
            @click="enroll"
            :loading="loading"
            color="#9C66BD"
            size="large"
            type="submit"
            variant="flat"
            class="mt-4"
        >
            Confirmar
        </v-btn>
    </div>
    <div v-if="submitted" class="submitted d-flex flex-column align-center">
        <h1>Confirmação do pedido</h1>
        <v-img src="../assets/Calendar.png" :width="300"></v-img>
        <v-card v-if="confirmed.length" variant="tonal" color="success">
            <v-card-title>Inscrição confirmada nas seguintes palestras</v-card-title>
            <v-card-item>
                <p v-for="palestra in confirmed" :key="palestra.id">{{ palestra.talk.title }}</p>
            </v-card-item>
        </v-card>
        <v-card v-if="denied.length" class="mb-8" variant="tonal" color="error">
            <v-card-title>Infelizmente você não conseguiu vaga nas seguintes palestras</v-card-title>
            <v-card-item>
                <p v-for="palestra in denied" :key="palestra.id">{{ palestra.talk.title }}</p>
            </v-card-item>
        </v-card>
        <v-btn
            color="#9C66BD"
            size="large"
            variant="flat"
            class="mt-4"
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
        EventService.getEventSchedule(this.$store.state.eventSlug).then(
          (response) =>{
              this.palestras = response.talks;
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