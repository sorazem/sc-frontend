<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="2000">{{ message }}</v-snackbar>
        <v-btn color="#0085ff" size="large" variant="flat" @click="openNewDialog">
            Criar tipo de atividade
        </v-btn>
        <v-card variant="outlined" class="my-8 pa-2 text-left" v-for="type in types" :key="type.id">
            <v-card-title class="text-wrap"><v-chip size="large" :color="type.color">{{ type.name }}</v-chip></v-card-title>
            <v-card-subtitle class="mb-4 ml-2  text-subtitle-2">Cor: {{ type.color }}</v-card-subtitle>
            <v-card-actions class="d-flex justify-space-evenly">
                <v-btn text="Editar" variant="flat" @click="openUpdateDialog(type)"></v-btn>
                <v-btn text="Excluir" variant="text" @click="openDeleteDialog(type)"></v-btn>
            </v-card-actions>
        </v-card>
        <DeleteItemDialog :showDialog='dialogDelete' @cancel-deletion='dialogDelete = false' @delete-item='deleteType(selectedType)'/>
        <NewTypeDialog v-model='dialogNew' :willCreate='willCreate' :selectedType='selectedType' @closeDialog='closeNewDialog' @changeMessage='changeMessage'/>
    </div>
</template>
<script>
import DeleteItemDialog from '../components/DeleteItemDialog.vue'
import EventService from '../services/event.service.js'
import NewTypeDialog from '../components/NewTypeDialog.vue'
export default {
    components: {
        DeleteItemDialog,
        NewTypeDialog 
    },
    data() {
        return {
            types: [],
            selectedType: null,
            message: '',
            snackbar: false,
            dialogDelete: false,
            dialogNew: false,
            willCreate: true,
        }
    },
    methods: {
        deleteType(type) {
            EventService.deleteType(type).then(() => {
                this.dialogDelete = false;
                this.selectedType = null;
                EventService.getTypes().then((types) => this.types = types);
            })
        },

        openDeleteDialog(event) {
            this.selectedType = event;
            this.dialogDelete = true;
        },

        openNewDialog() {
            this.selectedType = null;
            this.willCreate = true;
            this.dialogNew = true;
        },

        openUpdateDialog(event) {
            this.selectedType = event;
            this.willCreate = false;
            this.dialogNew = true;
        },

        closeNewDialog() {
            this.dialogNew = false;
            EventService.getTypes().then((types) => this.types = types)
        },
        changeMessage(message){
            this.message = message;
            this.snackbar = true;
        }
    },
    mounted() {
        EventService.getTypes().then((types) => this.types = types)
    },
}
</script>
<style scoped>
    
</style>
