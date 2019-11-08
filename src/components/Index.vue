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
    @delete="deleteTodo(todo._id)"
    @edit="editTodo(todo._id, $event)"
    @check="checkTodo(todo._id)"
    v-for="todo in undone" :key="todo._id" :todo="todo" />
  </div>
  <div v-if="showingDone" class="list done">
    <todo
    @delete="deleteTodo(todo._id)"
    @edit="editTodo(todo._id, $event)"
    @check="checkTodo(todo._id)"
    v-for="todo in done" :key="todo._id" :todo="todo" />
  </div>
  <a href="https://github.com/JoacoEsteban/epic-todo-list" target="blank" class="github-icon pointer-animations transition">
    <svg style="width:100%;height:100%" viewBox="0 0 24 24">
      <path fill="var(--text-color)" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
    </svg>
  </a>
</div>
</template>

<script>
import Todo from './Todo'
import Toggle from './Toggle'
import axios from 'axios'
const url = 'https://epic-todo-list-backend.herokuapp.com/api/todos'
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

      let res = await axios.post(url, todo)
      this.list = [res.data, ...this.list]
    },
    async deleteTodo (id) {
      await axios.delete(url + '/' + id)
      this.list = this.list.filter(todo => todo._id !== id)
    },
    async editTodo (id, text) {
      let index = this.list.findIndex(todo => todo._id === id)
      let todo = this.list[index]
      if (text === '' || todo.text === text) return
      todo.text = text
      todo.edited = new Date()

      let res = await axios.put(url + '/' + id, todo)
      this.list.splice(index, 1, res.data)
    },
    async checkTodo (id) {
      await axios.post(url + '/check/' + id)
      this.list.find(todo => todo._id === id).done = true
    },
    saveToLocal () {
      localStorage.setItem('todos', JSON.stringify(this.list))
    },
    loadFromLocal () {
      let list = localStorage.getItem('todos')
      this.list = !list ? [] : JSON.parse(list)
    },
    async getTodos () {
      let res = await axios.get(url)
      this.list = res.data.reverse()
    },
    toggleTheme () {
      let theme = this.darkTheme ? 'light' : 'dark'
      this.darkTheme = !this.darkTheme
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
  padding: 3em 6em;
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
.github-icon {
  cursor: pointer;
  position: fixed;
  bottom: .5em;
  left: .5em;
  $size: 3em;
  width: $size;
  height: $size;
}
</style>
