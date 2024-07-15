<template>
    <v-dialog width="auto">
        <v-card
            :text="'Novo palestrante'"
        >
            <v-form v-model="form" class="pa-4" @submit.prevent = "submit()">
                <div class="text-subtitle-1 text-medium-emphasis text-left">Nome</div>
                <v-text-field
                    v-model="speaker.name"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Resumo do palestrante</div>
                <v-text-field
                    v-model="speaker.bio"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Email</div>
                <v-text-field
                    v-model="speaker.email"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>

                <v-btn type="submit" :disabled="!form" color="#FF7A00">Enviar</v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>
<script>
import eventService from '@/services/event.service';
import store from '@/store';
export default {
    props: ['willCreate', 'selectedSpeaker'],
    watch: {
        selectedSpeaker: function(newValue) {
            if (newValue !== null) {
                this.speaker = newValue;
            } else {
                this.speaker = { name: null, bio: null, email: null } 
            }
        }
    },
    data(){
        return{
            form: false,
            speaker: {
                name: null,
                bio: null,
            },
            event: null,
        }
    },
    methods:{
        required (v) {
            return !!v || 'Este campo é obrigatório'
        },
        submit(){
            this.speaker.event_id = this.event.id;
            delete this.speaker.image;
            if (this.willCreate) {
                eventService.createSpeaker(this.speaker).then(this.$emit('closeDialog'))
            } else {
                eventService.updateSpeaker(this.speaker).then(this.$emit('closeDialog'))
            }
        }
    },
    mounted(){
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
    }

}
</script>
<style scoped>
    .v-card{
        width: 320px;
        border-radius: 16px;
    }

    span{
        font-weight: 600;
    }
</style>
