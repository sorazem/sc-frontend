<template>
    <div>
        <v-btn color="#FF7A00" size="large" variant="flat">
            Adicionar palestrante
        </v-btn>
        <v-card variant="outlined" class="my-8 pa-2 text-left" v-for="speaker in speakers" :key="speaker.id">
            <v-card-title>{{ speaker.name }}</v-card-title>
            <v-card-subtitle class="mb-4 text-wrap text-subtitle-2">{{ speaker.bio }}</v-card-subtitle>
            <v-card-actions class="d-flex justify-space-evenly">
                <v-btn text="Editar" variant="flat"></v-btn>
                <v-btn text="Excluir" variant="text" @click="openDialog(speaker.id)"></v-btn>
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
    </div>
</template>
<script>
import eventService from '@/services/event.service';
export default {
    data(){
        return{
            speakers: [],
            message: '',
            snackbar: false,
            selectedSpeaker: null,
            dialogDelete: false
        }
    },
    methods:{
        openDialog(id){
            this.dialogDelete = true;
            this.selectedSpeaker = id;
        },
        deleteItem(){
            eventService.deleteEventSpeaker(this.selectedSpeaker).then(
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
        eventService.getEventSpeakers(this.$route.params.slug).then(
            (response)=>this.speakers = response
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