<template>
  <div onclick="file_upload_modal.showModal()">
    <FileUploadIcon color="oklch(var(--pc))" />
    <dialog id="file_upload_modal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-ghost btn-circle absolute right-2 top-2">X</button>
        </form>
        <h3 class="font-bold text-lg">Transaction Import</h3>
        <p class="py-4">UPLOAD</p>
      </div>
    </dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import FileUploadIcon from '../icons/FileUploadIcon.vue'

export default defineComponent({
  name: 'UploadTransactions',
  components: { FileUploadIcon },
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
})
</script>
