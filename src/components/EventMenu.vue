<template>
    <v-layout>
        <v-bottom-navigation>
            <router-link
                v-for="item in menuItems"
                :key="item.title"
                :to="item.path"
            >
                <v-btn>
                    <!-- <v-icon>{{ item.icon }}</v-icon> -->
                    <span>{{ item.title }}</span>
                </v-btn>
            </router-link>
        </v-bottom-navigation>
    </v-layout>
</template>
<script>
export default {
    computed:{
        menuItems(){
            return [
                { title: 'Programação', path: '/' + this.$route.params.slug + '/programacao', icon: 'mdi-home'},
                { title: 'Minha agenda', path: '/' + this.$route.params.slug + '/agenda', icon: 'home'},
                { title: 'Inscrição', path: '/' + this.$route.params.slug + '/inscricao', icon: 'home'},
                { title: 'Loja', path: '/' + this.$route.params.slug + '/mercadorias', icon: 'home' },
                { title: 'Avisos', path: '/' + this.$route.params.slug + '/avisos', icon: 'home' }
            ]
        }
    }
}
</script>
<style scoped>
a {
  color: #2c3e50;
  text-decoration: none;
  letter-spacing: 1px;
}

span{
    font-size: 0.9em;
}

a.router-link-exact-active {
  color: #9C66BD;
}

.v-bottom-navigation{
    margin-top: 56px;
}

.v-btn{
    height: 56px;
}
</style>