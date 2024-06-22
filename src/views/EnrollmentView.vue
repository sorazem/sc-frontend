<template>
    <h1>Inscrição</h1>
    <p class="mb-8">{{ talksToEnroll.length }} palestras selecionadas</p>
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
</template>
<script>
import EventService from '../services/event.service.js';
import TalkCard from '../components/TalkCard.vue';
export default {
    data(){
        return{
            talksToEnroll: [],
            loading: false,
            palestras: []
        }
    },
    components:{
      TalkCard  
    },
    methods:{
        enroll(){
            EventService.enroll(this.talksToEnroll).then(
                (response) =>{
                    console.log(response)
                }
            )
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
    
</style>