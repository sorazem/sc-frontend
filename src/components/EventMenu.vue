<template>
    <v-layout>
        <v-bottom-navigation>
            <router-link
                v-for="item in menuItems"
                :key="item.title"
                :to="item.path"
            >
                <v-btn :color="colorBtn">
                    <span>{{ item.title }}</span>
                </v-btn>
            </router-link>
        </v-bottom-navigation>
    </v-layout>
</template>
<script>
export default {
    props: ['menuItems'],
    computed:{
        colorBtn(){
            if(this.$route.path.includes('menu-equipe')){
                return '#FF7A00';
            } else {
                return '#9C66BD';
            }
        }
    },
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

.v-bottom-navigation{
    margin-top: 56px;
}

.v-btn{
    height: 56px;
}
</style>
