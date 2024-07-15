<template>
    <v-dialog width='auto'>
        <v-card :text="'Nova mercadoria'">
            <v-form v-model='form' class='pa-4' @submit.prevent='submit()'>
                <div class="text-subtitle-1 text-medium-emphasis text-left">Nome</div>
                <v-text-field
                    v-model="merch.name"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis text-left">Preço</div>
                <v-text-field
                    v-model="merch.price"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis text-left">Quantidade em Estoque</div>
                <v-text-field
                    v-model="merch.stock"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis text-left">Imagem</div>
                <v-file-input 
                    v-model="merch.image"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-file-input>
                <v-btn type="submit" :disabled="!form" color="#FF7A00">Enviar</v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>
<script>
import eventService from '@/services/event.service';
import store from '@/store';
export default {
    props: ['willCreate', 'selectedMerch'],
    watch: {
        selectedMerch: function (newValue) {
            if (newValue !== null) {
                this.merch = newValue;
            } else {
                this.merch = { name: null, stock: null, price: null, image: null }
            }
        },
    },
    data() {
        return {
            form: false,
            merch: {
                name: null,
                price: null,
                stock: null,
                event_id: null,
                image: null,
            },
            event: null,
        }
    },
    methods: {
        required (v) {
            return !!v || 'Este campo é obrigatório'
        },
        submit(){
            this.merch.event_id = this.event.id;
            if (this.willCreate) {
                eventService.createMerch(this.$route.params.slug, this.merch).then(() => { this.$emit('closeDialog')})
            } else {
                eventService.updateMerch(this.$route.params.slug, this.merch).then(() => { this.$emit('closeDialog')})
            }
        }
    },
    mounted() {
        if (this.selectedMerch) {
            this.merch = this.selectedMerch;
        }
        if(Object.keys(store.state.eventMap).includes(this.$route.params.slug)){
            this.event = store.state.eventMap[this.$route.params.slug]
        }
        else{
            eventService.getEventSchedule(this.$route.params.slug).then(
                (response)=>{
                    store.commit('addEventToMap', {slug: this.$route.params.slug, event: response});
                    this.event = response;
                }
            )
        }
    }
}
</script>
<style scoped>
.v-card{
    width: 320px;
    border-radius: 16px;
}

span{
    font-weight: 600;
}
</style>
