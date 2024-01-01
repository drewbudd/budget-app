<template>
  <div class="flex flex-col">
    <div class="self-center">
      <label class="swap swap-flip">
        <input
          type="checkbox"
          v-model="typeToggleValue"
          true-value="expense"
          false-value="income"
          @change="handleToggle"
        />
        <div class="swap-on grid grid-cols-3 gap-2">
          <BankIcon class="col-start-2" :size="iconSize" />
          <ArrowRightIcon color="oklch(var(--er))" :size="iconSize" />
        </div>
        <div class="swap-off grid grid-cols-3 gap-2">
          <ArrowRightIcon color="oklch(var(--su))" :size="iconSize" />
          <BankIcon :size="iconSize" />
        </div>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import BankIcon from '../icons/BankIcon.vue'
import ArrowRightIcon from '../icons/ArrowRightIcon.vue'

export default defineComponent({
  name: 'TransactionTypeToggle',
  components: {
    BankIcon,
    ArrowRightIcon,
  },
  emits: ['toggled'],
  props: {
    value: {
      type: String as PropType<'income' | 'expense'>,
      required: true,
    },
    iconSize: {
      type: Number,
      required: false,
      default: () => 36,
    },
  },
  data() {
    return {
      typeToggleValue: undefined as 'income' | 'expense' | undefined,
    }
  },
  created() {
    this.typeToggleValue = this.value
  },
  methods: {
    handleToggle() {
      this.$emit('toggled', this.typeToggleValue)
    },
  },
})
</script>
