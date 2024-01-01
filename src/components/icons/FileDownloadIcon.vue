<template>
  <IconBase collection="mdi" icon="file-download" :size="size" :color="color" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconBase from './IconBase.vue'

export default defineComponent({
  name: 'FileDownloadIcon',
  components: {
    IconBase,
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: () => undefined,
    },
    color: {
      type: String,
      required: false,
      default: () => undefined,
    },
  },
})
</script>
