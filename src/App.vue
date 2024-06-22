<template id="app">
  <NavigationBar />
  <div class="container pa-xs-4">
    <div class="row">
      <div class="col-md-12">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>

import NavigationBar from './components/NavigationBar.vue';
export default {
  components: {
    NavigationBar
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
.ubuntu-light {
  font-family: "Ubuntu", sans-serif;
  font-weight: 300;
  font-style: normal;
}

.ubuntu-regular, p {
  font-family: "Ubuntu", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.ubuntu-medium {
  font-family: "Ubuntu", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.ubuntu-bold {
  font-family: "Ubuntu", sans-serif;
  font-weight: 700;
  font-style: normal;
}

.ubuntu-light-italic {
  font-family: "Ubuntu", sans-serif;
  font-weight: 300;
  font-style: italic;
}

.ubuntu-regular-italic {
  font-family: "Ubuntu", sans-serif;
  font-weight: 400;
  font-style: italic;
}

.ubuntu-medium-italic {
  font-family: "Ubuntu", sans-serif;
  font-weight: 500;
  font-style: italic;
}

.ubuntu-bold-italic {
  font-family: "Ubuntu", sans-serif;
  font-weight: 700;
  font-style: italic;
}

</style>
