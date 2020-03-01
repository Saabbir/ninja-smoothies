<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2 class="center-align indigo-text">Edit {{ smoothie.title }} Smoothie</h2>
    <form @submit.prevent="updateSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div class="field ingredient" v-for="(ing, index) in smoothie.ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an Ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another" placeholder="type and press tab to add an ingredient">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink" :disabled="submitted">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
  import db from '@/firebase/init.js'
  import slugify from 'slugify'

  export default {
    name: 'EditSmoothe',
    data() {
      return {
        smoothie: null,
        another: null,
        feedback: null,
        submitted: false
      }
    },
    methods: {
      updateSmoothie() {
        if (this.smoothie.title) {
          this.feedback = null
          this.submitted = true

          // create a slug
          this.smoothie.slug = slugify(this.smoothie.title, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })

          // post to database
          db.collection('smoothies').doc(this.smoothie.id).update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          }).then(() => {
            this.$router.push({name: 'Index'})
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.feedback = 'You must enter a smoothie title'
        }
      },
      addIng() {
        if (this.another) {
          this.smoothie.ingredients.push(this.another)
          this.another = null
          this.feedback = null
        } else {
          this.feedback = 'You must enter a value to add an ingredient'
        }
      },
      deleteIng(ing) {
        this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
          return ingredient !== ing
        })
      }
    },
    created() {
      const slug = this.$route.params.smoothie_slug
      const ref = db.collection('smoothies').where('slug', '==', slug)
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.smoothie = doc.data()
          this.smoothie.id = doc.id
        })
      })
    },
  }
</script>

<style>
.edit-smoothie {
  max-width: 500px;
  margin-top: 60px;
  padding: 20px;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 0 0 30px;
}

.edit-smoothie .field {
  margin: 20px 0;
  position: relative;
}

.edit-smoothie i.delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  font-size: 1.4em;
  cursor: pointer;
  color: #aaa;
}
</style>