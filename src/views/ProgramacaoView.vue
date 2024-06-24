<template>
  <v-select label="Dia" v-model="diaAtual" :items="dias" density="compact" variant="outlined" class="mt-4"></v-select>
  <div class="d-flex flex-column justify-space-between align-center">
      <TalkCard v-for="palestra in palestras[diaAtual]" :palestra="palestra" :key="palestra.title" :href="'/' + this.$route.params.slug + '/palestra/' + palestra.id"/>
  </div>
</template>
  
<script>
import TalkCard from '@/components/TalkCard.vue';
import EventService from '../services/event.service.js';
  export default {
    name: 'ProgramacaoView',
    data(){
        return{
            palestras: [],
            dias: [],
            diaAtual: null
        }
    },
    components:{
      TalkCard
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      userName(){
        return JSON.parse(this.currentUser.user).name;
      }
    },
    created(){
      this.$store.commit('changeCurrentEventSlug', this.$route.params.slug);
      EventService.getEventSchedule(this.$store.state.eventSlug).then(
          (response) =>{
              this.palestras = response.talks;
              this.dias = Object.keys(response.talks);
              this.diaAtual = this.dias[0];
          }
      );
      
    }
  };
  </script>
  <style scoped>
  .v-card{
    border-radius: 16px;
  }
  p{
    font-size: 0.85rem;
  }
  </style>