<template>
  <div id="app">
    <a v-for="repo in repos" v-bind:href="repo.html_url">
      <div class="repo-card">
        <div class="repo-text">
          <h3>{{ repo.name }}</h3>
          <p>{{ repo.description }}</p>
          <a v-bind:href="repo.html_url">Source Code</a>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import repos from './repos.json';

export default {
  data () {
    return {
      repos: repos
    }
  },

  methods: {
    startHacking () {
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: Helvetica, sans-serif;
  background: #e2e1e0;
  text-align: center;
  height: 100%;
}
.repo-card {
  color: #404040;
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 10rem;
  margin: 1rem;
  padding: 1rem;
  position: relative;
  width: 300px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  vertical-align: top;
}
.repo-text {
  
}
.repo-card:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
</style>
