<template>
  <Icon :icon="path" :height="size" :width="size" :color="color" :horizontalFlip="horizontalFlip"
    :verticalFlip="verticalFlip" />
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'IconBase',
  components: {
    Icon
  },
  props: {
    collection: {
      type: String,
      required: false,
      default: () => 'material-symbols'
    },
    icon: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: () => 24
    },
    color: {
      type: String,
      required: false,
      default: () => undefined
    },
    flip: {
      type: String as PropType<'horizontal' | 'vertical' | 'both'>,
      required: false,
      default: () => undefined
    }
  },
  computed: {
    path(): string {
      return `${this.collection}:${this.icon}`
    },
    horizontalFlip(): boolean {
      return this.flip === 'horizontal' || this.flip === 'both'
    },
    verticalFlip(): boolean {
      return this.flip === 'vertical' || this.flip === 'both'
    }
  }
})
</script>