<template>
    <v-card :color="color" :variant="variant">
        <v-row>
            <v-col cols='7'>
                <v-card-item>
                    <v-card-title>{{ staff.name }}</v-card-title>
                    <v-card-subtitle>DRE: {{ staff.dre }}</v-card-subtitle>
                </v-card-item>
            </v-col>
            <v-col cols='5'>
                <v-card-text>
                    <ul>
                        <li>
                            {{role}}
                        </li>
                        <li>
                            {{staff.email}}
                        </li>
                    </ul>
                </v-card-text>
            </v-col>
            <v-col cols='6'>
                <v-btn v-if="hasEditingPermissions" @click="$emit('edit-member', staff)">Editar</v-btn>
            </v-col>
            <v-col cols='6'>
                <v-btn v-if="hasEditingPermissions" @click="$emit('remove-from-team', staff)">Remover</v-btn>
            </v-col>
        </v-row>
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
            const variantMap = { current: "elevated", add: "tonal", remove: "tonal" }
            return variantMap[this.mode];
        },
    }
}
</script>
