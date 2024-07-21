<template>
    <div>
        <h1 class="mt-4">Mercadorias do evento</h1>
        <p class="mb-8 font-weight-light">Faça aqui a reserva, retire e pague presencialmente</p>
        <v-card class="mb-4" variant="outlined" v-for="merch in merchandise" :key="merch.id">
            <v-card-item class="text-left">
                <img :src="merchImage(merch)" alt="">
                <p class="font-weight-bold my-2">{{ merch.name }}</p>
                <p class="mb-2">{{ formatPrice(merch.price)}}</p>
                <p class="mb-2"></p>
                <!-- <v-select v-model="size" placeholder="Escolha o tamanho" variant="outlined" density="compact" :items="['P', 'M', 'G', 'GG']"></v-select> -->
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
        saveMerch(merch_id){
            let user = JSON.parse(localStorage.getItem('user')).user;
            let payload = { merch_id, user_id: user.id }
            eventService.createReservation(this.$route.params.slug, payload).then((response) => {
                console.log(response);
            })
        },
        formatPrice(cents) {
            return `R$ ${(cents / 100).toFixed(2)}`;
        },
        merchImage(merch) {
            if (merch.image_url) {
                return `${process.env.VUE_APP_API_URL}${merch.image_url}`;
            } else return '';
        }
    },
    created(){
        eventService.getEventMerchandise(this.$route.params.slug).then(
            (response) =>{
                console.log(response)
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
