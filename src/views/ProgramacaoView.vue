<template>
  <v-select label="Dia" v-model="diaAtual" :items="dias" density="compact" variant="outlined"></v-select>
    <div class="d-flex flex-column justify-space-between align-center pa-8">
        <v-card 
            class="pa-4 mb-8" 
            v-for="palestra in palestras[diaAtual]" 
            variant="outlined" 
            :key="palestra.title" 
            >
                <v-card-item class="d-flex flex-column">
                    <v-chip density="compact" variant="tonal" v-if="palestra.type" :color="palestra.type.color">{{ palestra.type.name }}</v-chip>
                    <v-chip density="compact" variant="tonal" v-if="palestra.category" :color="palestra.category.color">{{ palestra.category.name }}</v-chip>
                    <h2 class="mt-2">{{ palestra.title }}</h2>
                </v-card-item>
        </v-card>
    </div>
  </template>
  
  <script>

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
  <style>
  .v-card{
    border-radius: 16px;
  }
  </style>