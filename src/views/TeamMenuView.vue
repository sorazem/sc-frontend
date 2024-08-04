<template>
    <div class="content pa-4 d-flex flex-wrap">
        <div class="grid-item" v-for="item in menuItems" :key="item.title">
            <v-card
                class="mb-4 mx-2"
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
    </div>
</template>
<script>
export default {
    data(){
        return{
            menuItems: [
                    { title: 'Palestrantes', path: '/' + this.$route.params.slug + '/menu-equipe/palestrantes', icon: 'mdi-account-voice'},
                    { title: 'Palestras', path: '/' + this.$route.params.slug + '/menu-equipe/palestras', icon: 'mdi-human-male-board'},
                    { title: 'Categorias', path: '/' + this.$route.params.slug + '/menu-equipe/categorias', icon: 'mdi-tag-outline'},
                    { title: 'Presenças', path: '/' + this.$route.params.slug + '/menu-equipe/presencas', icon: 'mdi-draw-pen'},
                    { title: 'Mural de avisos', path: '/' + this.$route.params.slug + '/menu-equipe/avisos', icon: 'mdi-message-outline'},
                    { title: 'Certificados', path: '/' + this.$route.params.slug + '/menu-equipe/certificados', icon: 'mdi-file-certificate-outline' },
                    { title: 'Mercadorias', path: '/' + this.$route.params.slug + '/menu-equipe/mercadorias', icon: 'mdi-package-variant-closed' },
                    { title: 'Reservas', path: '/' + this.$route.params.slug + '/menu-equipe/reservas', icon: 'mdi-shopping-outline' },
                    { title: 'Auditoria', path: '/' + this.$route.params.slug + '/menu-equipe/auditoria', icon: 'mdi-file-clock-outline' },
                    { title: 'Equipe', path: '/' + this.$route.params.slug + '/menu-equipe/equipe', icon: 'mdi-account-group' }
                ]
        }
    }
}
</script>
<style scoped>
    .v-card, a{
        width: 156px;
        height: 120px;
    }
    a{
        display: grid;
    }
    .grid-item{
        flex-grow: 1;
        display: flex;
        max-width: 25%;
    }
    @media screen and (min-width: 800px) and (max-width: 1028px) {
        .grid-item{
            max-width: 33.3%;
            justify-content: center;
        }
    }
    @media screen and (max-width: 655px)  {
        .grid-item{
            max-width: 33.3%;
            justify-content: center;
        }
    }
    @media screen and (max-width: 532px)  {
        .grid-item{
            max-width: 100%;
            justify-content: center;
        }
    }
</style>
