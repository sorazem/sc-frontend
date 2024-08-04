<template>
    <div>
        <v-card variant="outlined" class="my-8 pa-2 text-left" v-for="talk in talks" :key="talk.id">
            <v-card-title class="text-wrap">{{ talk.title }}</v-card-title>
            <v-card-subtitle class="mb-4  text-subtitle-2 text-wrap">Palestrante: {{ listSpeakers(talk.speakers) }}</v-card-subtitle>
            <v-card-actions class="d-flex justify-space-evenly">
                <router-link :to="this.$route.path + '/' + talk.id ">
                    <v-btn text="Lista de participantes" variant="flat" ></v-btn>
                </router-link>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import eventService from '@/services/event.service';
export default {
    data(){
        return{
            talks: []
        }
    },
    methods:{
        listSpeakers(speakers){
            return speakers.map(s=>s.name).join(', ');
        }
    },
    mounted(){
        eventService.getEventTalks(this.$route.params.slug).then(
            (response)=>this.talks = response
        )
    }
}
</script>
<style scoped>
    .v-card-actions .v-btn{
        color: white;
        background-color: #FF7A00;
    }
</style>