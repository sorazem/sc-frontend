<template>
    <v-snackbar v-model="snackbar" :timeout="2000">{{ message }}</v-snackbar>
    <v-sheet class="pa-12">
        <v-card class="mx-auto px-6 py-8">
            <v-form v-model='form' @submit.prevent='onSubmit()'>
                <div class="text-subtitle-1 text-medium-emphasis text-left">
                    E-mail para redefinição de senha
                </div>
                <v-text-field
                    v-model='email'
                    :rules='[required]'
                    class='mb-2'
                    clearable
                    variant="outlined"
                    density="compact"
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
            loading: false,
            email: null,
        }
    },
    methods: {
        onSubmit () {
        if (!this.form) return
        this.loading = true
        AuthService.forget(this.email).then((response) => {
            this.message = response.message;
            this.snackbar = true;
            this.loading = false;
        })
      },
      required (v) {
        return !!v || 'Este campo é obrigatório'
      }
    },
}
</script>
