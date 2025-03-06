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
            <v-card-subtitle class="mb-4">Reservou {{ reservation.amount }} {{ reservation.merch.name }} ({{formatPrice(reservation.merch.price)}})</v-card-subtitle>
            <v-card-text>
                <ul>
                    <li v-for="option in displayOptions(reservation.options)" :key='option'>{{ option }}</li>
                </ul>
            </v-card-text>
            <v-btn class='mb-4' :text="reservation.delivered ? 'Entregue' : 'Marcar como entregue'" variant="text" :readonly='reservation.delivered' @click='deliverReservation(reservation)' block></v-btn>
            <v-btn v-if="!reservation.delivered" variant='text' @click='chooseReservation(reservation)' block>Cancelar reserva</v-btn>
        </v-card>

        <v-dialog :modelValue="showDialog" width="auto">
            <v-card max-width="400" text="Quer mesmo cancelar essa reserva?" >
                <template v-slot:actions>
                    <v-btn class="mx-auto" text="Não" @click="closeDialog()"></v-btn>
                    <v-btn class="mx-auto" text="Sim" @click="deleteReservation(selectedReservation)"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import EventService from '../services/event.service.js';
export default {
    data(){
        return{
            nome: '',
            reservations: [],
            selectedReservation: null,
            showDialog: false,
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
        },
        displayOptions(options) {
            return Object.keys(options).map((key) => `${key}: ${options[key]}`)
        },
        deleteReservation(reservation) {
            EventService.deleteReservation(this.$route.params.slug, reservation.id).then(
                () => {
                    this.reservations.splice(this.reservations.indexOf(reservation), 1);
                    this.closeDialog();
                }
            )
        },
        chooseReservation(reservation) {
            this.selectedReservation = reservation;
            this.showDialog = true;
        },
        closeDialog() {
            this.selectedReservation = null;
            this.showDialog = false;
        },
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
.v-btn{
    color: white;
    background-color: #FF7A00;
}
.v-card, .v-text-field{
    width: 320px;
    border-radius: 16px;
    border-color: lightgray;
}  
</style>
