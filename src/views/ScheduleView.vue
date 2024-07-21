<template>
  <v-row>
    <v-col cols='6'>
      <v-select label="Dia" v-model="diaAtual" :items="dias" density="compact" variant="outlined" class="mt-4"></v-select>
    </v-col>
    <v-col cols='6'>
      <v-select label="Localização" v-model="currentLocation" :items="locations" density="compact" variant="outlined" class="mt-4"></v-select>
    </v-col>
  </v-row>
  <div class="d-flex flex-column justify-space-between align-center">
    <TalkCard v-for="palestra in filteredTalks" :palestra="palestra" :key="palestra.title" :href="'/' + this.$route.params.slug + '/palestra/' + palestra.id"/>
  </div>
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
        diaAtual: null,
        locations: [],
        currentLocation: null,
      }
    },
    components:{
      TalkCard
    },
    methods: {
      getUniqueLocationNames(talks) {
        const allTalks = Object.values(talks).flat();
        const uniqueLocations = [...new Set(allTalks.map((talk) => JSON.stringify(talk.location)))]
        const locations = uniqueLocations.map((location) => JSON.parse(location).name);
        return locations;
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      filteredTalks() {
        return this.palestras[this.diaAtual]?.filter((palestra) => !this.currentLocation || palestra.location.name === this.currentLocation)
      }
    },
    created(){
      EventService.getEventSchedule(this.$route.params.slug).then(
        (response) =>{
          this.palestras = response.talks;
          this.dias = Object.keys(response.talks);
          this.diaAtual = this.dias[0];
          this.locations = this.getUniqueLocationNames(response.talks);
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
