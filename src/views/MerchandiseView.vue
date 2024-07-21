<template>
    <div>
        <h1 class="mt-4">Mercadorias do evento</h1>
        <p class="mb-8 font-weight-light">Faça aqui a reserva, retire e pague presencialmente</p>
        <v-card class="mb-4" variant="outlined" v-for="merch in merchandise" :key="merch.id">
            <v-card-item class="text-left">
                <img :src="merchImage(merch)" alt="">
                <p class="font-weight-bold my-2">{{ merch.name }}</p>
                <p class="mb-2">R$ {{ merch.price / 100 }}</p>
                <p class="mb-2"></p>
                <v-row>
                    <v-col cols='6'>
                        <v-text-field
                            v-model="merch.quantity"
                            type='number'
                            label='Quantidade'
                            variant="outlined" 
                            density="compact" 
                        ></v-text-field>
                    </v-col>
                    <v-col cols='6'>
                        <v-select 
                            v-model="merch.cfOption" 
                            :placeholder="merch.cfName" 
                            variant="outlined" 
                            density="compact" 
                            :items="merch.cfValues"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-btn variant="flat" color="#9C66BD" block @click="saveMerch(merch)">Reservar</v-btn>
            </v-card-item>
        </v-card>
    </div>
</template>
<script>
import eventService from '@/services/event.service';
export default {
    data(){
        return{
            merchandise: [],
            size: null,
            optField: null,
        }
    },
    methods:{
        saveMerch(merch){
            let user = JSON.parse(localStorage.getItem('user')).user;
            let options = {}
            options[merch.cfName] = merch.cfOption;
            let payload = { merch_id: merch.id, user_id: user.id, amount: merch.quantity, options }
            eventService.createReservation(this.$route.params.slug, payload).then((response) => {
                console.log(response);
            })
        },
        merchImage(merch) {
            if (merch.image_url) {
                return `${process.env.VUE_APP_API_URL}${merch.image_url}`;
            } else return '';
        }
    },
    created(){
        eventService.getEventMerchandise(this.$route.params.slug).then(
            (response) =>{
                this.merchandise = response.map((merch) => {
                    merch.cfName = Object.keys(merch.custom_fields)[0];
                    merch.cfValues = Object.values(merch.custom_fields[merch.cfName])
                    merch.cfOption = null;
                    return merch;
                });
            }
        )
    }
}
</script>
<style scoped>
.v-card{
    width: 300px;
}
img {
    width: 100%;
}
</style>
