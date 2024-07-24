<template id="app">
  <NavigationBar @toggleMenu="toggleMenu" />
  <v-layout>
    <v-navigation-drawer v-model="drawer" temporary class="pt-4">
          <v-img class="mx-auto" src="../src/assets/user-contact-icon.gif" :width="100" />
          <v-divider></v-divider>
          <v-list-item link v-for="item in menu" :key="item.title">
              <router-link :to="item.path">{{ item.title }}</router-link>
          </v-list-item>
        <div v-if="showEventMenu">
          <v-divider></v-divider>
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
  <!-- <div class="overflow-hidden">
    <div class="blob"></div>
    <div class="blob2"></div>
  </div> -->
  <!-- <v-img src="@/assets/dazzle-star-background.png" :width="300" /> -->
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
.blob {
  position: fixed;
  bottom: 0px;
  left: -100px;
  opacity: 0.2;
  width: 30vw;
  aspect-ratio: 1/1;
  animation: animate 10s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite
    alternate forwards;
  filter: blur(40px);
  z-index: -1;
  background: linear-gradient(
    47deg,
    rgba(255, 88, 139, 1) 21%,
    rgb(0 164 173) 67%,
    rgba(118, 74, 166, 1) 81%
  )
}
.blob2 {
  position: fixed;
  bottom: 0px;
  right: -100px;
  opacity: 0.2;
  width: 30vw;
  aspect-ratio: 1/1;
  animation: animate 10s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite
    alternate forwards;
  filter: blur(40px);
  z-index: -1;
  background: linear-gradient(
    47deg,
    rgba(255, 88, 139, 1) 21%,
    rgb(0 164 173) 67%,
    rgba(118, 74, 166, 1) 81%
  )
}
@keyframes animate {
  0% {
    translate: 10% 0%;
    border-radius: 60% 40% 30% 70% / 100% 85% 92% 74%;
  }
  50% {
    translate: 0% 13%;
    border-radius: 20% 71% 47% 70% / 81% 15% 22% 54%;
    rotate: 41deg;
    scale: 1.15;
  }
  100% {
    translate: 0% 39%;
    border-radius: 100% 75% 92% 74% / 60% 80% 30% 70%;
    rotate: -60deg;
    scale: 1.05;
  }
}
</style>
