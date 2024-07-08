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
        <v-btn color="#FF7A00" size="large" variant="flat">
            Emitir certificado específico
        </v-btn>
    </div>
</template>
<script>
import EventService from '@/services/event.service';
export default {
    data(){
        return{
            message: "",
            alertType: "success",
            loading: false
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
        }
    }
}
</script>
<style scoped>
    
</style>