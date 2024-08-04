<template>
    <div class="content d-flex flex-wrap align-content-space-between pa-4">
        <v-card 
            class="pa-4 mb-8 mx-4" 
            v-for="event in events" 
            variant="outlined" 
            :key="event.slug"
            :to="'/' + event.slug + '/programacao'"
            >
                <div class="overflow-auto d-flex flex-column flex-wrap">
                    <v-img :src="eventPhoto(event)" width="300"></v-img>
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
        eventPhoto(event) {
            return event?.banner_url ? `${process.env.VUE_APP_API_URL}/${event.banner_url}` : require('@/assets/event_placeholder.jpg')
        },

        formatDate(date){
            return DateTime.fromISO(date).toFormat('dd/MM/yy');
        }
    },
    beforeCreate(){
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
