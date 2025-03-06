<template>
    <h1 class='mb-4'>Minhas reservas</h1>
    <p v-if="reservations.length === 0">Você ainda não fez nenhuma reserva de mercadoria!</p>
    <v-card v-for='reservation in reservations' :key='reservation'>
        <v-img v-if="reservation.merch.image_url" :src="generateMerchImageURL(reservation.merch.image_url)" max-height='300' cover></v-img>
        <div class="pa-4">
            <v-card-title class='text-wrap'>{{reservation.merch.name}}</v-card-title>
            <v-card-subtitle class='mb-4'>Quantidade: {{reservation.amount}}</v-card-subtitle>
            <v-card-actions v-if='!reservation.delivered'>
                <v-btn color='red' @click='chooseReservation(reservation)'>Deletar</v-btn>
            </v-card-actions>
            <p v-else>Entregue</p>
        </div>
    </v-card>

    <v-dialog :modelValue="showDialog" width="auto">
        <v-card max-width="400" text="Quer mesmo cancelar essa reserva?" >
            <template v-slot:actions>
                <v-btn class="mx-auto" text="Não" @click="closeDialog()"></v-btn>
                <v-btn class="mx-auto" text="Sim" @click="deleteReservation(selectedReservation)"></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>
<script>
import UserService from '@/services/user.service';
export default {
    created(){
        UserService.listReservations().then(
            (response) =>{
                this.reservations = response;
            }
      );
    },
    data() {
        return {
            reservations: [],
            showDialog: false,
            selectedReservation: null,
        }
    },
    methods: {
        deleteReservation(reservation) {
            UserService.deleteReservation(reservation.id).then(
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
        generateMerchImageURL(imageURL) {
            return `${process.env.VUE_APP_API_URL}${imageURL}`;
        }
    }
}
</script>
