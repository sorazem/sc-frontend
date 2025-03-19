<template id="app">
  <NavigationBar @toggleMenu="toggleMenu" />
  <v-layout>
    <HamburguerMenu v-model='drawer' :showEventMenu='showEventMenu' :menu='menu' :eventMenuItems='menuItems' />
  </v-layout>
  <div class="container pa-4 mb-14">
    <div class="row d-flex flex-column align-center">
      <router-view/>
    </div>
    <EventMenu v-if="showEventMenu" :menuItems='menuItems' class="d-none d-sm-flex"/>
  </div>
</template>
<script>
import HamburguerMenu from '@/components/HamburguerMenu.vue';
import EventService from './services/event.service';
import EventMenu from '@/components/EventMenu.vue';
import NavigationBar from './components/NavigationBar.vue';
export default {
  data(){
    return{
      drawer: false,
      isStaffFromEvent: false,
      menu: [
        { title: 'Perfil', path: '/perfil', icon: 'mdi-home'},
        { title: 'Certificados', path: '/certificados', icon: 'mdi-home'}
      ]
    }
  },
  watch: {
    '$route.params': function(newValue, oldValue) {
      if (newValue.slug && newValue.slug !== oldValue.slug) {
        EventService.isEventStaff(newValue.slug)
        .then((response)=>{
          this.isStaffFromEvent = response
        }).catch((err) => {
          if (err.response.status !== 401) throw err;
        });
      }
    }
  },
  components: {
    NavigationBar,
    EventMenu,
    HamburguerMenu,
  },
  methods: {
    toggleMenu(){
      this.drawer = !this.drawer;
    },
    getMenuItems(){
      const eventMenu = [
        { title: 'Programação', path: '/' + this.$route.params.slug + '/programacao', icon: 'mdi-home'},
        { title: 'Minha agenda', path: '/' + this.$route.params.slug + '/agenda', icon: 'home'},
        { title: 'Inscrição', path: '/' + this.$route.params.slug + '/inscricao', icon: 'home'},
        { title: 'Loja', path: '/' + this.$route.params.slug + '/mercadorias', icon: 'home' },
        { title: 'Avisos', path: '/' + this.$route.params.slug + '/avisos', icon: 'home' }
      ];
      if (this.isStaffFromEvent || this.isAdmin) {
        eventMenu.push({title: 'Editar evento', path: '/' + this.$route.params.slug + '/menu-equipe'});
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
  created (){
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
  width: 70vw;
}
@media screen and (max-width: 800px)  {
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
