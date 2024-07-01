<template>
    <v-layout>
        <v-toolbar class="pa-2">
            <v-spacer></v-spacer>
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
            const paths = ['/', '/login', '/certificados']
            if(paths.includes(this.$route.path)) return false
            else return true
        },
        menuItems(){
            return []
        }
    }
}
</script>
<style scoped>
.v-toolbar-title{
    flex: none;
    font-size: 20px;
    margin: 0px;
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
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