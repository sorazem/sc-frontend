<template>
    <p v-if="dias.length==0" class="mt-8">Você ainda não se inscreveu em nenhuma palestra.</p>
    <v-select v-if="dias.length" label="Dia" v-model="diaAtual" :items="dias" density="compact" variant="outlined" class="mt-4"></v-select>
    <div class="d-flex flex-column justify-space-between align-center">
        <TalkCard v-for="palestra in palestras[diaAtual]" :palestra="palestra" :key="palestra.title" :href="'/' + this.$route.params.slug + '/palestra/' + palestra.id"/>
    </div>
</template>
<script>
import TalkCard from '@/components/TalkCard.vue';
import EventService from '../services/event.service.js';
export default {
    data(){
        return{
            palestras: [],
            dias: [],
            diaAtual: null
        }
    },
    components:{
      TalkCard
    },
    created(){
        EventService.getUserAgenda(this.$route.params.slug).then(
            (response) =>{
                this.palestras = response;
                this.dias = Object.keys(response);
                this.diaAtual = this.dias[0];
            }
      );
    }
}
</script>
<style scoped>
    
</style>