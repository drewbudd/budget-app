<template>
  <div>
    <ContentContainer>
      <div class="flex flex-col">
        <TransactionTypeToggle :value="typeToggleValue" size="32" @toggled="setTransactionType" />
        <div class="grid grid-cols-5 gap-4">
          <div>
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">{{ i18n('date') }}</span>
              </div>
              <div class="flex items-center">
                <ChevronLeft @click="stepEnteredDate(-1)" />
                <input
                  type="date"
                  class="input input-bordered w-full max-w-xs"
                  v-model="enteredDate"
                  required
                />
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
                <input
                  type="number"
                  v-model="enteredAmount"
                  step=".01"
                  min="0"
                  pattern="^\d*(\.\d{0,2})?$"
                  class="input input-bordered w-full max-w-xs"
                  :class="{ 'input-error': !enteredAmount }"
                  required
                />
                <div class="h-fit max-h-fit ml-2">EUR</div>
              </div>
            </label>
          </div>
          <div class="col-span-2">
            <label class="form-control w-full max-w-2xl">
              <div class="label">
                <span class="label-text">{{ i18n('description') }}</span>
              </div>
              <input
                type="text"
                v-model="enteredDescription"
                class="input input-bordered max-w-full"
              />
            </label>
          </div>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">{{ i18n('category') }}</span>
            </div>
            <select
              class="select select-bordered"
              v-model="selectedCategory"
              :class="{ 'select-error': !selectedCategory }"
              required
            >
              <option disabled selected value="">{{ i18n('pick-one') }}</option>
              <option
                v-if="typeToggleValue === 'expense'"
                v-for="category in expenseCategories"
                :key="category"
                :value="category"
              >
                {{ i18n(`category.${category}`) }}
              </option>
              <option
                v-if="typeToggleValue === 'income'"
                v-for="category in incomeCategories"
                :key="category"
                :value="category"
              >
                {{ i18n(`category.${category}`) }}
              </option>
            </select>
            <div class="label">
              <span></span>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text-alt pr-2">{{ i18n('persist') }}</span>
                  <input type="checkbox" v-model="persistCategory" class="checkbox checkbox-xs" />
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
    <ContentContainer v-if="transactions.length !== 0" class="mt-10">
      <div class="w-full">
        <table class="table table-lg table-zebra">
          <thead>
            <th>{{ i18n('type') }}</th>
            <th>{{ i18n('date') }}</th>
            <th>{{ i18n('amount') }}</th>
            <th>{{ i18n('description') }}</th>
            <th>{{ i18n('category') }}</th>
          </thead>
          <tbody>
            <tr v-for="entry in transactions">
              <td>{{ i18n(entry.type) }}</td>
              <td>{{ entry.date }}</td>
              <td>{{ entry.amount }}</td>
              <td>{{ entry.description }}</td>
              <td>{{ i18n(`category.${entry.category}`) }}</td>
            </tr>
            <tr class="border-t-2">
              <td></td>
              <td>{{ i18n('balance') }}</td>
              <td :class="{ 'bg-success': balance > 0, 'bg-error': balance < 0 }">{{ balance }}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </ContentContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChevronLeft from '@/components/icons/ChevronLeft.vue'
import ChevronRight from '@/components/icons/ChevronRight.vue'
import ContentContainer from '@/components/layout/ContentContainer.vue'
import SubmitButton from '@/components/button/SubmitButton.vue'
import TransactionTypeToggle from '@/components/toggle/TransactionTypeToggle.vue'
import { EXPENSE_CATEGORIES } from '@/types/transaction/ExpenseCategory'
import { INCOME_CATEGORIES } from '@/types/transaction/IncomeCategory'
import { useTransactionsStore } from '@/stores/transactions'

export default defineComponent({
  name: 'TransactionEntry',
  components: { ContentContainer, ChevronLeft, ChevronRight, SubmitButton, TransactionTypeToggle },
  setup() {
    const transactionsStore = useTransactionsStore()

    return {
      transactionsStore,
    }
  },
  data() {
    return {
      expenseCategories: EXPENSE_CATEGORIES,
      incomeCategories: INCOME_CATEGORIES,
      typeToggleValue: 'expense' as 'expense' | 'income',
      enteredDate: '' as string,
      persistDate: false,
      enteredAmount: undefined as number | undefined,
      enteredDescription: undefined as string | undefined,
      selectedCategory: '' as string,
      persistCategory: false,
    }
  },
  computed: {
    formValid(): boolean {
      return !(
        this.enteredDate.length === 0 ||
        !this.enteredAmount ||
        this.selectedCategory.length === 0
      )
    },
    transactions() {
      return this.transactionsStore.transactions
    },
    balance() {
      var balance: number = 0
      this.transactions.forEach((transaction) => {
        switch (transaction.type) {
          case 'income':
            balance += transaction.amount
            return
          case 'expense':
            balance -= transaction.amount
            return
        }
      })
      return balance
    },
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
        case 'type':
          return 'Type'
        case 'expense':
          return 'Expense'
        case 'income':
          return 'Income'
        case 'date':
          return 'Date'
        case 'amount':
          return 'Amount'
        case 'description':
          return 'Description'
        case 'balance':
          return 'Balance'
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
        case 'category.yaki-nori':
          return 'Yaki/Nori'
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
        case 'category.salary':
          return 'Salary'
        case 'category.refund':
          return 'Refund'
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
        this.transactionsStore.addTransaction({
          type: this.typeToggleValue,
          date: this.enteredDate,
          amount: this.enteredAmount ?? 0,
          description: this.enteredDescription?.length !== 0 ? this.enteredDescription : undefined,
          category: this.selectedCategory,
        })
        if (!this.persistDate) this.setEnteredDate(new Date())
        this.enteredAmount = undefined
        this.enteredDescription = undefined
        if (!this.persistCategory) this.selectedCategory = ''
      } else {
        console.log('invalid form')
      }
    },
  },
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
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
