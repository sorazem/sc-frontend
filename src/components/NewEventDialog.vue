<template>
    <v-dialog width="auto">
        <v-card text="Novo evento" >
            <v-form v-model="form" class="pa-4" @submit.prevent = "submit()">
                <div class="text-subtitle-1 text-medium-emphasis text-left">Nome</div>
                <v-text-field
                    v-model="event.name"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Slug</div>
                <p class="text-caption text-medium-emphasis">É a parte que aparece na URL do evento. Se deixada em branco, ela por padrão será gerada como uma versão urlficada do nome.</p>
                <v-text-field
                    v-model="event.slug"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Data de início</div>
                <v-text-field
                    v-model="event.start_date"
                    type="datetime-local"
                    :rules="[required]"
                    class="mb-2"
                    variant="outlined"
                    density="compact"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Data de fim</div>
                <v-text-field
                    v-model="event.end_date"
                    type="datetime-local"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                    :min="event.start_date"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis text-left">Data de começo das inscrições</div>
                <v-text-field
                    v-model="event.registration_start_date"
                    type="datetime-local"
                    :rules="[required]"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis text-left">Imagem de Banner</div>
                <img v-if="event.banner_url !== ''" :src="imageUrl(event.banner_url)" alt="Imagem de Banner Atual"/>
                <p class="text-caption text-medium-emphasis">Recomendamos o formato 16:9.</p>
                <v-file-input 
                    v-model="event.banner"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-file-input>
                <div class="text-subtitle-1 text-medium-emphasis text-left">Imagem de Fundo dos Certificados</div>
                <img v-if="event.cert_background_url !== ''" :src="imageUrl(event.cert_background_url)" alt="Imagem de cert_background Atual"/>
                <p class="text-caption text-medium-emphasis">Recomendamos o formato 16:9.</p>
                <v-file-input 
                    v-model="event.cert_background"
                    class="mb-2"
                    clearable
                    variant="outlined"
                    density="compact"
                ></v-file-input>

                <v-btn type="submit" :disabled="!form" color="#0085ff">Enviar</v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>
<script>
import eventService from '@/services/event.service';
export default {
    props: ['willCreate', 'selectedEvent'],
    watch: {
        selectedEvent: function (newValue) {
            if (newValue !== null) {
                this.event = { ...newValue };
                this.event.start_date = newValue.start_date.substring(0, 19);
                this.event.end_date = newValue.end_date.substring(0, 19);
                this.event.registration_start_date = newValue.registration_start_date.substring(0, 19);
            } else {
                this.event = {
                    name: null,
                    start_date: null,
                    end_date: null,
                    registration_start_date: null,
                    slug: null,
                    banner: null,
                    cert_background: null,
                }
            }
        },
    },
    data(){
        return{
            form: false,
            event: {
                name: null,
                slug: null,
                start_date: null,
                end_date: null,
                registration_start_date: null,
                banner: null,
                cert_background: null,
            },
        }
    },
    methods:{
        required (v) {
            return !!v || 'Este campo é obrigatório'
        },
        submit(){
            if (this.willCreate) {
                if (this.event.slug == null) { delete this.event.slug; }
                eventService.createEvent(this.event)
                .then(
                    () => {
                        this.$emit('changeMessage', "Evento criado com sucesso.");
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
                eventService.updateEvent(this.event)
                .then(
                    () => {
                        this.$emit('changeMessage', "Evento editado com sucesso.");
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
        imageUrl(blob) {
            return `${process.env.VUE_APP_API_URL}/${blob}`
        }
    },
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
    img {
        width: 100%;
        object-fit: contain;
    }
</style>

