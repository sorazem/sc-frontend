<template>
    <v-snackbar v-model="snackbar" :timeout="2000">{{ message }}</v-snackbar>
    <p v-if="dias.length==0" class="mt-8">Você ainda não se inscreveu em nenhuma palestra.</p>
    <div class="content d-flex flex-column align-center">
      <v-tabs  v-model='diaAtual' show-arrows>
        <v-tab v-for="dia in dias" :key="dia" :value="dia">{{dia}}</v-tab>
      </v-tabs>
      <v-tabs-window v-model='diaAtual'>
        <v-tabs-window-item v-for="dia in dias" :key='dia' :value='dia'>
          <TalkCard 
            v-for="palestra in palestras[diaAtual]" 
            :palestra="palestra.talk" 
            :key="palestra.talk.title" 
            :to="'/' + this.$route.params.slug + '/palestra/' + palestra.talk.id" 
            @cancel="cancel"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
</template>
<script>
import TalkCard from '@/components/TalkCard.vue';
import EventService from '../services/event.service.js';
import TalkService from '@/services/talk.service.js';
export default {
    data(){
        return{
            palestras: [],
            dias: [],
            diaAtual: null,
            message: '',
            snackbar: false,
        }
    },
    components:{
      TalkCard
    },
    methods:{
        cancel(talk_id){
            let vacancy_id = this.palestras[this.diaAtual].find((a)=>a.talk.id == talk_id).id;
            TalkService.cancelVacancy(vacancy_id, this.$route.params.slug).then(
                (response)=>{
                    this.palestras[this.diaAtual].splice(this.palestras[this.diaAtual].indexOf(vacancy_id),1);
                    this.message = response.message;
                    this.snackbar = true;
                }
            )
        }
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
.v-select{
    width: 320px;
}
</style>
