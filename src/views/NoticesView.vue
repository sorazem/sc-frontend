<template>
    <div>
        <h1 class="mt-4 mb-8">Mural de avisos</h1>
        <v-card class="mb-4" v-for="notice in notices" :key="notice.description" variant="outlined">
            <v-card-item class="text-left">
                <p class="font-weight-medium">{{ notice.title }}</p>
                <p>{{ notice.description }}</p>
                <div class="mt-4 d-flex justify-space-between align-center font-weight-light">
                    <p v-if="notice.talk"><router-link :to="'palestra/' + notice.talk.id">{{ notice.talk?.title }}</router-link></p>
                    <p class="ml-auto">{{ formatDate(notice.created_at) }}</p>
                </div>
            </v-card-item>
        </v-card>
    </div>
</template>
<script>
import EventService from '@/services/event.service';
import { DateTime } from 'luxon';
export default {
    data(){
        return{
            notices: []
        }
    },
    methods:{
        formatDate(date){
            return DateTime.fromISO(date).toFormat('dd/MM/yy hh:mm');
        }
    },
    mounted(){
        EventService.getEventNotices(this.$route.params.slug).then(
            (response)=>this.notices = response
        )
    }
}
</script>
<style scoped>
    .v-card{
        width: 320px;
        border-radius: 16px;
        border-color: lightgray;
    }
    .v-card > p:first-child{
        font-size: 1.2em;
    }
</style>