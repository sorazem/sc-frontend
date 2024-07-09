<template>
    <div>
        <h2>Pedidos em aberto</h2>
        <v-text-field
                v-model="nome"
                class="mt-2"
                placeholder="Pesquisar por nome"
                clearable
                variant="outlined"
                density="compact"
            ></v-text-field>
        <v-card v-for='reservation in filteredReservations' :key='reservation.id' variant="outlined" class="my-8 pa-2 text-left">
            <v-card-title>{{ reservation.user.name }}</v-card-title>
            <v-card-subtitle class="mb-4">Reservou {{ reservation.merch.name }} ({{formatPrice(reservation.merch.price)}})</v-card-subtitle>
            <v-card-actions>
                <v-btn :text="reservation.delivered ? 'Entregue' : 'Marcar como entregue'" variant="text" :readonly='reservation.delivered' @click='deliverReservation(reservation)' block></v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import EventService from '../services/event.service.js';
export default {
    data(){
        return{
            nome: '',
            reservations: [],
        }
    },

    methods: {
        formatPrice(cents){
            return `R$ ${(cents / 100).toFixed(2)}`;
        },

        deliverReservation(reservation) {
            EventService.deliverReservation(this.$route.params.slug, reservation.id).then(() => {
                reservation.delivered = true;
            })
        }
    },

    computed: {
        filteredReservations() {
            let query = this.nome.toLowerCase();
            return this.reservations.filter((reservation) => !query || 
                reservation.user.name.toLowerCase().includes(query) || 
                reservation.merch.name.toLowerCase().includes(query))
        }
    },

    mounted(){
        EventService.getEventReservations(this.$route.params.slug).then(
            (response)=>this.reservations = response
        )
    }
}
</script>
<style scoped>
.v-card-actions > .v-btn{
    color: white;
    background-color: #FF7A00;
}
.v-card, .v-text-field{
    width: 320px;
    border-radius: 16px;
    border-color: lightgray;
}  
</style>
