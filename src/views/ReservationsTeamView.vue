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
        <v-card variant="outlined" class="my-8 pa-2 text-left">
            <v-card-title>Nome do usuário</v-card-title>
            <v-card-subtitle class="mb-4">Nome da mercadoria e preço</v-card-subtitle>
            <v-card-actions>
                <v-btn text="Marcar como entregue" variant="text" block></v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            nome: null
        }
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