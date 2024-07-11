<template>
    <v-sheet class="pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" elevation="3">
        <v-form
          v-model="form"
          @submit.prevent = "onSubmit()"
        >
            <div class="text-subtitle-1 text-medium-emphasis text-left">Nome completo</div>
            <v-text-field
                v-model="name"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                placeholder=""
                clearable
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-format-letter-case"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis text-left">CPF</div>
            <v-text-field
                v-model="cpf"
                type="number"
                hide-spin-buttons
                hint="Apenas números"
                persistent-hint
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                placeholder=""
                clearable
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-card-account-details-outline"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis text-left">Ocupação</div>
            <v-combobox
                v-model="ocupacao"
                :items="ocupacaoItems"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                placeholder=""
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-briefcase-outline"
            ></v-combobox>

            <div class="text-subtitle-1 text-medium-emphasis text-left" v-if="ocupacao != null">Instituição</div>
            <v-combobox
                v-if="ocupacao != 'Estudante de ensino médio' && ocupacao != null"
                v-model="instituicao"
                :items="instituicaoSuperiorItems"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                placeholder=""
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-office-building-outline"
            ></v-combobox>
            <v-combobox
                v-if="ocupacao == 'Estudante de ensino médio'"
                v-model="instituicao"
                :items="instituicaoMedioItems"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                placeholder=""
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-office-building-outline"
            ></v-combobox>

            <div class="text-subtitle-1 text-medium-emphasis text-left" v-if="instituicao == 'UFRJ' && ocupacao == 'Estudante de ensino superior'">DRE</div>
            <v-text-field
                v-if="instituicao == 'UFRJ' && ocupacao == 'Estudante de ensino superior'"
                v-model="dre"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                placeholder=""
                clearable
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-numeric"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis text-left">Email</div>
            <v-text-field
                v-model="email"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                placeholder=""
                clearable
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-email-outline"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis text-left">Senha</div>
            <v-text-field
                v-model="password"
                :readonly="loading"
                :rules="[required, min6]"
                placeholder=""
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                @click:append-inner="visible = !visible"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis text-left">Confirmar senha</div>
            <v-text-field
                v-model="confirmPassword"
                :readonly="loading"
                :rules="[required, matchingPassword]"
                placeholder=""
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                @click:append-inner="visible = !visible"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            ></v-text-field>
  
            <v-btn
                :disabled="!form"
                :loading="loading"
                color="#9C66BD"
                size="large"
                type="submit"
                variant="flat"
                block
                class="mt-4"
            >
                Cadastrar
            </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </template>
<script>
import { DateTime } from 'luxon';
export default {
    data() {
        return {
            form: false,
            visible: false,
            loading: false,
            name: null,
            password: null,
            confirmPassword: null,
            email: null,
            cpf: null,
            ocupacao: null,
            instituicao: null,
            dre: null,
            ocupacaoItems: ['Estudante de ensino superior', 'Estudante de ensino médio', 'Professor'],
            instituicaoSuperiorItems: ['UFRJ', 'UFF', 'UERJ', 'UFRRJ', 'PUC', 'UNIRIO', 'UVA', 'Estácio de Sá', 'CEFET', 'FAETEC', 'Pedro II', 'Outros'],
            instituicaoMedioItems: ['Pedro II', 'CEFET', 'CAp UFRJ', 'Outros']
        }
    },
    mounted() {
        const loggedIn = JSON.parse(localStorage.getItem('user'))?.token;
        const exp = JSON.parse(localStorage.getItem('user'))?.exp;
        if (loggedIn && DateTime.now() < DateTime.fromISO(exp)) {
            this.$router.push("/");
        }
    },
    methods:{
        onSubmit () {
        if (!this.form) return

        this.loading = true

        let user = {
            name: this.name,
            cpf: this.cpf,
            email: this.email,
            password: this.password,
            dre: this.dre,
            ocupation: this.ocupacao,
            institution: this.instituicao
        }
        
        this.$store.dispatch("auth/register", user).then(
            (data) => {
                this.message = data.message;
                this.loading = false;
                this.$router.push("/login");
            },
            (error) => {
                this.message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
                this.loading = false;
        }
        )
      },
      required (v) {
        return !!v || 'Este campo é obrigatório'
      },
      min6(v){
        return v.length >= 6 || 'A senha precisa ter no mínimo 6 caracteres'
      },
      matchingPassword(){
        return this.password == this.confirmPassword || 'As senhas não combinam'
      }
    }
}
</script>
<style>
.v-field__prepend-inner { 
    color: purple;
}

.v-card{
  border-radius: 12px;
}
</style>