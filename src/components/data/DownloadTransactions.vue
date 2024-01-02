<template>
  <div @click="triggerDownload">
    <FileDownloadIcon color="oklch(var(--pc))" />
    <a ref="downloadLink" target="_blank" hidden></a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import FileDownloadIcon from '../icons/FileDownloadIcon.vue'

export default defineComponent({
  name: 'DownloadTransactions',
  components: { FileDownloadIcon },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  setup() {
    const transactionsStore = useTransactionsStore()
    return { transactionsStore }
  },
  computed: {
    downloadLink(): HTMLAnchorElement {
      return this.$refs.downloadLink as HTMLAnchorElement
    },
  },
  methods: {
    triggerDownload() {
      this.downloadLink.download = `export-${new Date().toISOString()}.csv`
      this.downloadLink.href = `data:text/csv;charset=utf-8,${encodeURI(
        this.transactionsStore.transactionsAsCsvString,
      )}`
      this.downloadLink.click()
    },
  },
})
</script>
