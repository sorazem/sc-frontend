<template id="app">
  <NavigationBar @toggleMenu="toggleMenu" />
  <v-layout>
    <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item title="Menu do evento" :subtitle="this.$route.params.slug"></v-list-item>
        <v-divider></v-divider>
        <v-list-item link v-for="item in menuItems" :key="item.title">
            <router-link :to="item.path">{{ item.title }}</router-link>
        </v-list-item>
    </v-navigation-drawer>
  </v-layout>
  <div class="container pa-3 mb-14">
    <div class="row d-flex justify-center">
      <div class="col-md-12">
        <router-view/>
      </div>
    </div>
  <EventMenu v-if="showEventMenu" class="d-none d-sm-flex"/>
  </div>

</template>
<script>
import EventService from './services/event.service';
import EventMenu from '@/components/EventMenu.vue';
import NavigationBar from './components/NavigationBar.vue';
export default {
  data(){
    return{
      drawer: false
    }
  },
  components: {
    NavigationBar,
    EventMenu
  },
  methods: {
    toggleMenu(){
      this.drawer = !this.drawer;
    },
    getMenuItems(){
      let menu = [
                { title: 'Programação', path: '/' + this.$route.params.slug + '/programacao', icon: 'mdi-home'},
                { title: 'Minha agenda', path: '/' + this.$route.params.slug + '/agenda', icon: 'home'},
                { title: 'Inscrição', path: '/' + this.$route.params.slug + '/inscricao', icon: 'home'},
                { title: 'Loja', path: '/' + this.$route.params.slug + '/mercadorias', icon: 'home' },
                { title: 'Avisos', path: '/' + this.$route.params.slug + '/avisos', icon: 'home' }
      ];
      if(this.$route.params.slug){
        EventService.isEventStaff(this.$route.params.slug).then(
            (response)=>{
              console.log(response)
                if(response){
                    menu.push({title: 'Equipe', path: '/' + this.$route.params.slug + '/menu-equipe'})
                }
            },
            (error)=>{console.log(error)}
        );
      }
      return menu;
    }
  },
  computed:{
    showEventMenu(){
      return this.$route.params.slug? true : false;
    },
    menuItems(){
      return this.getMenuItems();
    }
  }
}
</script>
<style>
#app {
  font-family: "Dosis", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bebas-neue-regular, h3, h2, h1 {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
}
a {
  color: #2c3e50;
  text-decoration: none;
  letter-spacing: 1px;
}
a.router-link-exact-active {
  color: #9C66BD;
}
.v-card{
  width: 320px;
  border-radius: 16px;
  border-color: lightgray;
}
</style>
