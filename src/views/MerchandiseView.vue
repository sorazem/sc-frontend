<template>
    <div>
        <h1 class="mt-4">Mercadorias do evento</h1>
        <p class="mb-8 font-weight-light">Faça aqui a reserva, retire e pague presencialmente</p>
        <v-card class="mb-4" variant="outlined" v-for="merch in merchandise" :key="merch.id">
            <v-card-item class="text-left">
                <!-- todo: imagem da mercadoria -->
                <img :src="merchImage(merch)" alt="">
                <p class="font-weight-bold my-2">{{ merch.name }}</p>
                <p class="mb-2">R$ {{ merch.price / 100 }}</p>
                <p class="mb-2"></p>
                <v-select v-model="size" placeholder="Escolha o tamanho" variant="outlined" density="compact" :items="['P', 'M', 'G', 'GG']"></v-select>
                <v-btn variant="flat" color="#9C66BD" block @click="saveMerch(merch.id)">Reservar</v-btn>
            </v-card-item>
        </v-card>
    </div>
</template>
<script>
import eventService from '@/services/event.service';
const API_URL = 'http://localhost:3000'
export default {
    data(){
        return{
            merchandise: [],
            size: null
        }
    },
    methods:{
        saveMerch(){
            // todo: send request to event service
        },
        merchImage(merch) {
            if (merch.image_url) {
                return API_URL + merch.image_url;
            } else return '';
        }
    },
    created(){
        eventService.getEventMerchandise(this.$route.params.slug).then(
            (response) =>{
                this.merchandise = response;
            }
        )
    }
}
</script>
<style scoped>
.v-card{
    width: 300px;
}
img {
    width: 100%;
}
</style>
