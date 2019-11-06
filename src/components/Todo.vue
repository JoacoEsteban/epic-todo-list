<template>
<div :class="{'pull': pull}" class="container">
  <div class="title">{{todo.text}}</div>

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
  mounted () {
    setTimeout(() => {
      this.pull = true
    }, 0)
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: var(--dark-secondary);
  padding: 0;
  margin-bottom: 1em;
  width: 100%;
  border-radius: .3em;
  $transition: .3s ease;
  transition: transform $transition, opacity $transition, padding $transition;
  transform-origin: top;
  transform: scale(.2);
  opacity: 0;
  &:nth-last-child(1) {
    margin-bottom: 0;
  }

  &.pull {
    padding: 3em 0;
    transform: scale(1);
    opacity: 1;
  }
}
</style>
