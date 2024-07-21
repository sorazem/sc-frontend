<template>
    <v-card :color="color" :variant="variant">
        <v-card-item>
            <v-card-title>{{ staff.name }}</v-card-title>
            <v-card-subtitle>DRE: {{ staff.dre }}</v-card-subtitle>
        </v-card-item>
        <v-card-text>
            <table>
                <tr>
                    <th> Role </th>
                    <th> Email </th>
                </tr>
                <tr>
                    <td>{{role}}</td>
                    <td>{{staff.email}}</td>
                </tr>
            </table>
        </v-card-text>
        <v-btn @click="$emit('edit-member', staff)">Editar</v-btn>
        <v-btn @click="$emit('remove-from-team', staff)">Remover</v-btn>
    </v-card>
</template>
<script>
export default {
    props: ["staff", "mode"],
    computed: {
        role() {
            if (this.staff.permissions & 16) { return 'Líder de Equipe'; }
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
