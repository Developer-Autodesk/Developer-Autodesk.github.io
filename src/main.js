import Vue from 'vue';
import Cards from './Cards.vue';
import './styles/main.css';

new Vue({
  el: '#cards',
  render: h => h(Cards)
});
