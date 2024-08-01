<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="2000">{{ message }}</v-snackbar>
        <v-btn color="#FF7A00" size="large" variant="flat" @click="openNewDialog">
            Adicionar palestra
        </v-btn>
        <v-card variant="outlined" class="my-8 pa-2 text-left" v-for="talk in talks" :key="talk.id">
            <v-card-title class="text-wrap">{{ talk.title }}</v-card-title>
            <v-card-subtitle class="mb-4  text-subtitle-2">Palestrante: {{ talk.speakers[0].name }}</v-card-subtitle>
            <v-card-actions class="d-flex justify-space-evenly">
                <v-btn text="Editar" variant="flat" @click="openUpdateDialog(talk)"></v-btn>
                <v-btn text="Excluir" variant="text" @click="openDeleteDialog(talk)"></v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog
            v-model="dialogDelete"
            width="auto"
        >
            <v-card
                max-width="400"
                text="Quer mesmo excluir este item?"
            >
                <template v-slot:actions>
                    <v-btn
                        class="mx-auto"
                        text="Não"
                        @click="closeDeleteDialog"
                    ></v-btn>
                    <v-btn
                        class="mx-auto"
                        text="Sim"
                        @click="deleteItem(selectedTalk)"
                    ></v-btn>
                </template>
            </v-card>
        </v-dialog>
        <NewTalkDialog v-model="dialogNew" :willCreate='willCreate' :selectedTalk='selectedTalk' @closeDialog="closeDialog" @changeMessage="changeMessage" />
    </div>
</template>
<script>
import eventService from '@/services/event.service';
import NewTalkDialog from '@/components/NewTalkDialog.vue'
export default {
    data(){
        return{
            talks: [],
            message: '',
            snackbar: false,
            selectedTalk: null,
            dialogDelete: false,
            dialogNew: false,
            willCreate: true,
        }
    },
    components:{
        NewTalkDialog
    },
    methods:{
        openDeleteDialog(talk){
            this.dialogDelete = true;
            this.selectedTalk = talk;
        },
        openNewDialog() {
            this.selectedTalk = null;
            this.willCreate = true;
            this.dialogNew = true;
        },
        openUpdateDialog(talk) {
            this.selectedTalk = talk;
            this.willCreate = false;
            this.dialogNew = true;
        },
        deleteItem(talk){
            eventService.deleteEventTalk(talk.id)
            .then(
                (response)=>{
                    this.talks.splice(this.talks.indexOf(talk),1);
                    this.message = response.message
                }
            )
            .catch(
                (error)=>{
                    this.message = error.message;
                }
            )
            this.snackbar = true;
            this.dialogDelete = false;
        },
        closeDialog(){
            this.dialogNew = false;
            eventService.getEventTalks(this.$route.params.slug).then(
                (response)=>this.talks = response
            )
        },
        closeDeleteDialog() {
            this.dialogDelete = false;
            this.selectedTalk = null;
        },
        changeMessage(message){
            this.message = message;
            this.snackbar = true;
        }
    },
    mounted(){
        eventService.getEventTalks(this.$route.params.slug).then(
            (response)=>this.talks = response
        )
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
