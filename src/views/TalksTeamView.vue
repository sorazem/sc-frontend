<template>
    <div>
        <v-btn color="#FF7A00" size="large" variant="flat">
            Adicionar palestra
        </v-btn>
        <v-card variant="outlined" class="my-8 pa-2 text-left">
            <v-card-title>Nome da palestra</v-card-title>
            <v-card-subtitle class="mb-4">Descrição da palestra</v-card-subtitle>
            <v-card-actions class="d-flex justify-space-evenly">
                <v-btn text="Editar" variant="flat"></v-btn>
                <v-btn text="Excluir" variant="text"></v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
export default {
    
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