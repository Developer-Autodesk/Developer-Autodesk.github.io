<template>
  <div id="cards">
    <div class="repo-card">
      <p>There are {{repos.length}} repos.</p>
      <p><br>Sort: </p>
      <p><a href="#" @click="sortByPopularity">Most Popular</a></p>
      <p><a href="#" @click="sortByAlphabetical">Alphabetical</a></p>
      <p><a href="#" @click="sortByLastUpdated">Last Updated</a></p>
    </div>
    <div class="repo-card">
      <p>Filter by Language: </p>
      <p><a v-for="(repo, language) in languages" href="#" @click="filterByLanguage(language)">{{ language }} </a></p>
    </div>
    <div class="repo-card">
      <p>Filter by API Used: </p>
      <p><a v-for="(repo, api) in apis" href="#" @click="filterByAPIUsed(api)">{{ api }} </a></p>
    </div>
    <a v-for="repo in repos" v-bind:href="repo.html_url">
      <div class="repo-card">
        <h3>{{ repo.name }}</h3>
        <p>{{ repo.description }}</p>
        <p>
          <span><a v-bind:href="repo.html_url"><i class="fa fa-github" aria-hidden="true"></i> Source Code</a></span> 
          <span><i class="fa fa-star" aria-hidden="true"></i> {{ repo.stargazers_count }}</span> 
          <span><a v-show="repo.homepage" v-bind:href="repo.homepage"><i class="fa fa-desktop" aria-hidden="true"></i> Demo</a></span>
        </p>
      </div>
    </a>
  </div>
</template>

<script>
import reposJSON from './repos.json';

let repos = [];
let languages = {
  // language: [list of repos]
  all : []
};

let apis = {
  all : [],
  "Viewer" : [],
  "Design Automation" : [],
  "Model Derivative" : [],
  "Data Management" : []
} // enum list of apis with Autodesk
let i = 0;

for (let repo of reposJSON) {
  // put repos in a list
  repos[i] = repo;

  // map language -> repo
  let language = repo.language;
  if (language !== null) {
    if (!languages[language]) {
      languages[language] = [];   
    }
    languages[language].push(repo);
  }

  // TODO map api -> repo
  // reg match api with the name of repo
  let viewerreg = /[vV]iewer/g,
      dareg = /[dD]esign.[aA]utomation/g,
      mdreg = /[mM]odel.[dD]erivative/g,
      dmreg = /[dD]ata.[mM]anagement/g;
  // can match multiple apis
  if (repo.name.match(viewerreg)) {
    apis["Viewer"].push(repo);
  }
  if (repo.name.match(dareg)) {
    apis["Design Automation"].push(repo);
  }
  if (repo.name.match(mdreg)) {
    apis["Model Derivative"].push(repo);
  }
  if (repo.name.match(dmreg)) {
    apis["Data Management"].push(repo);
  }
  
  i++;
}

  languages.all.push(...repos);
  apis.all.push(...repos);

export default {

  // pass these to the page
  data () {
    return {
      repos : repos,
      languages : languages,
      apis : apis
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
        return a.name.localeCompare(b.name);
      });
    },
    sortByLastUpdated: () => {
      repos.sort((a,b) => {
        return b.updated_at.localeCompare(a.updated_at);
      });
    },
    filterByLanguage: (language) => {
      repos.splice(0, repos.length);
      repos.push(...languages[language]);
    },
    filterByAPIUsed: (apiName) => {
      repos.splice(0, repos.length);
      repos.push(...apis[apiName]);
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
.repo-card:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
h3 {
  margin-bottom: 0.5rem;
}
</style>
