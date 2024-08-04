<template>
    <div class="content d-flex flex-wrap pa-4">
        <div class="grid-item" v-for="event in events" :key="event.slug">
            <v-card 
                class="pa-4 mb-8 mx-4" 
                variant="outlined" 
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
    .grid-item{
        flex-grow: 1;
        max-width: 50%;
        display: flex;
        justify-content: center;
    }
    @media screen and (max-width: 1051px)  {
        .grid-item{
            max-width: 100%;
        }
    }
</style>