<template>
    <v-sheet class="pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" elevation="3">
        <v-form
          v-model="form"
          @submit.prevent = "onSubmit()"
        >
            <div class="text-subtitle-1 text-medium-emphasis text-left">CPF</div>
            <v-text-field
                v-model="cpf"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                placeholder="CPF"
                clearable
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-card-account-details-outline"
                v-maska="'###.###.###-##'"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis text-left">Senha</div>
            <v-text-field
                v-model="password"
                :readonly="loading"
                :rules="[required]"
                placeholder="Senha"
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
                Entrar
            </v-btn>

            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>

            <span class="mt-8">
              Não possui uma conta? 
              <router-link class="mt-8" to="/signup">Cadastre-se!</router-link>
            </span>
        </v-form>
      </v-card>
    </v-sheet>
  </template>
<script>
import { DateTime } from 'luxon';
import { vMaska } from 'maska/vue';
export default {
    directives: { maska: vMaska },
    data() {
        return {
            password: null,
            cpf: null,
            form: false,
            visible: false,
            loading: false,
            message: null
        }
    },
    created() {
      const exp = localStorage.getItem('exp');
      if (this.$store.state.auth.status.loggedIn && DateTime.now() < DateTime.fromISO(exp)) {
        this.$router.push("/");
      }
    },
    methods:{
        onSubmit () {
        if (!this.form) return

        this.loading = true

        let user = {
          cpf: this.cpf,
          password: this.password
        }

        this.$store.dispatch("auth/login", user).then(
          () => {
            this.$router.push("/");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.errors) ||
              error.message ||
              error.toString();
          }
        );
      },
      required (v) {
        return !!v || 'Este campo é obrigatório'
      }
    }
}
</script>
<style scoped>
.v-field__prepend-inner { 
  color: #9C66BD;
}

.v-card{
  border-radius: 12px;
}

a{
  color: #9C66BD;
  font-size: 15px;
}

span{
  display: block;
  font-size: 15px;
  color: darkslategrey;
}
</style>
