<template>
    <h1>Eventos</h1>
    <div class="d-flex flex-wrap justify-space-between align-center pa-4">
        <v-card 
            class="pa-4 mx-auto mb-8" 
            v-for="event in events" 
            variant="tonal" 
            :key="event.slug"
            color="#9C66BD"
            target="_self"
            :href="'/' + event.slug + '/programacao'"
            >
                <div class="d-flex flex-wrap justify-space-around overflow-auto">
                    <v-avatar
                        class="ma-3"
                        rounded="0"
                        size="125"
                    >
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
                    </v-avatar>
                    <div class="overflow-auto">
                        <v-card-title class="text-h6">
                            {{ event.name }}
                        </v-card-title>
                        <v-card-item>
                            <p>{{ event.start_date }} até {{ event.end_date }}</p>
                        </v-card-item>
                    </div>
                
                </div>
        </v-card>
    </div>
</template>
<script>
import EventService from '../services/event.service.js';
export default {
    data(){
        return{
            events: null
        }
    },
    mounted(){
        EventService.listEvents().then(
            (response) =>{
                this.events = response;
            }
        )
    }
}
</script>
<style scoped>
    .v-card p{
        color: black;
    }
    .v-card{
        border-radius: 16px;
    }
    .v-card-title{
        white-space: normal;
    }
</style>