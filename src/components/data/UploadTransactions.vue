<template>
  <div onclick="file_upload_modal.showModal()">
    <FileUploadIcon color="oklch(var(--pc))" />
    <dialog id="file_upload_modal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-ghost btn-circle absolute right-2 top-2" ref="closeButton">X</button>
        </form>
        <h3 class="font-bold text-lg">Transaction Import</h3>
        <div class="flex flex-col my-2">
          <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-lg" accept="text/csv"
            @change="setFilePath" />
          <div class="flex justify-end mt-2">
            <SubmitButton class="grow-0" :disabled="submitButtonDisabled" @click="importTransactions" />
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import FileUploadIcon from '../icons/FileUploadIcon.vue'
import SubmitButton from '../button/SubmitButton.vue'
import Papa from 'papaparse'
import type { TransactionEntry } from '@/types/transaction/TransactionEntry'

export default defineComponent({
  name: 'UploadTransactions',
  components: { FileUploadIcon, SubmitButton },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      file: undefined as File | undefined,
    }
  },
  setup() {
    const transactionsStore = useTransactionsStore()
    return { transactionsStore }
  },
  computed: {
    closeButton(): HTMLButtonElement {
      return this.$refs.closeButton as HTMLButtonElement
    },
    submitButtonDisabled() {
      return !this.file
    },
  },
  methods: {
    setFilePath(event: Event) {
      this.file = (event.target as HTMLInputElement | null)?.files?.[0] ?? undefined
    },
    importTransactions() {
      if (this.file === undefined) return
      Papa.parse(this.file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          this.transactionsStore.setTransactions(results.data as TransactionEntry[])
          this.closeButton.click()
        }
      })
    }
  }
})
</script>
