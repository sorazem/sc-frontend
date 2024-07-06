<template>
    <v-layout>
        <v-toolbar class="pa-2">
            <v-app-bar-nav-icon v-if="showEventMenu" @click="toggleMenu" class="d-flex d-sm-none"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title class="mr-4">
                <router-link to="/">Venti</router-link>
            </v-toolbar-title>
            <!-- <v-spacer></v-spacer> -->
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
    },
    methods: {
        toggleMenu(){
            this.$emit('toggleMenu');
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

.v-toolbar{
    background-color: #9C66BD22;
}

.v-toolbar-items{
    align-items: center;
}
</style>