<template>
    <v-dialog width='auto'>
        <v-card text='Nova categoria'>
            <v-form v-model='form' class='pa-4' @submit.prevent='submit()'>
                <div class="text-subtitle-1 text-medium-emphasis text-left">Nome</div>
                <v-text-field
                    v-model='category.name'
                    :rules='[required]'
                    class='mb-2'
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis text-left">Cor</div>
                <v-text-field
                    v-model='category.color'
                    :rules='[required]'
                    class='mb-2'
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>
                <v-btn type="submit" :disabled="!form" color="#FF7A00">Enviar</v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>
<script>
import eventService from '@/services/event.service';
import store from '@/store';
export default {
    props: ['willCreate', 'selectedCategory'],
    watch: {
        selectedCategory: function(newValue) {
            if (newValue !== null) {
                this.category = newValue;
            } else {
                this.category = { name: null, color: null, event_id: null }
            }
        }
    },
    data() {
        return {
            form: false,
            category: {
                name: null,
                color: null,
                event_id: null,
            },
            event: null
        }
    },
    methods: {
        required (v) {
            return !!v || 'Este campo é obrigatório'
        },
        submit(){
            this.category.event_id = this.event.id;
            if (this.willCreate) {
                eventService.createCategory(this.$route.params.slug, this.category).then(() => { this.$emit('closeDialog')})
            } else {
                eventService.updateCategory(this.$route.params.slug, this.category).then(() => { this.$emit('closeDialog')})
            }
        }
    },
    mounted() {
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
