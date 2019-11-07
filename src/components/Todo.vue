<template>
<div :class="{'pull': pull, 'wide': editing}" class="container box-shadow">
  <div @click="deleteTodo" class="float-button delete pointer-animations">
    <svg style="width:100%;height:100%" viewBox="0 0 24 24">
      <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
    </svg>
  </div>
  <div @click="editTodo" class="float-button edit pointer-animations">
    <svg style="width:100%;height:100%" viewBox="0 0 24 24">
      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
    </svg>
  </div>
  <div @click="checkTodo" class="float-button check pointer-animations">
    <svg style="width:100%;height:100%" viewBox="0 0 24 24">
      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
    </svg>
  </div>
  <input ref="input" class="std-input" @keyup.enter="confirmEdit" @keyup.esc="editing = false" v-if="editing" v-model="text" type="text">
  <div @dblclick="editTodo" v-if="!editing" class="title">{{todo.text}}</div>
  <div class="point75-em">
    Last Edited <strong>{{todo.edited | time}}</strong>
  </div>
</div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      pull: false,
      editing: false,
      text: ''
    }
  },
  methods: {
    deleteTodo () {
      this.hideAndEmit('delete')
    },
    hideAndEmit (msg) {
      this.pull = false
      setTimeout(() => {
        this.$emit(msg)
      }, 300)
    },
    editTodo () {
      if (!(this.editing = !this.editing)) return
      this.text = this.todo.text
      setTimeout(() => {
        this.$refs.input.focus()
      }, 0)
    },
    confirmEdit () {
      this.$emit('edit', this.text)
      this.editing = false
      this.text = ''
    },
    checkTodo () {
      this.hideAndEmit('check')
    }
  },
  mounted () {
    setTimeout(() => {
      this.pull = true
    }, 0)
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--secondary);
  padding: 0;
  border-radius: .3em;
  $transition: var(--transition);
  transition: transform $transition, opacity $transition, height $transition, min-width $transition, padding $transition, background $transition;
  transform-origin: top;
  transform: scale(.2);
  opacity: 0;
  min-width: 1em;
  height: 0;
  &:nth-last-child(1) {
    margin-bottom: 0;
  }
  &.pull {
    height: initial;
    padding: 2em 3em;
    transform: scale(1);
    opacity: 1;
    margin-bottom: 1em;
  }
  &.wide {
    min-width: 50vw;
  }
  &:hover {
    .float-button {
      transform: scale(1);
      opacity: 1;
      pointer-events: all;
    }
  }
}

.title {
  margin-bottom: .5em;
  word-break: break-all;
}

.float-button {
  $size: 1.75em;
  height: $size;
  width: $size;
  position: absolute;
  right: -$size/2;
  &.delete {
    // top: -$size/2;
    top: -$size/3;
  }
  &.edit {
    top:calc(50% - #{$size/1.3});;
  }
  &.check {
    top: calc(100% - #{$size*1.2});
  }
  padding: .4em;
  color: var(--secondary);
  border-radius: 50%;
  background-color: var(--text-color);
  pointer-events: none;
  transform: scale(0);
  opacity: 0;

  transition: transform var(--transition), opacity var(--transition);

  path {
    fill: var(--background-color)
  }

  &:active {
    &.delete {
      background: #d33;
    }
    &.edit {
      background: #d73;
    }
    &.check {
      background: #3d5;
    }
    path {
      fill: white;
    }
  }
}
</style>
