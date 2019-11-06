<template>
<div class="main-container">
  <!-- <div class="big-title w100">
    Epic Todo-List
  </div> -->
  <div class="input-container">
    <input @keyup.enter="submit" v-model="input" type="text">
  </div>
  <div class="list">
    <todo v-for="todo in list" :key="todo.id" :todo="todo" />
  </div>
</div>
</template>

<script>
import Todo from './Todo'
export default {
  components: {
    Todo
  },
  data () {
    return {
      input: 'Create a Todo!',
      list: []
    }
  },
  computed: {
  },
  methods: {
    submit () {
      let text = this.input.trim()
      if (text === '') return

      this.createTodo(text)
      this.input = ''
    },
    createTodo (text) {
      let id = this.list.length === 0 ? 1 : this.list[0].id + 1
      let todo = {
        text,
        id,
        created: new Date()
      }

      this.list = [todo, ...this.list]
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.input-container {
  width: 100%;
  // padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    font-size: 5em;
    text-align: center;
    margin: 1em;
    width: 100%;
    font-family: inherit;
    font-weight: bold;
    background-color: transparent;
    color: inherit;
    outline: 0;
    border: 0;
    border-bottom: .05em solid var(--text-color)

  }
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
