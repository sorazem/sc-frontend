<template>
    <v-dialog width="auto">
        <v-card
            :text="'Nova ' + type"
        >
            <v-form v-model="form" class="pa-4" @submit.prevent = "submit()">
                <div class="text-subtitle-1 text-medium-emphasis text-left" v-if="type == 'palestra'">Título</div>
                <v-text-field
                    v-model="title"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                    v-if="type == 'palestra'"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left" v-if="type == 'palestra'">Descrição</div>
                <v-text-field
                    v-model="description"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                    v-if="type == 'palestra'"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left" v-if="type == 'palestra'">Palestrante</div>
                <v-select
                    v-model="talkSpeaker"
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                    v-if="type == 'palestra'"
                    :items="speakersList"
                    item-title="name"
                    item-value="id"
                ></v-select>

                <div class="text-subtitle-1 text-medium-emphasis text-left" v-if="type == 'palestra'">Data de início</div>
                <v-text-field
                    v-model="start_date"
                    type="datetime-local"
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                    v-if="type == 'palestra'"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left" v-if="type == 'palestra'">Data de fim</div>
                <v-text-field
                    v-model="end_date"
                    type="datetime-local"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                    v-if="type == 'palestra'"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left" v-if="type == 'palestra'">Local</div>
                <v-select
                    v-model="talkLocation"
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                    v-if="type == 'palestra'"
                    :items="locationList"
                    item-title="name"
                    item-value="id"
                ></v-select>

                <div class="text-subtitle-1 text-medium-emphasis text-left" v-if="type == 'palestra'">Tipo</div>
                <v-select
                    v-model="talkType"
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                    v-if="type == 'palestra'"
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

                <div class="text-subtitle-1 text-medium-emphasis text-left" v-if="type == 'palestra'">Categorias</div>
                <v-select
                    v-model="talkCategories"
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                    v-if="type == 'palestra'"
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
// import { DateTime } from 'luxon';
import eventService from '@/services/event.service';
import store from '@/store';
export default {
    data(){
        return{
            form: false,
            title: null,
            description: null,
            start_date: null,
            end_date: null,
            speakersList: [],
            talkSpeaker: null,
            categoriesList: [],
            talkCategories: null,
            typeList: [],
            talkType: null,
            locationList: [],
            talkLocation: null,
            eventId: null

        }
    },
    props:{
        type: String
    },
    methods:{
        required (v) {
            return !!v || 'Este campo é obrigatório'
        },
        submit(){
            console.log(this.eventId)
            eventService.createTalk({title: this.title, description: this.description, start_date: this.start_date, end_date: this.end_date, event_id: this.eventId, speaker_id: this.talkSpeaker, location_id: this.talkLocation, type_id: this.talkType, categories_id: this.talkCategories}).then(
                (response)=>console.log(response)
            )
        }
    },
    mounted(){
        if(Object.keys(store.state.eventMap).includes(this.$route.params.slug)){
            this.eventId = store.state.eventMap[this.$route.params.slug]
        }
        else{
            eventService.getEventSchedule(this.$route.params.slug).then(
                (response)=>this.eventId = response.id
            )
            store.commit('addEventToMap', {slug: this.$route.params.slug, id: this.eventId});
        }
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