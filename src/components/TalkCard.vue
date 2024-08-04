<template>
    <v-card 
        class="pa-4 mb-8" 
        variant="outlined" 
        >
            <v-card-item class="d-flex flex-column">
                <v-chip density="compact" variant="tonal" v-if="palestra.type" :color="palestra.type.color" class="mr-2">{{ palestra.type.name }}</v-chip>
                <v-chip density="compact" variant="tonal" v-for="category in palestra.categories" :key="category.id" :color="category.color" class="mr-2">{{ category.name }}</v-chip>
                <h2 class="mt-2">{{ palestra.title }}</h2>
                <div class="text-left mt-4">
                    <p><span>Palestrante:</span> {{ listSpeakers(palestra.speakers) }}</p>
                    <p><span>Local:</span> {{ palestra.location?.name }}</p>
                    <p><span>Horário:</span> {{ formatDate(palestra.start_date) }} até {{ formatDate(palestra.end_date) }}</p>
                </div>
                <v-card-actions v-if="$route.path.includes('agenda')" class="mt-4 d-flex justify-center">
                    <v-btn color="#9C66BD" size="large" variant="flat" @click.prevent="$emit('cancel', palestra.id)">Cancelar inscrição</v-btn>
                </v-card-actions>
            </v-card-item>
    </v-card>
</template>
<script>
import { DateTime } from 'luxon';
export default {
    props: {
        palestra: Object
    },
    methods:{
        formatDate(date){
            return DateTime.fromISO(date).toFormat('HH:mm');
        },
        listSpeakers(speakers){
            return speakers.map(s=>s.name).join(', ');
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
