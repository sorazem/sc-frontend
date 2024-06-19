import { createStore } from 'vuex'
import { auth } from "./auth.module"

export default createStore({
  state: {
      eventSlug: null
  },
  getters: {
  },
  mutations: {
    changeCurrentEventSlug(state, payload){
      state.eventSlug = payload
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})
