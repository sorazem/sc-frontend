<template>
    <!-- <h1>Eventos</h1> -->
    <div class="content d-flex flex-wrap align-content-space-between pa-4">
        <v-card 
            class="pa-4 mb-8 mx-4" 
            v-for="event in events" 
            variant="outlined" 
            :key="event.slug"
            :href="'/' + event.slug + '/programacao'"
            >
                <div class="overflow-auto d-flex flex-column flex-wrap">
                    <v-img v-if="event?.banner_url !== ''" :src="eventPhoto(event)" width="300"></v-img>
                    <v-img v-else src="@/assets/event_placeholder.jpg" width="300"></v-img>
                    <h2 class="mt-4">{{ event.name }}</h2>
                    <v-card-item>
                        <p>{{ formatDate(event.start_date) }} até {{ formatDate(event.end_date) }}</p>
                    </v-card-item>
                </div>
        </v-card>
    </div>
</template>
<script>
import { DateTime } from 'luxon';
import EventService from '../services/event.service.js';
export default {
    data(){
        return{
            events: null
        }
    },
    methods:{
        formatDate(date){
            return DateTime.fromISO(date).toFormat('dd/MM/yy');
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
    .v-card, .v-img{
        border-radius: 16px;
    }
    .v-card-title{
        white-space: normal;
    }
    .content{
        justify-content: flex-start;
    }
    @media screen and (max-width: 700px)  {
        .content{
            justify-content: center;
        }
    }
</style>