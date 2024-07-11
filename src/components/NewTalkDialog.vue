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
            talkLocation: null

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
            eventService.createTalk().then(
                (response)=>console.log(response)
            )
        }
    },
    mounted(){
        eventService.getEventSpeakers(this.$route.params.slug).then(
            (response)=>this.speakersList = response.map(item=>item.name)
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