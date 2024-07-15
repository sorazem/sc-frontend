<template>
    <v-alert
        :title="message"
        :type="alertType"
        v-if="message"
        closable
        class="text-left"
  ></v-alert>
    <div class="d-flex flex-column">
        <v-img class="mb-6" src="../assets/certificate.png" :width="300"></v-img>
        <v-btn :loading="loading" class="mb-4" color="#FF7A00" size="large" variant="flat" @click="emit">
            Emitir certificados
        </v-btn>
        <v-btn color="#FF7A00" size="large" variant="flat" @click='openDialog'>
            Emitir certificado específico
        </v-btn>
        <v-dialog width='auto' v-model='showDialog'>
            <v-card text='Emitir para usuário'>
                <v-form v-model='form' class='pa-4' @submit.prevent='emitForUser()'>
                    <div class="text-subtitle-1 text-medium-emphasis text-left">Usuário</div>
                    <v-select
                            v-model="user_id"
                            class="mb-2"
                            variant="outlined"
                            density="compact"
                            :items="usersList"
                            item-title="name"
                            item-value="id"
                            ></v-select>
                    <v-btn type='submit' :disabled="!form" color="#FF7A00">Emitir</v-btn>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import EventService from '@/services/event.service';
export default {
    data(){
        return{
            message: "",
            alertType: "success",
            loading: false,
            showDialog: false,
            user_id: null,
            usersList: [],
        }
    },
    methods:{
        emit(){
            this.loading = true;
            EventService.emitEventCertifications(this.$route.params.slug).then(
                (response)=>{
                    this.message = response.data.message;
                },
                (error)=>{
                    this.alertType = "error";
                    this.message = error.message;
                }
            )
            this.loading = false;
        },
        openDialog(){
            this.showDialog = true;
        },
        emitForUser() {
            this.loading = true;
            EventService.emitUserEventCertifications(this.$route.params.slug, this.user_id).then(
                (response)=>{
                    this.message = response.data.message;
                },
                (error)=>{
                    this.alertType = "error";
                    this.message = error.message;
                }
            )
            this.loading = false;
        },
    },
    mounted() {
        EventService.getEventUsers(this.$route.params.slug).then((response) => {
            console.log(response);
            this.usersList = response;
        })
    },
}
</script>
<style scoped>
    
</style>
