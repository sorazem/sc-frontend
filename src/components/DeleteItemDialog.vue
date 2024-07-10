<template>
    <div>
        <v-dialog :modelValue="showDialog" width="auto">
            <v-card max-width="400" text="Quer mesmo excluir este item?" >
                <template v-slot:actions>
                    <v-btn class="mx-auto" text="Não" @click="$emit('cancel-deletion')"></v-btn>
                    <v-btn class="mx-auto" text="Sim" @click="$emit('delete-item')"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    props: ['showDialog'],
}
</script>
