<template>
    <v-card 
        class="pa-4 mb-8" 
        variant="outlined" 
        >
            <v-card-item class="d-flex flex-column">
                <v-chip density="compact" variant="tonal" v-if="palestra.type" :color="palestra.type.color">{{ palestra.type.name }}</v-chip>
                <v-chip density="compact" variant="tonal" v-if="palestra.category" :color="palestra.category.color">{{ palestra.category.name }}</v-chip>
                <h2 class="mt-2">{{ palestra.title }}</h2>
                <div class="text-left mt-4">
                    <p><span>Palestrante:</span> {{ palestra.speaker?.name }}</p>
                    <p><span>Local:</span> {{ palestra.location?.name }}</p>
                </div>
            </v-card-item>
    </v-card>
</template>
<script>
export default {
    props: {
        palestra: Object
    }

}
</script>
<style scoped>
    .v-card{
        width: 320px;
        border-radius: 16px;
    }

    span{
        font-weight: 600;
    }
</style>