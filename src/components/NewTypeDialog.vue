<template>
    <v-dialog width='auto'>
        <v-card text="Novo tipo">
            <v-form v-model="form" class="pa-4" @submit.prevent = "submit()">
                <div class="text-subtitle-1 text-medium-emphasis text-left">Nome</div>
                <v-text-field
                    v-model='type.name'
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                    ></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis text-left">Cor</div>
                <v-text-field
                    v-model='type.color'
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                    ></v-text-field>
                <v-btn type="submit" :disabled="!form" color="#0085ff">Enviar</v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>
<script>
import eventService from '@/services/event.service';
export default {
    props: ['willCreate', 'selectedType'],
    watch: {
        selectedType: function (newValue) {
            if (newValue !== null) {
                this.type = { ...newValue };
            } else {
                this.type = {
                    name: null,
                    color: null,
                }
            }
        },
    },
    data() {
        return {
            form: false,
            type: {
                name: null,
                color: null,
            },
        }
    },
    methods:{
        required (v) {
            return !!v || 'Este campo é obrigatório'
        },
        submit(){
            if (this.willCreate) {
                eventService.createType(this.type).then(this.$emit('closeDialog'))
            } else {
                eventService.updateType(this.type).then(this.$emit('closeDialog'))
            }
        }
    },
}
</script>
