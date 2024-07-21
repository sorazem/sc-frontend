<template>
    <v-layout>
        <v-toolbar class="pa-2" color="white">
            <v-row>
                <v-col cols='3' class="d-flex align-center justify-center">
                    <v-app-bar-nav-icon v-if="showEventMenu" @click="toggleMenu" class="d-flex d-sm-none"></v-app-bar-nav-icon>
                </v-col>
                <v-col cols='6' class="d-flex align-center justify-center">
                    <v-toolbar-title>
                        <router-link to="/"><span>V</span>enti</router-link>
                    </v-toolbar-title>
                </v-col>
                <v-col cols='3' class="d-flex align-center justify-end">
                    <v-btn v-if="loggedIn" variant='outlined' color="#9C66BD" @click='logout'>Logout</v-btn>
                </v-col>
            </v-row>
        </v-toolbar>
    </v-layout>
</template>
<script>
export default {
    data(){
        return{}
    },
    emits: ['toggleMenu'],
    computed:{
        showNavBar() {
            const paths = ['/', '/login', '/certificados'];
            if(paths.includes(this.$route.path)) return false
            else return true
        },
        showEventMenu(){
            return this.$route.params.slug;
        },
        currentUser() {
            return JSON.parse(localStorage.getItem("user"))?.user;
        }
    },
    methods: {
        toggleMenu(){
            this.$emit('toggleMenu');
        },
        logout() {
            localStorage.removeItem('user');
            this.$router.push('/login');
        }
    },
}
</script>
<style scoped>
.v-toolbar-title{
    margin: 0px;
    font-family: "Lilita One", sans-serif;
    font-weight: 300;
    font-size: 28px;
}

.v-toolbar-items{
    align-items: center;
}
span{
    color: #9C66BD;
}
a.router-link-exact-active {
  color: black;
}
</style>
