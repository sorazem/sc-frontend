<template>
    <v-dialog width='auto'>
        <v-card class="pa-4">
            <p class="ml-6 mt-4 mb-8">Novo anúncio</p>
            <v-form v-model='form' @submit.prevent='submit()'>
                <div class="text-subtitle-1 text-medium-emphasis text-left">Título</div>
                <v-text-field
                    v-model="notice.title"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis text-left">Descrição</div>
                <v-text-field
                    v-model="notice.description"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis text-left">Enviar aviso para todos do evento ou para participantes de uma atividade específica?</div>
                <v-select 
                    v-model="notificationType" 
                    :items="['Evento', 'Atividade']"
                    class="mb-4"
                    variant="outlined"
                    density="compact"
                ></v-select>
                <div v-if="notificationType === 'Atividade'">
                    <div class="text-subtitle-1 text-medium-emphasis text-left">Escolha a atividade</div>
                    <v-select
                        v-model="notice.talk_id"
                        class="mb-4"
                        variant="outlined"
                        density="compact"
                        :items="talksList"
                        item-title="title"
                        item-value="id"
                        :rules="[required]"
                    ></v-select>
                    </div>
                <v-btn type="submit" :disabled="!form" color="#FF7A00">Enviar</v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>
<script>
import eventService from '@/services/event.service';
import store from '@/store';
export default {
    props: ['willCreate', 'selectedNotice'],
    watch: {
        selectedNotice: function(newValue) {
            if (newValue !== null) {
                this.notice = { id: newValue.id, title: newValue.title, description: newValue.description };
                if (newValue.talk) {
                    this.isFromEvent = false
                    this.notice.talk_id = newValue.talk.id
                }
                else {
                    this.isFromEvent = true
                } 
            } else {
                this.notice = { title: null, description: null, event_id: null, talk_id: null }
            }
        }
    },
    data() {
        return {
            notificationType: 'Evento',
            form: false,
            event: null,
            isFromEvent: true,
            talksList: [],
            notice: {
                title: null,
                description: null,
                event_id: null,
                talk_id: null,
            },
        }
    },
    methods: {
        required (v) {
            return !!v || 'Este campo é obrigatório'
        },
        submit(){
            if(this.notificationType === 'Evento'){
                this.isFromEvent = true;
            } else{
                this.isFromEvent = false;
            }
            if (this.isFromEvent) {
                this.notice.event_id = this.event.id;
                delete this.notice.talk_id;
            } else {
                delete this.notice.event_id
            }
            if (this.willCreate) {
                eventService.createNotice(this.$route.params.slug, this.notice)
                .then(
                    () => {
                        this.$emit('changeMessage', "Criação feita com sucesso.");
                        this.$emit('closeDialog');
                    }
                )
                .catch(
                    (error) => {
                        this.$emit('changeMessage', error.message);
                        this.$emit('closeDialog');
                    }
                )
            } else {
                eventService.updateNotice(this.$route.params.slug, this.notice)
                .then(
                    () => {
                        this.$emit('changeMessage', "Alteração feita com sucesso.");
                        this.$emit('closeDialog');
                    }
                )
                .catch(
                    (error) => {
                        this.$emit('changeMessage', error.message);
                        this.$emit('closeDialog');
                    }
                )
            }
        }
    },
    mounted() {
        if(Object.keys(store.state.eventMap).includes(this.$route.params.slug)){
            this.event = store.state.eventMap[this.$route.params.slug]
        }
        else{
            eventService.getEventSchedule(this.$route.params.slug).then(
                (response)=>{
                    store.commit('addEventToMap', {slug: this.$route.params.slug, event: response});
                    this.event = response;
                }
            )
        }
        eventService.getEventTalks(this.$route.params.slug).then((response) => {
            this.talksList = response;
        })
    }
}
</script>
<style scoped>
.v-card{
    width: 320px;
    height: 100vh;
    border-radius: 16px;
}

span{
    font-weight: 600;
}
</style>
