<template>
  <div id='card-row' class="d-flex flex-column justify-space-between align-center">
    <v-row class='w-100'>
      <v-col cols='12'>
        <v-select clearable label="Localização" v-model="currentLocation" :items="locations" :list-props="{maxWidth:'300px'}" density="compact" variant="outlined" class="mt-4"></v-select>
      </v-col>
      <v-tabs v-model='diaAtual' show-arrows>
        <v-tab v-for="dia in dias" :key="dia" :value="dia">{{dia}}</v-tab>
      </v-tabs>
      <v-tabs-window v-model='diaAtual'>
        <v-tabs-window-item v-for="dia in dias" :key='dia' :value='dia'>
          <TalkCard 
          v-for="palestra in filteredTalks" 
          :palestra="palestra" 
          :key="palestra.title" 
          :to="'/' + this.$route.params.slug + '/atividade/' + palestra.id
          "/>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-row>
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
    mounted(){
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
p {
  font-size: 0.85rem;
}
#card-row {
  width: 320px;
}
</style>
