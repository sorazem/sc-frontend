<template>
    <v-layout>
        <!-- <v-navigation-drawer v-model="sidebar">
            <v-list>
                <v-list-tile
                v-for="item in menuItems"
                :key="item.title"
                :to="item.path">
                <v-list-tile-content>{{ item.title }}</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer> -->

        <v-toolbar class="pa-2">
            <span class="hidden-sm-and-up">
                <v-toolbar-side-icon @click="sidebar = !sidebar">
                </v-toolbar-side-icon>
            </span>
            <v-toolbar-title>
                <router-link to="/">Venti</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="showNavBar" class="hidden-xs-only">
                <router-link
                    class="mr-4"
                    v-for="item in menuItems"
                    :key="item.title"
                    :to="item.path">
                    {{ item.title }}
                </router-link>
            </v-toolbar-items>
        </v-toolbar>
    </v-layout>
</template>
<script>
export default {
    data(){
        return{
            sidebar: false
        }
    },
    computed:{
        showNavBar() {
            if(this.$route.path == "/") return false
            else return true
        },
        menuItems(){
            return [
                { title: 'Programação', path: '/' + this.$route.params.slug + '/programacao', icon: 'home'},
                { title: 'Minha agenda', path: '/' + this.$route.params.slug + '/programacao', icon: 'home'},
                { title: 'Inscrição', path: '/' + this.$route.params.slug + '/inscricao', icon: 'home'},
            ]
        }
    }
}
</script>
<style scoped>
.v-toolbar-title{
    flex: none;
    font-size: 20px;
}

.v-toolbar{
    background-color: #9C66BD22;
}

.v-toolbar-items{
    align-items: center;
}

a {
  color: #2c3e50;
  text-decoration: none;
  letter-spacing: 1px;
}

a.router-link-exact-active {
  color: #9C66BD;
}
</style>