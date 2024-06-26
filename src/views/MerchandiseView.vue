<template>
    <div>
        <h1 class="my-4">Mercadorias do evento</h1>
        <v-card class="mb-4" variant="outlined" v-for="merch in merchandise" :key="merch.id">
            <v-card-item class="text-left">
                <!-- todo: imagem da mercadoria -->
                <p class="font-weight-bold my-2">{{ merch.name }}</p>
                <p class="mb-2">R$ {{ merch.price }}</p>
                <p class="mb-2"></p>
                <v-select v-model="size" placeholder="Escolha o tamanho" variant="outlined" density="compact" :items="['P', 'M', 'G', 'GG']"></v-select>
                <v-btn variant="flat" color="#9C66BD" block @click="saveMerch(merch.id)">Reservar</v-btn>
            </v-card-item>
        </v-card>
    </div>
</template>
<script>
import eventService from '@/services/event.service';
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
        }
    },
    created(){
        eventService.getEventMerchandise(this.$route.params.slug).then(
            (response) =>{
                console.log(response);
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
</style>