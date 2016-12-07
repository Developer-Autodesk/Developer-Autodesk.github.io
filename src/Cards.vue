<template>
  <div id="cards">
    <div class="repo-card">
      <p>We currently have {{repos.length}} repos.</p>
    </div>
    <a v-for="repo in repos" v-bind:href="repo.html_url">
      <div class="repo-card">
        <h3>{{ repo.name }}</h3>
        <p>{{ repo.description }}</p>
        <p><a v-bind:href="repo.html_url"><i class="fa fa-github" aria-hidden="true"></i> Source Code</a></p>
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
    // TODO
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
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
h3 {
  margin-bottom: 0.5rem;
}
p {
  
}
</style>
