<template>
    <v-dialog width="auto">
        <v-card
            :text="'Nova palestra'"
        >
            <v-form v-model="form" class="pa-4" @submit.prevent = "submit()">
                <div class="text-subtitle-1 text-medium-emphasis text-left">Título</div>
                <v-text-field
                    v-model="talk.title"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Descrição</div>
                <v-text-field
                    v-model="talk.description"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Palestrante</div>
                <v-select
                    v-model="talk.speaker_id"
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                    :items="speakersList"
                    item-title="name"
                    item-value="id"
                ></v-select>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Vagas</div>
                <v-text-field
                    v-model="talk.vacancy_limit"
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Data de início</div>
                <v-text-field
                    v-model="talk.start_date"
                    type="datetime-local"
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                    :min="event.start_date.substring(0, 16)"
                    :max="event.end_date.substring(0, 16)"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Data de fim</div>
                <v-text-field
                    v-model="talk.end_date"
                    type="datetime-local"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                    :min="event.start_date.substring(0, 16)"
                    :max="event.end_date.substring(0, 16)"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Local</div>
                <v-select
                    v-model="talk.location_id"
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                    :items="locationList"
                    item-title="name"
                    item-value="id"
                ></v-select>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Tipo</div>
                <v-select
                    v-model="talk.type_id"
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                    :items="typeList"
                    item-title="name"
                    item-value="id"
                >
                    <template v-slot:selection="{ item }">
                        <v-chip :color="item.raw.color">
                            <span>{{ item.title }}</span>
                        </v-chip>
                    </template>
                </v-select>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Categorias</div>
                <v-select
                    v-model="talk.category_ids"
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                    :items="categoriesList"
                    item-title="name"
                    item-value="id"
                    multiple
                >
                    <template v-slot:selection="{ item }">
                        <v-chip :color="item.raw.color">
                            <span>{{ item.title }}</span>
                        </v-chip>
                    </template>
                </v-select>

                <v-btn type="submit" :disabled="!form" color="#FF7A00">Enviar</v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>
<script>
import eventService from '@/services/event.service';
import store from '@/store';
export default {
    props: ['willCreate', 'selectedTalk'],
    watch: {
        selectedTalk: function (newValue) {
            if (newValue !== null) {
                this.talk = { id: newValue.id, title: newValue.title, description: newValue.description };
                this.talk.start_date = newValue.start_date.substring(0, 19);
                this.talk.end_date = newValue.end_date.substring(0, 19);
                this.talk.speaker_id = newValue.speaker.id;
                this.talk.type_id = newValue.type.id;
                this.talk.location_id = newValue.location.id;
                this.talk.category_ids = newValue.categories.map((category) => category.id);
            } else {
                this.talk = { title: null, description: null, start_date: null, end_date: null, speaker_id: null, category_ids: null, type_id: null, location_id: null }
            }
        },
    },
    data(){
        return{
            form: false,
            talk: {
                title: null,
                description: null,
                start_date: null,
                end_date: null,
                speaker_id: null,
                category_ids: null,
                location_id: null,
                type_id: null,
                vacancy_limit: null
            },
            speakersList: [],
            categoriesList: [],
            typeList: [],
            locationList: [],
            event: null
        }
    },
    methods:{
        required (v) {
            return !!v || 'Este campo é obrigatório'
        },
        submit(){
            this.talk.event_id = this.event.id;
            if (this.willCreate) {
                eventService.createTalk(this.talk).then(this.$emit('closeDialog'))
            } else {
                eventService.updateTalk(this.talk).then(this.$emit('closeDialog'))
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
        console.log(store.state.eventMap);
        eventService.getEventSpeakers(this.$route.params.slug).then(
            (response)=>this.speakersList = response
        );
        eventService.getTypes().then(
            (response)=>this.typeList = response
        );
        eventService.getCategories().then(
            (response)=>this.categoriesList = response
        );
        eventService.getLocations().then(
            (response)=>this.locationList = response
        );
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
