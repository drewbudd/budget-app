<template>
  <button :class="classes" :disabled="disabled">
    <div v-if="loading" class="loading loading-spinner"></div>
    <div v-if="!iconLocation || iconLocation === 'after'">{{ text }}</div>
    <slot v-if="!loading" name="icon"></slot>
    <div v-if="iconLocation === 'before'">{{ text }}</div>
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'ButtonBase',
  props: {
    text: {
      type: String,
      required: false,
      default: () => undefined,
    },
    buttonColorClass: {
      type: String as PropType<
        | 'neutral'
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'info'
        | 'success'
        | 'warning'
        | 'error'
        | 'ghost'
        | 'link'
      >,
      required: false,
      default: () => 'primary',
    },
    outline: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    size: {
      type: String as PropType<'large' | 'normal' | 'small' | 'tiny'>,
      required: false,
      default: () => 'normal',
    },
    wide: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    shape: {
      type: String as PropType<'square' | 'circle' | undefined>,
      required: false,
      default: () => undefined,
    },
    animation: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    iconLocation: {
      type: String as PropType<'before' | 'after'>,
      required: false,
      default: () => undefined,
    },
  },
  computed: {
    classes() {
      return {
        btn: true,
        'btn-neutral': this.buttonColorClass === 'neutral',
        'btn-primary': this.buttonColorClass === 'primary',
        'btn-secondary': this.buttonColorClass === 'secondary',
        'btn-accent': this.buttonColorClass === 'accent',
        'btn-info': this.buttonColorClass === 'info',
        'btn-success': this.buttonColorClass === 'success',
        'btn-warning': this.buttonColorClass === 'warning',
        'btn-error': this.buttonColorClass === 'error',
        'btn-ghost': this.buttonColorClass === 'ghost',
        'btn-link': this.buttonColorClass === 'link',
        'btn-outline': this.outline,
        'btn-lg': this.size === 'large',
        'btn-sm': this.size === 'small',
        'btn-xs': this.size === 'tiny',
        'btn-wide': this.wide,
        'btn-square': this.shape === 'square',
        'btn-circle': this.shape === 'circle',
        'no-animation': this.animation === false,
      }
    },
  },
})
</script>
fffffff
