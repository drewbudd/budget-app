<template>
  <IconBase collection="material-symbols" icon="arrow-right-alt" :size="size" :color="color" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconBase from './IconBase.vue';

export default defineComponent({
  name: 'ArrowRightIcon',
  components: {
    IconBase
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: () => undefined
    },
    color: {
      type: String,
      required: false,
      default: () => undefined
    },
  },
})
</script>