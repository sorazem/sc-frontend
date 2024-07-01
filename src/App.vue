<template id="app">
  <NavigationBar />
  <div class="container pa-3 mb-14">
    <div class="row d-flex justify-center">
      <div class="col-md-12">
        <router-view/>
      </div>
    </div>
  <EventMenu v-if="showEventMenu" />
  </div>

</template>
<script>
import EventMenu from '@/components/EventMenu.vue';
import NavigationBar from './components/NavigationBar.vue';
export default {
  components: {
    NavigationBar,
    EventMenu
  },
  computed:{
    showEventMenu(){
      return this.$route.params.slug;
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
</style>
