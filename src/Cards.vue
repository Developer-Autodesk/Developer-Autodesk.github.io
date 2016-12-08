<template>
  <div id="cards">
    <div class="repo-card">
      <p>We currently have {{repos.length}} repos.</p>
      <p><a @click="sortByPopularity">Sort By Popularity</a></p>
      <p><a @click="sortByAlphabetical">Sort By Alphabetical</a></p>
    </div>
    <a v-for="repo in repos" v-bind:href="repo.html_url">
      <div class="repo-card">
        <h3>{{ repo.name }}</h3>
        <p>{{ repo.description }}</p>
        <p>{{ repo.stargazers_count }}</p>
        <p>
          <span><a v-bind:href="repo.html_url"><i class="fa fa-github" aria-hidden="true"></i> Source Code</a></span> 
          <span><a v-show="repo.homepage" v-bind:href="repo.homepage"><i class="fa fa-desktop" aria-hidden="true"></i> Demo</a></span>
        </p>
      </div>
    </a>
  </div>
</template>

<script>
import reposJSON from './repos.json';

let repos = [];
let i = 0;
for (let repo of reposJSON) {
  repos[i] = repo;
  i++;
}

export default {
  data () {
    return {
      repos: repos
    }
  },

  methods: {
    sortByPopularity: () => {
      repos.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
      });
    },
    sortByAlphabetical: () => {
      repos.sort((a, b) => {
        let aName = a.name;
        let bName = b.name;
        return aName.localeCompare(bName);
      });
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
