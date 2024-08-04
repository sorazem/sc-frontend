import { createStore } from 'vuex'
import { auth } from "./auth.module"

const store = createStore({
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
      state.eventMap[payload.slug] =  payload.event
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})

export default store;
