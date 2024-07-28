<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="2000">{{ message }}</v-snackbar>
        <v-btn color="#0085ff" size="large" variant="flat" @click="openNewDialog">
            Criar evento
        </v-btn>
        <v-card variant="outlined" class="my-8 pa-2 text-left" v-for="event in events" :key="event.id">
            <v-card-title class="text-wrap">
                <router-link :to="`/${event.slug}/menu-equipe`">
                    {{ event.name }}
                </router-link>
            </v-card-title>
            <v-card-subtitle class="mb-4  text-subtitle-2">De {{ formatDate(event.start_date) }} até {{ formatDate(event.end_date) }}</v-card-subtitle>
            <v-card-actions class="d-flex justify-space-evenly">
                <v-btn text="Editar" variant="flat" @click="openUpdateDialog(event)"></v-btn>
                <v-btn text="Excluir" variant="text" @click="openDeleteDialog(event)"></v-btn>
            </v-card-actions>
        </v-card>
        <DeleteItemDialog :showDialog='dialogDelete' @cancel-deletion='dialogDelete = false' @delete-item='deleteEvent(selectedEvent)'/>
        <NewEventDialog v-model='dialogNew' :willCreate='willCreate' :selectedEvent='selectedEvent' @closeDialog='closeNewDialog'/>
    </div>
</template>
<script>
import DeleteItemDialog from '../components/DeleteItemDialog.vue'
import NewEventDialog from '../components/NewEventDialog.vue'
import { DateTime } from 'luxon';
import EventService from '../services/event.service.js'
export default {
    components: {
        DeleteItemDialog,
        NewEventDialog,
    },
    data(){
        return{
            events: [],
            message: '',
            selectedEvent: null,
            snackbar: false,
            dialogDelete: false,
            dialogNew: false,
            willCreate: true,
        }
    },
    methods: {
        updateEvents() {
            EventService.listEvents().then((events) => this.events = events);
        },

        formatDate(date){
            return DateTime.fromISO(date).toFormat('dd/MM/yy');
        },

        deleteEvent(event) {
            EventService.deleteEvent(event).then(() => {
                this.dialogDelete = false;
                this.selectedEvent = null;
                this.updateEvents();
            })
        },

        openDeleteDialog(event) {
            this.selectedEvent = event;
            this.dialogDelete = true;
        },

        openNewDialog() {
            this.selectedEvent = null;
            this.willCreate = true;
            this.dialogNew = true;
        },

        openUpdateDialog(event) {
            this.selectedEvent = event;
            this.willCreate = false;
            this.dialogNew = true;
        },

        closeNewDialog() {
            this.dialogNew = false;
            this.updateEvents();
        }
    },
    mounted() {
        this.updateEvents();
    }
}
</script>
<style scoped>
    
</style>
