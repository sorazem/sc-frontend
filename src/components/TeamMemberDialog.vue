<template>
    <v-dialog width='auto'>
        <v-card :text='member?.name'>
            <v-form v-model="form" class="pa-4" @submit.prevent = "submit()">
                <v-select
                    v-model="selectedPermission"
                    :items="permissions"
                    hint="Escolha o nível de permissão deste membro da equipe!"
                    label="Escolha"
                    persistent-hint
                  ></v-select>
                <v-btn type='submit' :disabled="!form">Atualizar</v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>
<script>
import eventService from '@/services/event.service';
export default {
    props: ['member'],
    watch: {
        member: function (newValue) {
            if (newValue !== null) {
                for (const val of [16, 8, 4, 2, 1]) {
                    if (newValue.permissions & val) {
                        this.selectedPermission = val;
                        break;
                    }
                }
            }
        }
    },
    data() {
        return {
            form: false,
            permissions: [
              { title: 'Admin', value: 16, props: { disabled: true } },
              { title: 'Lider de Equipe', value: 8, props: { disabled: false } },
              { title: 'Membro de Equipe', value: 4, props: { disabled: false } },
              { title: 'Palestrante', value: 2, props: { disabled: true } },
              { title: 'Participante', value: 1, props: { disabled: true } },
            ],
            selectedPermission: 0,
        }
    },
    methods: {
        required (v) { return !!v || 'Este campo é obrigatório'; },
        submit(){
            let updatedMember = { id: this.member.id, permissions: this.member.permissions };
            if (this.selectedPermission === 8) {
                updatedMember.permissions |= 0b01000;
                updatedMember.permissions &= 0b11011;
            } else {
                updatedMember.permissions |= 0b00100;
                updatedMember.permissions &= 0b10111;
            }
            eventService.updateMember(updatedMember, this.$route.params.slug).then((member) => { 
                this.$emit('closeDialog', member)
            });
        }
    },
}
</script>
