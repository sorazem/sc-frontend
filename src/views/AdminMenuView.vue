<template>
    <div class="content pa-4 d-flex flex-wrap grid-item">
        <v-card v-for="item in menuItems" :key="item.title" class="mb-4 mx-auto" variant="tonal">
            <router-link :to="item.path">
                <v-card-item>
                    <v-icon size="x-large" :icon="item.icon" class="mb-2"></v-icon>
                    <p>{{item.title}}</p>
                </v-card-item>
            </router-link>
        </v-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                menuItems: [
                    { title: 'Eventos', path: '/admin/eventos', icon: 'mdi-account-voice' },
                    { title: 'Tipos', path: '/admin/tipos', icon: 'mdi-human-male-board' },
                ]
            }
        },
    }
</script>
<style scoped>
.v-card, a {
    width: 156px;
    height: 120px;
}
a {
    display: grid;
}
.grid-item{
        flex-grow: 1;
        display: flex;
        justify-content: center;
    }
@media screen and (max-width: 600px) {
    .v-row{
        width: 40vw;
    }
}
</style>
