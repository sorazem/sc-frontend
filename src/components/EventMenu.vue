<template>
    <v-layout>
        <v-bottom-navigation>
            <router-link
                v-for="item in menuItems"
                :key="item.title"
                :to="item.path"
            >
                <v-btn :color="colorBtn">
                    <!-- <v-icon>{{ item.icon }}</v-icon> -->
                    <span>{{ item.title }}</span>
                </v-btn>
            </router-link>
        </v-bottom-navigation>
    </v-layout>
</template>
<script>
import EventService from '@/services/event.service';
export default {
    data(){
        return{
            menuItems: [
                { title: 'Programação', path: '/' + this.$route.params.slug + '/programacao', icon: 'mdi-home'},
                { title: 'Minha agenda', path: '/' + this.$route.params.slug + '/agenda', icon: 'home'},
                { title: 'Inscrição', path: '/' + this.$route.params.slug + '/inscricao', icon: 'home'},
                { title: 'Loja', path: '/' + this.$route.params.slug + '/mercadorias', icon: 'home' },
                { title: 'Avisos', path: '/' + this.$route.params.slug + '/avisos', icon: 'home' }
            ]
        }
    },
    computed:{
        colorBtn(){
            if(this.$route.path.includes('menu-equipe')){
                return '#FF7A00';
            } else {
                return '#9C66BD';
            }
        }
    },
    created(){
        EventService.isEventStaff(this.$route.params.slug)
            .then((response)=>{
                if (response) {
                    this.menuItems.push({title: 'Equipe', path: '/' + this.$route.params.slug + '/menu-equipe'})
                }
            }).catch((err) => {
                if (err.response.status !== 401) {
                    throw err;
                }
            });
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

.v-bottom-navigation{
    margin-top: 56px;
}

.v-btn{
    height: 56px;
}
</style>
