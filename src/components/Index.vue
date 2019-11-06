<template>
<div class="main-container">
  <div @click="toggleTheme" class="theme-switch">
    <div
    class="track box-shadow">
      <div class="thumb" :class="{'down': darkTheme}" />
    </div>
  </div>
  <!-- <div class="big-title w100">
    Epic Todo-List
  </div> -->
  <div class="input-container">
    <input @keyup.enter="submit" v-model="input" type="text">
  </div>
  <div class="list">
    <todo class="todolete" v-for="todo in list" :key="todo.id" :todo="todo" />
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
      list: [],
      darkTheme: true
    }
  },
  computed: {
  },
  created () {
    this.loadFromLocal()
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
      this.saveToLocal()
    },
    saveToLocal () {
      localStorage.setItem('todos', JSON.stringify(this.list))
    },
    loadFromLocal () {
      let list = localStorage.getItem('todos')
      this.list = !list ? [] : JSON.parse(list)
    },
    toggleTheme () {
      let theme = this.darkTheme ? 'light' : 'dark'
      this.darkTheme = !this.darkTheme
      console.log(theme)
      document.documentElement.style.setProperty('--background-color', 'var(--' + theme + '-bg)')
      document.documentElement.style.setProperty('--text-color', 'var(--' + theme + '-text-color)')
      document.documentElement.style.setProperty('--secondary', 'var(--' + theme + '-secondary)')
      document.documentElement.style.setProperty('--box-shadow-color', 'var(--' + theme + '-box-shadow)')
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
  padding: 3em;
  padding-top: 0;
}

.theme-switch {
  position: fixed;
  bottom: 1em;
  right: 1em;

  .track {
    cursor: pointer;
    position: relative;
    height: 6em;
    width: 3em;
    background-color: var(--secondary);
    border-radius: 2em;
    transition: transform var(--transition);
    &:hover {
      transform: scale(1.1)
    }
    &:active {
      transform: scale(.98)
    }
    .thumb {
      $size: 2em;
      $sides: $size / 4;

      background-color: var(--text-color);
      position: absolute;
      border-radius: 50%;

      height: $size;
      left: $sides;
      right: $sides;
      transition: top var(--transition);

      top: $sides;

      &.down {
        top: calc(100% - #{$size} - #{$sides})
      }
    }
  }
}
</style>
