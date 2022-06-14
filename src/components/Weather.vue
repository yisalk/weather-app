<template>
<div id="app" :class="typeof weather[weather.length-1]?.main != 'undefined' && weather[weather.length-1]?.main.temp > 16 ? 'warm' : ''">
    <main>
      <div class="search-box">
        <input type="text" class="search-bar" placeholder="Type city name" v-model="query" @keypress.enter="fetchWeather" />
      </div>
      <div class="weather-wrap" v-for="(data, index) in weather" :key="index">
        <div class="location-box">
          <div class="location">
            {{ data.name }}, {{ data.sys.country }}
          </div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(data.main.temp) }}°C</div>
          <div class="weather">{{ data.weather[0].main }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import {useRouter} from 'vue-router';
import { createToaster } from '@meforma/vue-toaster';

export default {
  name: 'WeatherComponent',
  setup() {
    const store = useStore();
    const router = useRouter();
    const toaster = createToaster();

    const weather = computed(() => store.state.weather);

    const query = ref("");
    let api_key = "7f40938131da6e5fe5ebeaea4fe2d0da";
    let url_base = "https://api.openweathermap.org/data/2.5/";

    function fetchWeather() {
      console.log('call on page load');
      router.push('/weather/'+query.value);
      console.log(query.value);
      this.getWeatherInformation();
    }
    function getWeatherInformation() {
      fetch(`${url_base}weather?q=${query.value}&units=metric&APPID=${api_key}`).then(
          (res) => {
            console.log('res', res);
            return res.json();
          }
        ).then(this.setResults);
    }
    function setResults(results) {
      console.log('results', results);
      if(results?.cod == "404") {
        console.log('in 404');
        toaster.error(results?.message);
        setTimeout(toaster.clear, 3000);
      } else {
        store.commit("SAVE_WEATHER", results);
      }
    }

    return {weather, query, fetchWeather, getWeatherInformation, setResults}
  },
  mounted(){
    console.log(this.$route.params);
    if(this.$route.params.city) {
      this.query = this.$route.params.city;
      this.getWeatherInformation();
    }
  }
}

</script>

<!-- STYLING -->
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Montserrat", sans-serif;
}

#app {
  background-image: url("../assets/cold-bg.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

#app.warm {
  background-image: url("../assets/warm-bg.jpg");
}

main {
  min-height: 100vh;
  padding: 25px;

  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;

  color: #313131;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.weather-wrap {
  display: inline-block;
  margin-right: 30px;
}

.location-box .location {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  /* text-shadow: 1px 3px rgba(0, 0, 0, 0.25); */
}

.location-box .date {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  /* font-style: italic; */
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: aliceblue;
  font-size: 95px;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  margin: 30px 0px;
}

.weather-box .weather {
  color: #fff;
  font-size: 40px;
  font-weight: 500;
}
</style>
