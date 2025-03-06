<template>
    <v-snackbar v-model="snackbar" :timeout="2000">{{ message }}</v-snackbar>
    <v-sheet class="pa-12">
        <v-card class="mx-auto px-6 py-8">
            <v-form v-model='form' @submit.prevent='onSubmit()'>
                <div class="text-subtitle-1 text-medium-emphasis text-left">
                    Senha
                </div>
                <v-text-field
                    v-model='password'
                    :rules='[required, min6]'
                    class='mb-2'
                    clearable
                    variant="outlined"
                    density="compact"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    @click:append-inner="visible = !visible"
                ></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis text-left">
                    Confirmar Senha
                </div>
                <v-text-field
                    v-model='passwordConfirmation'
                    :rules='[required, matchingPassword]'
                    class='mb-2'
                    clearable
                    variant="outlined"
                    density="compact"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="confirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="confirmVisible ? 'text' : 'password'"
                    @click:append-inner="confirmVisible = !confirmVisible"
                ></v-text-field>
                <v-btn
                    :disabled="!form"
                    :loading="loading"
                    color="#9C66BD"
                    size="large"
                    type="submit"
                    variant="flat"
                    block
                    class="mt-4">
                    Redefinir
                </v-btn>
            </v-form>
        </v-card>
    </v-sheet>
</template>
<script>
import AuthService from '@/services/auth.service';
export default {
    data() {
        return {
            message: null,
            snackbar: false,

            form: false,
            password: null,
            passwordConfirmation: null,

            loading: false,
            visible: false,
            confirmVisible: false,
        }
    },
    methods:{
        onSubmit () {
        if (!this.form) return
        this.loading = true
        AuthService.reset({ password: this.password, token: this.$route.query.token }).then((response) => {
            this.message = response.message;
            this.snackbar = true;
            this.loading = false;
        }).catch((err) => {
            this.message = err.message;
            this.snackbar = true;
        })
      },
      required (v) {
        return !!v || 'Este campo é obrigatório'
      },
      min6(v){
        return v.length >= 6 || 'A senha precisa ter no mínimo 6 caracteres'
      },
      matchingPassword(){
        return this.password == this.passwordConfirmation || 'As senhas não combinam'
      }
    }
}
</script>
