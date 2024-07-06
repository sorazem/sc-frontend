<template>
    <div id="menu" class="pa-4 d-flex align-content-space-between flex-wrap">
        <v-card
            v-for="item in menuItems"
            :key="item.title"
            class="mb-4 mr-auto"
            variant="tonal"
        >
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
    data(){
        return{
            menuItems: [
                    { title: 'Palestrantes', path: '/' + this.$route.params.slug + '/programacao', icon: 'mdi-account-voice'},
                    { title: 'Palestras', path: '/' + this.$route.params.slug + '/agenda', icon: 'mdi-human-male-board'},
                    { title: 'Mural de avisos', path: '/' + this.$route.params.slug + '/inscricao', icon: 'mdi-message-outline'},
                    { title: 'Certificados', path: '/' + this.$route.params.slug + '/mercadorias', icon: 'mdi-file-certificate-outline' },
                    { title: 'Mercadorias', path: '/' + this.$route.params.slug + '/avisos', icon: 'mdi-package-variant-closed' },
                    { title: 'Reservas', path: '/' + this.$route.params.slug + '/avisos', icon: 'mdi-shopping-outline' },
                    { title: 'Auditoria', path: '/' + this.$route.params.slug + '/avisos', icon: 'mdi-file-clock-outline' }
                ]
        }
    }
}
</script>
<style scoped>
    #menu{
        width: 600px;
    }
    .v-card, a{
        width: 156px;
        height: 120px;
    }
    a{
        display: grid;
    }
    @media screen and (max-width: 600px) {
    .v-row{
        width: 40vw;
    }
}
</style>