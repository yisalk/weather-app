import { createStore } from "vuex";

const store = createStore({
  state: {
    weather: [],
  },
  mutations: {
    SAVE_WEATHER(state, weather) {
      console.log('store state', state);
      console.log('store weather', weather);
      state.weather.push(weather);
    }
  },
  actions: {},
  getters: {},
  modules: {}
});

export default store;