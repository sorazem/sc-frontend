<template>
    <div>
        <v-btn color="#FF7A00" size="large" variant="flat">
            Adicionar aviso
        </v-btn>
        <v-card v-for="notice in notices" :key="notice.title" variant="outlined" class="my-8 white-text pa-2 text-left">
            <v-card-title>{{ notice.title }}</v-card-title>
            <v-card-subtitle class="mb-4">{{ formatDate(notice.created_at) }}</v-card-subtitle>
            <v-card-item>
                <p>{{ notice.description }}</p>
            </v-card-item>
            <v-card-actions class="float-right">
                <v-btn text="Excluir" variant="text" @click='deleteNotice(notice)'></v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import EventService from '../services/event.service.js';
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
        },
        deleteNotice(notice) {
            EventService.deleteEventNotice(this.$route.params.slug, notice.id).then((response) => {
                if (response.message) {
                    this.notices.splice(this.notices.indexOf(notice), 1);
                }
            })
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
    .v-card-actions > .v-btn{
        color: white;
        background-color: #FF7A00;
    }
    .v-card{
        width: 320px;
        border-radius: 16px;
        border-color: lightgray;
    }
</style>
