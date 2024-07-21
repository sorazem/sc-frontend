<template>
    <v-layout>
        <v-toolbar class="pa-2" :color="toolbarColor">
            <v-row>
                <v-col cols='3' class="d-flex align-center justify-center">
                    <v-app-bar-nav-icon v-if="showEventMenu" @click="toggleMenu" class="d-flex d-sm-none"></v-app-bar-nav-icon>
                </v-col>
                <v-col cols='6' class="d-flex align-center justify-center">
                    <v-toolbar-title>
                        <router-link to="/">Venti</router-link>
                    </v-toolbar-title>
                </v-col>
                <v-col cols='3' class="d-flex align-center justify-center">
                    <div v-if="currentUser">
                        <!-- <p> Logado como  <b>{{ currentUser.name }}</b></p> -->
                        <v-btn variant='flat' @click='logout'>Logout</v-btn>
                    </div>
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
        toolbarColor(){
            if(this.$route.path.includes('menu-equipe')){
                return '#FF7A0022';
            } else if (this.$route.path.includes('admin')) {
                return '#00FF1722';
            } else {
                return '#9C66BD22';
            }
        },
        currentUser() {
            return JSON.parse(localStorage.getItem("user")).user;
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
    flex: none;
    font-size: 20px;
    margin: 0px;
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
}

.v-toolbar-items{
    align-items: center;
}
</style>
