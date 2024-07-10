<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="2000">{{ message }}</v-snackbar>
        <v-btn color="#FF7A00" size="large" variant="flat" @click="dialogNew = true">
            Adicionar palestra
        </v-btn>
        <v-card variant="outlined" class="my-8 pa-2 text-left" v-for="talk in talks" :key="talk.id">
            <v-card-title class="text-wrap">{{ talk.title }}</v-card-title>
            <v-card-subtitle class="mb-4  text-subtitle-2">Palestrante: {{ talk.speaker.name }}</v-card-subtitle>
            <v-card-actions class="d-flex justify-space-evenly">
                <v-btn text="Editar" variant="flat"></v-btn>
                <v-btn text="Excluir" variant="text" @click="openDialog(talk.id)"></v-btn>
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
                        @click="dialogDelete = false"
                    ></v-btn>
                    <v-btn
                        class="mx-auto"
                        text="Sim"
                        @click="deleteItem()"
                    ></v-btn>
                </template>
            </v-card>
        </v-dialog>
        <NewItemDialog v-model="dialogNew" type="palestra" />
    </div>
</template>
<script>
import eventService from '@/services/event.service';
import NewItemDialog from '@/components/NewItemDialog.vue'
export default {
    data(){
        return{
            talks: [],
            message: '',
            snackbar: false,
            selectedTalk: null,
            dialogDelete: false,
            dialogNew: false
        }
    },
    components:{
        NewItemDialog
    },
    methods:{
        openDialog(id){
            this.dialogDelete = true;
            this.selectedTalk = id;
        },
        deleteItem(){
            console.log(this.selectedTalk);
            eventService.deleteEventTalk(this.selectedTalk).then(
                (response)=>this.message = response.message,
                (error)=>{
                    this.message = error.message;
                }
            );
            this.snackbar = true;
            this.dialogDelete = false;
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