<template>
    <div>
        <v-btn color="#FF7A00" size="large" variant="flat">
            Adicionar aviso
        </v-btn>
        <v-card variant="outlined" class="my-8 white-text pa-2 text-left">
            <v-card-title>Título do aviso</v-card-title>
            <v-card-subtitle class="mb-4">Data do aviso</v-card-subtitle>
            <v-card-item>
                <p>Conteúdo do aviso</p>
            </v-card-item>
            <v-card-actions class="float-right">
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