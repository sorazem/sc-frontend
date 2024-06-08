<template>
    <v-sheet class="pa-12" rounded>
      <v-card class="mx-auto px-6 py-8" elevation="3" max-width="344">
        <v-form
          v-model="form"
          @submit.prevent = "onSubmit()"
        >
            <div class="text-subtitle-1 text-medium-emphasis text-left">Email</div>
            <v-text-field
                v-model="email"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                placeholder="Email"
                clearable
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-email-outline"
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

            <span class="mt-8">
              Não possui uma conta? 
              <router-link class="mt-8" to="/signup">Cadastre-se!</router-link>
            </span>
        </v-form>
      </v-card>
    </v-sheet>
  </template>
<script>
export default {
    data() {
        return {
            password: null,
            email: null,
            form: false,
            visible: false,
            loading: false
        }
    },
    methods:{
        onSubmit () {
        if (!this.form) return

        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
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