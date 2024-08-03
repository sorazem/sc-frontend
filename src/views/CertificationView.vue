<template>
    <div>
        <h1 class="mt-4">Certificados</h1>
        <p>Os certificados são enviados após o fim do evento</p>
        <p class="mb-8">Você participou dos seguintes eventos:</p>
        <v-card v-for="certification in certifications" :key="certification.title" variant="outlined" class="mb-4">
            <v-card-item>
                <h3>{{ certification.reason }}</h3>
                <p class="font-italic">{{ certificationType(certification.type) }}</p>
            </v-card-item>
        </v-card>
    </div>
</template>
<script>
import UserService from '@/services/user.service';
export default {
    data(){
        return{
            certifications: [],
            certificationTypes: {
                attendee_participation:"Participante",
                staff_participation:"Membro da equipe de organização"
            }
        }
    },
    methods:{
        certificationType(type){
            return this.certificationTypes[type];
        }
    },
    mounted(){
        UserService.getUserCertifications().then(
            (response)=>{
                this.certifications = response.filter((item) => item.type != 'talk_participation')
            }
        )
    }
}
</script>
<style scoped>
    
</style>
