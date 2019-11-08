<template>
  <div class="toggle">
    <div
    @click="$emit('click')"
    class="track box-shadow pointer-animations">
      <div class="thumb" :class="{'down': val}" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    val: Boolean,
    required: true
  }
}
</script>

<style lang="scss" scoped>
.toggle {
  .track {
    cursor: pointer;
    position: relative;
    height: 6em;
    width: 3em;
    background-color: var(--secondary);
    border-radius: 2em;
    transition: transform var(--transition);
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
