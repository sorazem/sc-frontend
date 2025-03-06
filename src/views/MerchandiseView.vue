<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="2000">{{ message }}</v-snackbar>
        <h1 class="mt-4">Mercadorias do evento</h1>
        <p class="mb-8 font-weight-light">Faça aqui a reserva, retire e pague presencialmente</p>
        <v-card class="mb-4" variant="outlined" v-for="merch in merchandise" :key="merch.id">
            <v-img :src="merchImage(merch)" max-height="300" cover></v-img>
            <v-card-item class="text-left">
                <p class="font-weight-bold my-2">{{ merch.name }}</p>
                <p class="mb-2">{{ formatPrice(merch.price)}}</p>
                <p class="mb-2"></p>
                <v-row>
                    <v-col cols='6'>
                        <v-text-field
                            v-model="merch.quantity"
                            type='number'
                            min="1"
                            :max="merch.limit || 20"
                            label='Quantidade'
                            variant="outlined" 
                            density="compact" 
                        ></v-text-field>
                    </v-col>
                    <v-col cols='6'>
                        <v-select 
                            v-if="merch.cfName"
                            v-model="merch.cfOption" 
                            :placeholder="merch.cfName" 
                            variant="outlined" 
                            density="compact" 
                            :items="merch.cfValues"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-btn variant="flat" color="#9C66BD" block @click="saveMerch(merch)" :disabled="disabled(merch)">Reservar</v-btn>
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
            snackbar: false,
            message: ''
        }
    },
    methods:{
        saveMerch(merch){
            let user = this.$store.state.auth.user;
            let options = {}
            options[merch.cfName] = merch.cfOption;
            let payload = { merch_id: merch.id, user_id: user.id, amount: merch.quantity, options }
            eventService.createReservation(this.$route.params.slug, payload)
            .then(() => {
                this.message = "Reserva criada!";
                this.snackbar = true;
            })
            .catch(
                (error)=>{
                    this.message = Object.values(error.response.data).join(', ');
                    this.snackbar = true;
                }
            )
        },
        formatPrice(cents) {
            return `R$ ${(cents / 100).toFixed(2)}`;
        },
        merchImage(merch) {
            if (merch.image_url) {
                return `${process.env.VUE_APP_API_URL}${merch.image_url}`;
            } else return '';
        },
        disabled(merch){
            return merch.quantity <=0 || merch.quantity > 20
        }
    },
    created(){
        eventService.getEventMerchandise(this.$route.params.slug).then(
            (response) =>{
                this.merchandise = response.map((merch) => {
                    if(merch.custom_fields !== null){
                        merch.cfName = Object.keys(merch.custom_fields)[0];
                        merch.cfValues = Object.values(merch.custom_fields[merch.cfName])
                        merch.cfOption = null;
                    }
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
