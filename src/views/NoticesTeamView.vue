<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="2000">{{ message }}</v-snackbar>
        <v-btn color="#FF7A00" size="large" variant="flat" @click='openNewDialog'>
            Adicionar aviso
        </v-btn>
        <v-card v-for="notice in notices" :key="notice.title" variant="outlined" class="my-8 white-text pa-2 text-left">
            <v-card-title>{{ notice.title }}</v-card-title>
            <v-card-subtitle class="mb-4">{{ formatDate(notice.created_at) }}</v-card-subtitle>
            <v-card-item>
                <p>{{ notice.description }}</p>
            </v-card-item>
            <v-card-actions class="float-right">
                <v-btn text="Editar" variant="flat" @click='openUpdateDialog(notice)'></v-btn>
                <v-btn text="Excluir" variant="text" @click='openDeleteDialog(notice)'></v-btn>
            </v-card-actions>
        </v-card>
        <DeleteItemDialog :showDialog='dialogDelete' @cancel-deletion='dialogDelete = false' @delete-item='deleteNotice(selectedNotice)' />
        <NewNoticeDialog v-model='dialogNew' @closeDialog='closeDialog' :willCreate='willCreate' :selectedNotice='selectedNotice' @changeMessage='changeMessage'/>
    </div>
</template>
<script>
import DeleteItemDialog from '../components/DeleteItemDialog.vue'
import NewNoticeDialog from '../components/NewNoticeDialog.vue'
import EventService from '../services/event.service.js';
import { DateTime } from 'luxon';
export default {
    components: {
        DeleteItemDialog,
        NewNoticeDialog,
    },
    data(){
        return{
            notices: [],
            snackbar: false,
            dialogDelete: false,
            dialogNew: false,
            selectedNotice: null,
            message: '',
            willCreate: true,
        }
    },
    methods:{
        formatDate(date){
            return DateTime.fromISO(date).toFormat('dd/MM/yy hh:mm');
        },

        deleteNotice(notice) {
            EventService.deleteEventNotice(this.$route.params.slug, notice.id).then((response) => {
                this.notices.splice(this.notices.indexOf(notice), 1);
                this.message = response.message;
                this.snackbar = true;
                this.dialogDelete = false;
            })
        },

        openDeleteDialog(notice) {
            this.selectedNotice = notice;
            this.dialogDelete = true;
        },

        openNewDialog() {
            this.selectedNotice = null;
            this.willCreate = true;
            this.dialogNew = true;
        },

        openUpdateDialog(notice) {
            this.selectedNotice = notice;
            this.willCreate = false;
            this.dialogNew = true;
        },

        closeDialog() {
            this.dialogNew = false;
            EventService.getEventStaffNotices(this.$route.params.slug).then(
                (response)=>this.notices = response
            )
        },
        changeMessage(message){
            this.message = message;
            this.snackbar = true;
        }
    },
    mounted(){
        EventService.getEventStaffNotices(this.$route.params.slug).then(
            (response)=>this.notices = response
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
