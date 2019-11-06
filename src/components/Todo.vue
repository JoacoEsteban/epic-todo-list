<template>
<div class="container">
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
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: var(--dark-secondary);
  padding: 1em;
  margin-bottom: 1em;

  &:nth-last-child(1) {
    margin-bottom: 0;
  }
}
</style>
