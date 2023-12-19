<template>
  <ContentContainer>
    <div class="grid grid-cols-5 gap-2">
      <div>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Date</span>
          </div>
          <div class="flex items-center">
            <ChevronLeft />
            <input type="date" class="input input-bordered w-full max-w-xs" />
            <ChevronRight />
          </div>
          <div class="label">
            <span></span>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text-alt pr-2">Persist</span>
                <input type="checkbox" checked="checked" class="checkbox checkbox-xs" />
              </label>
            </div>
          </div>
        </label>
      </div>
      <div>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Amount</span>
          </div>
          <div class="flex items-center">
            <input type="number" step=".01" pattern="^\d*(\.\d{0,2})?$" class="input input-bordered w-full max-w-xs" />
            <div class="h-fit max-h-fit ml-2">EUR</div>
          </div>
        </label>
      </div>
      <div class="col-span-2">
        <label class="form-control w-full max-w-md">
          <div class="label">
            <span class="label-text">Description</span>
          </div>
          <input type="text" class="input input-bordered max-w-full" />
        </label>
      </div>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Category</span>
        </div>
        <select class="select select-bordered">
          <option disabled selected>Pick one</option>
          <option>Grocery</option>
          <option>General Household</option>
          <option>Eat-outs</option>
          <option>Home</option>
          <option>Transportation</option>
          <option>Rent</option>
          <option>Utilities</option>
          <option>Travel</option>
          <option>Savings</option>
          <option>Sport</option>
          <option>Health</option>
        </select>
        <div class="label">
          <span></span>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text-alt pr-2">Persist</span>
              <input type="checkbox" checked="checked" class="checkbox checkbox-xs" />
            </label>
          </div>
        </div>
      </label>
    </div>
  </ContentContainer>
</template>

<script lang="ts">
import ChevronLeft from '@/components/icons/ChevronLeft.vue';
import ChevronRight from '@/components/icons/ChevronRight.vue';
import ContentContainer from '@/components/layout/ContentContainer.vue';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'TransactionEntry',
  components: { ContentContainer, ChevronLeft, ChevronRight }
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