<template>
    <v-layout>
        <v-toolbar class="pa-2" color="white">
            <v-row>
                <v-col cols='3' class="d-flex align-center justify-center">
                    <v-app-bar-nav-icon @click="toggleMenu" class="hidden-md-and-up"></v-app-bar-nav-icon>
                </v-col>
                <v-col cols='6' class="d-flex align-center justify-center">
                    <v-toolbar-title>
                        <router-link to="/"><span class="purple">V</span>enti</router-link>
                    </v-toolbar-title>
                </v-col>
                <v-col cols='3' class="d-flex align-center justify-end">
                    <v-btn class="hidden-sm-and-down" v-if="isAdmin" variant='text' color="#9C66BD"><router-link to="/admin">Admin</router-link></v-btn>
                    <v-btn class="hidden-sm-and-down" v-if="currentUser" variant='text' color="#9C66BD"><router-link to="/perfil">Perfil</router-link></v-btn>
                    <v-btn v-if="currentUser" variant='text' color="#9C66BD" @click='logout'>Logout</v-btn>
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
        },
        isAdmin(){
            return this.currentUser.permissions & 16;
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
a.router-link-exact-active {
  color: black;
}
</style>
