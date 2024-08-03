<template id="app">
  <NavigationBar @toggleMenu="toggleMenu" />
  <v-layout>
    <v-navigation-drawer v-model="drawer" temporary class="pt-4">
          <v-list-item link class="mb-8">
            <router-link class="venti" to="/"><span class="purple">V</span>enti</router-link>
          </v-list-item>
          <v-list-item link v-for="item in menu" :key="item.title">
              <router-link :to="item.path">{{ item.title }}</router-link>
          </v-list-item>
        <div v-if="showEventMenu">
          <v-divider class="my-4"></v-divider>
          <v-list-item class="font-weight-bold" title="Menu do evento" :subtitle="this.$route.params.slug"></v-list-item>
          <v-list-item link v-for="item in menuItems" :key="item.title">
              <router-link :to="item.path">{{ item.title }}</router-link>
          </v-list-item>
        </div>
    </v-navigation-drawer>
  </v-layout>
  <div class="container pa-4 mb-14">
    <div class="row d-flex flex-column align-center">
      <router-view/>
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
      drawer: false,
      menu: [
        { title: 'Perfil', path: '/perfil', icon: 'mdi-home'},
        { title: 'Certificados', path: '/certificados', icon: 'mdi-home'}
      ]
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
      let eventMenu = [
                { title: 'Programação', path: '/' + this.$route.params.slug + '/programacao', icon: 'mdi-home'},
                { title: 'Minha agenda', path: '/' + this.$route.params.slug + '/agenda', icon: 'home'},
                { title: 'Inscrição', path: '/' + this.$route.params.slug + '/inscricao', icon: 'home'},
                { title: 'Loja', path: '/' + this.$route.params.slug + '/mercadorias', icon: 'home' },
                { title: 'Avisos', path: '/' + this.$route.params.slug + '/avisos', icon: 'home' }
      ];
      if(this.$route.params.slug){
        EventService.isEventStaff(this.$route.params.slug).then(
            (response)=>{
                if(response){
                  eventMenu.push({title: 'Equipe', path: '/' + this.$route.params.slug + '/menu-equipe'})
                }
            },
            (error)=>{console.log(error)}
        );
      }
      return eventMenu;
    }
  },
  computed:{
    showEventMenu(){
      return this.$route.params.slug;
    },
    menuItems(){
      return this.getMenuItems();
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin(){
      return this.currentUser?.permissions & 16;
    }
  },
  mounted(){
    this.$store.dispatch('auth/start');
    if(this.isAdmin){
      this.menu.push({ title: 'Admin', path:'/admin', icon: 'mdi-home'});
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
.content{
  width: 60vw;
}
@media screen and (max-width: 700px)  {
  .content{
    width: 100vw;
  }
}
.purple{
  color: #9C66BD;
}
.venti{
  font-family: "Lilita One", sans-serif;
  font-weight: 300;
  font-size: 28px;
  color: black !important;
}
</style>
