<template>
  <ButtonBase text="Submit" buttonColorClass="secondary" :disabled="disabled" :loading="loading" />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ButtonBase from './ButtonBase.vue'

export default defineComponent({
  name: 'SubmitButton',
  components: {
    ButtonBase,
  },
  props: {
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
})
</script>
