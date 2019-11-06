<template>
<div :class="{'pull': pull}" class="container box-shadow">
  <div @click="deleteTodo" class="delete-button pointer-animations">
    <svg style="width:100%;height:100%" viewBox="0 0 24 24">
      <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
    </svg>
  </div>
  <div class="title">{{todo.text}}</div>
  <div class="point75-em">
    Created <strong>{{todo.created | time}}</strong>
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
      pull: false
    }
  },
  methods: {
    deleteTodo () {
      this.pull = false
      setTimeout(() => {
        this.$emit('delete')
      }, 300)
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
  transition: transform $transition, opacity $transition, height $transition, padding $transition, background $transition;
  transform-origin: top;
  transform: scale(.2);
  opacity: 0;
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

  &:hover {
    .delete-button {
      transform: scale(1);
      opacity: 1;
      pointer-events: all;
    }
  }
}

.title {
  margin-bottom: .5em;
}

.delete-button {
  $size: 1.75em;
  height: $size;
  width: $size;
  position: absolute;
  right: -$size/2;
  top: -$size/2;
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
    background: #d33;
    path {
      fill: white;
    }
  }
}
</style>
