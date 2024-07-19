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
    </v-card>
</template>
<script>
export default {
    props: ["staff", "variant", "color"],
    computed: {
        role() {
            if (this.staff.permissions & 4) { return 'Membro de Equipe'; }
            if (this.staff.permissions & 8) { return 'Líder de Equipe'; }
            return "";
        }
    }
}
</script>
