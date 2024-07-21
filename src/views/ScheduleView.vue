<template>
  <div class="content d-flex flex-column align-center">
    <v-select label="Dia" v-model="diaAtual" :items="dias" density="compact" variant="outlined" class="mt-4"></v-select>
    <TalkCard v-for="palestra in palestras[diaAtual]" :palestra="palestra" :key="palestra.title" :href="'/' + this.$route.params.slug + '/palestra/' + palestra.id"/>
  </div>
  <!-- <EventMenu /> -->
</template>
  
<script>
import TalkCard from '@/components/TalkCard.vue';
import EventService from '../services/event.service.js';

  export default {
    name: 'ScheduleView',
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
      EventService.getEventSchedule(this.$route.params.slug).then(
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
  .v-select{
    width: 320px;
  }
  </style>