import { createStore } from 'vuex'
import { auth } from "./auth.module"

export default createStore({
  state: {
      eventSlug: null,
      eventMap: []
  },
  getters: {
  },
  mutations: {
    changeCurrentEventSlug(state, payload){
      state.eventSlug = payload
    },
    addEventToMap(state, payload){
      state.eventMap.push(payload)
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})
