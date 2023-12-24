<template>
  <ContentContainer>
    <div class="flex flex-col">
      <TransactionTypeToggle :value="typeToggleValue" size="32" @toggled="setTransactionType" />
      <div class="grid grid-cols-6 gap-4">
        <div>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">{{ i18n('date') }}</span>
            </div>
            <div class="flex items-center">
              <ChevronLeft @click="stepEnteredDate(-1)" />
              <input type="date" class="input input-bordered w-full max-w-xs" v-model="enteredDate" required />
              <ChevronRight @click="stepEnteredDate(1)" />
            </div>
            <div class="label">
              <span></span>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text-alt pr-2">{{ i18n('persist') }}</span>
                  <input type="checkbox" v-model="persistDate" class="checkbox checkbox-xs" />
                </label>
              </div>
            </div>
          </label>
        </div>
        <div>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">{{ i18n('amount') }}</span>
            </div>
            <div class="flex items-center">
              <input type="number" v-model="enteredAmount" step=".01" pattern="^\d*(\.\d{0,2})?$"
                class="input input-bordered w-full max-w-xs" :class="{ 'input-error': !enteredAmount }" required />
              <div class="h-fit max-h-fit ml-2">EUR</div>
            </div>
          </label>
        </div>
        <div :class="{ 'col-span-2': typeToggleValue === 'expense', 'col-span-3': typeToggleValue === 'income' }">
          <label class="form-control w-full max-w-2xl">
            <div class="label">
              <span class="label-text">{{ i18n('description') }}</span>
            </div>
            <input type="text" v-model="enteredDescription" class="input input-bordered max-w-full" />
          </label>
        </div>
        <div>
          <label class="form-control w-full max-w-2xl">
            <div class="label">
              <span class="label-text">{{ typeToggleValue === 'expense' ? i18n('vendor') : i18n('source') }}</span>
            </div>
            <input type="text" v-model="enteredSource" class="input input-bordered max-w-full" />
          </label>
        </div>
        <label v-if="typeToggleValue === 'expense'" class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">{{ i18n('category') }}</span>
          </div>
          <select class="select select-bordered" v-model="selectedCategory" :class="{ 'select-error': !selectedCategory }"
            required>
            <option disabled selected value="">{{ i18n('pick-one') }}</option>
            <option v-for="category in categories" :key="category.value" :value="category.value">{{
              i18n(category.textPath)
            }}</option>
          </select>
          <div class="label">
            <span></span>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text-alt pr-2">{{ i18n('persist') }}</span>
                <input type="checkbox" v-model="persistCategory" class=" checkbox checkbox-xs" />
              </label>
            </div>
          </div>
        </label>
      </div>
      <div class="self-end">
        <SubmitButton @click="submitEntry" />
      </div>
    </div>
  </ContentContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChevronLeft from '@/components/icons/ChevronLeft.vue';
import ChevronRight from '@/components/icons/ChevronRight.vue';
import ContentContainer from '@/components/layout/ContentContainer.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';
import TransactionTypeToggle from '@/components/toggle/TransactionTypeToggle.vue';

type TransactionEntry = {
  type: 'expense' | 'income',
  date: string,
  amount: number,
  description?: string,
  source?: string,
  category?: string
}

export default defineComponent({
  name: 'TransactionEntry',
  components: { ContentContainer, ChevronLeft, ChevronRight, SubmitButton, TransactionTypeToggle },
  data() {
    return {
      categories: [
        { value: 'grocery', textPath: 'category.grocery' },
        { value: 'general-household', textPath: 'category.general-household' },
        { value: 'eat-outs', textPath: 'category.eat-outs' },
        { value: 'home', textPath: 'category.home' },
        { value: 'transportation', textPath: 'category.transportation' },
        { value: 'rent', textPath: 'category.rent' },
        { value: 'utilities', textPath: 'category.utilities' },
        { value: 'travel', textPath: 'category.travel' },
        { value: 'savings', textPath: 'category.savings' },
        { value: 'sport', textPath: 'category.sport' },
        { value: 'health', textPath: 'category.health' },
      ] as { value: string, textPath: string }[],
      typeToggleValue: 'expense' as 'income' | 'expense',
      enteredDate: "" as string,
      persistDate: false,
      enteredAmount: undefined as number | undefined,
      enteredDescription: undefined as string | undefined,
      enteredSource: undefined as string | undefined,
      selectedCategory: "" as string,
      persistCategory: false,
      submittedEntries: [] as TransactionEntry[]
    }
  },
  computed: {
    formValid(): boolean {
      return !(this.enteredDate.length === 0 || !this.enteredAmount || this.selectedCategory.length === 0)
    }
  },
  created() {
    const now = new Date()
    const offset = now.getTimezoneOffset() * 60 * 1000
    this.enteredDate = new Date(now.getTime() - offset).toISOString().split('T')[0]
  },
  methods: {
    // Temporary method, i18n to be implemented later
    i18n(path: string): string {
      switch (path) {
        case 'date':
          return 'Date'
        case 'amount':
          return 'Amount'
        case 'description':
          return 'Description'
        case 'source':
          return 'Source'
        case 'vendor':
          return 'Vendor'
        case 'category':
          return 'Category'
        case 'category.grocery':
          return 'Grocery'
        case 'category.general-household':
          return 'General Household'
        case 'category.eat-outs':
          return 'Eat-outs'
        case 'category.home':
          return 'Home'
        case 'category.transportation':
          return 'Transportation'
        case 'category.rent':
          return 'Rent'
        case 'category.utilities':
          return 'Utilities'
        case 'category.travel':
          return 'Travel'
        case 'category.savings':
          return 'Savings'
        case 'category.sport':
          return 'Sport'
        case 'category.health':
          return 'Health'
        case 'pick-one':
          return 'Pick one'
        case 'persist':
          return 'Persist'
        default:
          return 'NO TRANSLATION'
      }
    },
    setTransactionType(newValue: 'income' | 'expense') {
      this.typeToggleValue = newValue
    },
    setEnteredDate(date: Date) {
      const offset = date.getTimezoneOffset() * 60 * 1000
      this.enteredDate = new Date(date.getTime() - offset).toISOString().split('T')[0]
    },
    stepEnteredDate(days: number) {
      const adjustedDate = new Date(this.enteredDate)
      adjustedDate.setDate(adjustedDate.getDate() + days)
      this.setEnteredDate(adjustedDate)
    },
    submitEntry() {
      if (this.formValid) {
        this.submittedEntries.push({
          type: this.typeToggleValue,
          date: this.enteredDate,
          amount: this.enteredAmount ?? 0,
          description: this.enteredDescription?.length !== 0 ? this.enteredDescription : undefined,
          source: this.enteredSource?.length !== 0 ? this.enteredSource : undefined,
          category: (this.typeToggleValue === 'expense' && this.selectedCategory.length !== 0) ? this.selectedCategory : undefined
        })
        if (!this.persistDate) this.setEnteredDate(new Date())
        this.enteredAmount = undefined
        this.enteredDescription = undefined
        this.enteredSource = undefined
        if (!this.persistCategory) this.selectedCategory = ''
      } else {
        console.log('invalid form')
      }
    }
  }
})
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>