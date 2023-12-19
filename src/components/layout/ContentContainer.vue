<template>
  <div class="hero max-w-xl lg:max-w-6xl bg-base-200">
    <div :class="contentClasses">
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { type PropType, defineComponent } from 'vue';

export default defineComponent({
  name: 'ContentContainer',
  props: {
    contentAlign: {
      type: String as PropType<'left' | 'center' | 'right'>,
      required: false,
      default: () => 'center'
    },
  },
  computed: {
    contentClasses() {
      return {
        'hero-content': true,
        'py-8': true,
        'text-left': this.contentAlign === 'left',
        'text-center': this.contentAlign === 'center',
        'text-right': this.contentAlign === 'right',
      }
    }
  }
})
</script>
