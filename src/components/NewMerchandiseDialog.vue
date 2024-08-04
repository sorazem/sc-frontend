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
                <div class="text-subtitle-1 text-medium-emphasis text-left">Preço <span class="text-caption">(Use ponto como separador decimal)</span></div>
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
                <p>Gostaria de adicionar um campo customizado?</p>
                <v-switch
                    v-model="showCustomField"
                    :label="showCustomField? 'Sim' : 'Não'"
                    color="#FF7A00"
                ></v-switch>
                <div class="text-subtitle-1 text-medium-emphasis text-left" v-if="showCustomField">Nome do campo</div>
                <v-text-field
                    v-model="custom_fields_name"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                    placeholder="Ex: Tamanho"
                    v-if="showCustomField"
                ></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis text-left" v-if="showCustomField">
                    <p>Valores do campo</p>
                    <p class="text-caption">Separe os valores por ponto e vírgula</p>
                </div>
                <v-text-field
                    v-model="cfValue"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                    placeholder="Ex: P;M;G;GG"
                    hide-details
                    v-if="showCustomField"
                ></v-text-field>
                <div v-if="showCustomField">
                    <v-chip v-for="value in custom_fields_values" :key="value" color="#FF7A00">{{value}}</v-chip>
                </div>
                    <v-btn class="d-block mt-8" type="submit" :disabled="!form" color="#FF7A00">Enviar</v-btn>
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
        cfValue: function(){
            this.custom_fields_values = this.cfValue.split(";");
        },
        selectedMerch: function (newValue) {
            if (newValue !== null) {
                this.merch = {...newValue};
                this.merch.price = (newValue.price / 100).toFixed(2);
                if (newValue.custom_fields) {
                    this.showCustomField = true;
                    this.custom_fields_name = Object.keys(newValue.custom_fields)[0];
                    this.cfValue = Object.values(Object.values(newValue.custom_fields)[0]).join(';')
                } else {
                    this.merch.custom_fields = {}
                }
            } else {
                this.merch = { name: null, stock: null, price: null, image: null, custom_fields: {} }
            }
        },
    },
    data() {
        return {
            form: false,
            showCustomField: false,
            merch: {
                name: null,
                price: null,
                stock: null,
                event_id: null,
                image: null,
                custom_fields: {},
            },
            custom_fields_name: null,
            custom_fields_values: [],
            cfValue: '',
            event: null,
        }
    },
    methods: {
        required (v) {
            return !!v || 'Este campo é obrigatório'
        },
        empty(v) {
            return !!v || 'Termine de preencher esse campo!'
        },
        submit(){
            this.merch.event_id = this.event.id;
            this.merch.price = this.merch.price * 100;
            this.merch.custom_fields[this.custom_fields_name] = this.custom_fields_values;
            if (this.willCreate) {
                eventService.createMerch(this.$route.params.slug, this.merch)
                .then(
                    () => {
                        this.$emit('changeMessage', "Criação feita com sucesso.");
                        this.$emit('closeDialog');
                    }
                )
                .catch(
                    (error) => {
                        this.$emit('changeMessage', error.message);
                        this.$emit('closeDialog');
                    }
                )
            } else {
                eventService.updateMerch(this.$route.params.slug, this.merch)
                .then(
                    () => {
                        this.$emit('changeMessage', "Alteração feita com sucesso.");
                        this.$emit('closeDialog');
                    }
                )
                .catch(
                    (error) => {
                        this.$emit('changeMessage', error.message);
                        this.$emit('closeDialog');
                    }
                )
            }
        },
        addOption(){
            this.custom_fields_values.push(this.cfValue);
            this.cfValue = "";
        },
        removeOption(value) {
            this.custom_fields_values.splice(this.custom_fields_values.indexOf(value), 1);
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
</style>
