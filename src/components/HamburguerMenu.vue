<template>
    <v-navigation-drawer temporary class="pt-4">
        <v-list-item link class="mb-8">
          <router-link class="venti" to="/"><span class="purple">V</span>enti</router-link>
        </v-list-item>
        <v-list-item link v-for="item in menu" :key="item.title">
            <router-link :to="item.path">{{ item.title }}</router-link>
        </v-list-item>
        <div v-if="showEventMenu">
          <v-divider class="my-4"></v-divider>
          <v-list-item class="font-weight-bold" title="Menu do evento" :subtitle="this.$route.params.slug"></v-list-item>
          <v-list-item link v-for="item in eventMenuItems" :key="item.title">
              <router-link :to="item.path">{{ item.title }}</router-link>
          </v-list-item>
        </div>
    </v-navigation-drawer>
</template>
<script>
export default {
    props: ['drawer', 'showEventMenu', 'menu', 'eventMenuItems']
}
</script>
