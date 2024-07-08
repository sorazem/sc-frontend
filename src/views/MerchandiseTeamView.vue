<template>
    <div>
        <v-btn color="#FF7A00" size="large" variant="flat">
            Adicionar mercadoria
        </v-btn>
        <v-card v-for="merch in merches" :key='merch.id' variant="outlined" class="my-8 pa-2 text-left">
            <v-card-title>{{merch.name}}</v-card-title>
            <v-card-subtitle class="mb-4">{{ formatPrice(merch.price)}}</v-card-subtitle>
            <v-card-actions class="d-flex justify-space-evenly">
                <v-btn text="Editar" variant="flat"></v-btn>
                <v-btn text="Excluir" variant="text" @click='deleteMerch(merch)'></v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import EventService from '../services/event.service.js';
export default {
    data() {
        return {
            merches: []
        }
    },
    methods: {
        deleteMerch(merch) {
            EventService.deleteMerch(this.$route.params.slug, merch.id).then((response) => {
                if (response.message) {
                    this.merches.splice(this.merches.indexOf(merch),1);
                }
            })
        },

        formatPrice(cents) {
            return `R$ ${(cents / 100).toFixed(2)}`;
        }
    },
    mounted() {
        EventService.getEventMerchandise(this.$route.params.slug).then((response) => {
            this.merches = response;
        })
    }
}
</script>
<style scoped>
    .v-card-actions > .v-btn{
        color: white;
        background-color: #FF7A00;
    }
    .v-card{
        width: 320px;
        border-radius: 16px;
        border-color: lightgray;
    }
</style>
