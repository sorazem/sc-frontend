<template>
    <div class="d-flex flex-column justify-space-between align-center pa-8">
        <v-card 
            class="pa-4 mb-8" 
            v-for="event in events" 
            variant="outlined" 
            :key="event.slug" 
            :title="event.name"
            target="_blank"
            :href="'/' + event.slug + '/programacao'"
            >
                <v-card-item>
                    {{ event.start_date }} até {{ event.end_date }}
                </v-card-item>
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
    .v-card{
        width: 480px;
    }
</style>