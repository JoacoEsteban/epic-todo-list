<template>
<div class="main-container">
  <Toggle class="theme-switch" @click="toggleTheme" :val="darkTheme" />
  <div class="input-container">
    <input @keyup.enter="submit" v-model="input" type="text">
  </div>
  <div class="title mt-2">{{showingDone ? 'Done' : 'To Do'}}</div>
  <Toggle class="done-switch" @click="toggleDone" :val="!showingDone" />
  <div v-if="!showingDone" class="list undone">
    <todo
    @delete="deleteTodo(todo.id)"
    @edit="editTodo(todo.id, $event)"
    @check="checkTodo(todo.id)"
    v-for="todo in undone" :key="todo.id" :todo="todo" />
  </div>
  <div v-if="showingDone" class="list done">
    <todo
    @delete="deleteTodo(todo.id)"
    @edit="editTodo(todo.id, $event)"
    @check="checkTodo(todo.id)"
    v-for="todo in done" :key="todo.id" :todo="todo" />
  </div>
</div>
</template>

<script>
import Todo from './Todo'
import Toggle from './Toggle'
import axios from 'axios'
const url = process.env.BACKEND + '/api/todos'
export default {
  components: {
    Todo,
    Toggle
  },
  data () {
    return {
      input: 'Create a Todo!',
      list: [],
      darkTheme: true,
      showingDone: false
    }
  },
  computed: {
    undone () {
      return this.list.filter(todo => !todo.done)
    },
    done () {
      return this.list.filter(todo => todo.done)
    }
  },
  created () {
    // this.loadFromLocal()
    this.getTodos()
  },
  methods: {
    submit () {
      let text = this.input.trim()
      if (text === '') return

      this.createTodo(text)
      this.input = ''
    },
    async createTodo (text) {
      let todo = {
        text,
        done: false,
        edited: new Date()
      }

      await axios.post(url, todo)
      this.list.push(todo)
    },
    deleteTodo (id) {
      this.list = this.list.filter(todo => todo.id !== id)
      this.saveToLocal()
    },
    editTodo (id, text) {
      let todo = this.list.find(todo => todo.id === id)
      todo.text = text
      todo.edited = new Date()
      this.saveToLocal()
    },
    checkTodo (id) {
      this.list.find(todo => todo.id === id).done = true
      this.saveToLocal()
    },
    saveToLocal () {
      localStorage.setItem('todos', JSON.stringify(this.list))
    },
    loadFromLocal () {
      let list = localStorage.getItem('todos')
      this.list = !list ? [] : JSON.parse(list)
    },
    async getTodos () {
      let todos = await axios.get(url)
      console.log(todos.data)
      this.list = todos.data
    },
    toggleTheme () {
      let theme = this.darkTheme ? 'light' : 'dark'
      this.darkTheme = !this.darkTheme
      console.log(theme)
      document.documentElement.style.setProperty('--background-color', 'var(--' + theme + '-bg)')
      document.documentElement.style.setProperty('--text-color', 'var(--' + theme + '-text-color)')
      document.documentElement.style.setProperty('--secondary', 'var(--' + theme + '-secondary)')
      document.documentElement.style.setProperty('--box-shadow-color', 'var(--' + theme + '-box-shadow)')
    },
    toggleDone () {
      this.showingDone = !this.showingDone
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
    margin-bottom: 0;
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
  padding: 3em;
  padding-top: 0;
}

.theme-switch {
  position: fixed;
  bottom: 1em;
  right: 1em;
}
.done-switch {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(90deg);
  margin-bottom: 1em;
}
</style>
