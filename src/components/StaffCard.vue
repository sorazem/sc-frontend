<template>
    <v-card :color="color" :variant="variant" class="pa-4">
        <v-card-item>
            <v-card-title>{{ staff.name }}</v-card-title>
            <v-card-subtitle>DRE: {{ staff.dre }}</v-card-subtitle>
            <v-card-text class="d-flex justify-center">
                <ul>
                    <li>
                        {{role}}
                    </li>
                    <li>
                        {{staff.email}}
                    </li>
                </ul>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-around">
                <v-btn v-if="hasEditingPermissions" @click="$emit('edit-member', staff)">Editar</v-btn>
                <v-btn v-if="hasEditingPermissions" @click="$emit('remove-from-team', staff)">Remover</v-btn>
            </v-card-actions>
        </v-card-item>
    </v-card>
</template>
<script>
export default {
    props: ["staff", "mode", "hasEditingPermissions"],
    computed: {
        role() {
            if (this.staff.permissions & 16) { return 'Admin'; }
            if (this.staff.permissions & 8) { return 'Líder de Equipe'; }
            if (this.staff.permissions & 4) { return 'Membro de Equipe'; }
            if (this.staff.permissions & 2) { return 'Palestrante'; }
            if (this.staff.permissions & 1) { return 'Participante'; }
            return "";
        },
        color() {
            const colorMap = { current: "default", add: "green", remove: "red" }
            return colorMap[this.mode];
        },
        variant() {
            const variantMap = { current: "outlined", add: "tonal", remove: "tonal" }
            return variantMap[this.mode];
        },
    }
}
</script>
<style scoped>
.v-card-actions > .v-btn{
    color: white;
    background-color: #FF7A00;
}
</style>
