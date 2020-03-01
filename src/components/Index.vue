<template>
  <div class="index container">
    <div class="loading" v-if="smoothies.length === 0">{{ emptyMsg }}</div>
    <div class="cards">
      <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
        <div class="card-content">
          <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
          <h2 class="indigo-text">{{ smoothie.title }}</h2>
          <ul>
            <li v-for="(ing, index) in smoothie.ingredients" :key="index">
              <span class="chip">{{ ing }}</span>
            </li>
          </ul>
        </div>
        <router-link 
          :to="{name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug}}"  class="btn-floating btn-large pink halfway-fab">
          <i class="material-icons">edit</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init.js'

export default {
  name: 'Index',
  data () {
    return {
      smoothies: [],
      emptyMsg: ''
    }
  },
  methods: {
    deleteSmoothie(id) {
      // delete doc from firestore
      db.collection('smoothies').doc(id).delete()
      .then(() => {
        // then filter out that smoothie from smoothies array
        this.smoothies = this.smoothies.filter(smoothie => {
          return smoothie.id !== id
        })
        this.updateEmptyMsg()
      })
    },
    updateEmptyMsg() {
      if (this.smoothies.length === 0) {
        this.emptyMsg = 'No smoothies to show.'
      }
    }
  },
  created() {
    this.emptyMsg = 'Loading...'
    // fetch data from firestore
    db.collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
      this.updateEmptyMsg()
    })
  },
}
</script>

<style>
.index {
  margin-top: 60px;
}

.index .loading {
  text-align: center;
}

.index .cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
}

.index .card h2 {
  font-size: 1.8em;
  margin-top: 0;
  text-align: center;
}

.index .card ul {
  margin: 30px 0;
}

.index .card ul li {
  display: inline-block;
}

.index .card i.delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  font-size: 1.4em;
  color: #aaa;
}
</style>
