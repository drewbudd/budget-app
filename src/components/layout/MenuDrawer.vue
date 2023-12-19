<template>
  <div class="drawer lg:drawer-open">
    <input id="menu-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-start">
      <div class="container min-w-full">
        <div class="navbar bg-base-100 lg:bg-primary">
          <div class="flex-none">
            <label ref="drawerToggleLabel" for="menu-drawer"
              class="btn btn-ghost btn-square drawer-button self-start lg:hidden">
              <MenuIcon />
            </label>
          </div>
          <div class="flex-1">
            <div class="lg:hidden">
              Budget App
            </div>
          </div>
          <div class="flex-none">
            <ThemeSelector />
          </div>
        </div>
        <slot name="default"></slot>
      </div>
    </div>
    <div class="drawer-side">
      <label for="menu-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="menu p-2 w-80 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <button for="menu-drawer" class="btn btn-ghost btn-square drawer-button self-start lg:hidden"
          @click.stop="toggleMenuDrawer">
          <CloseIcon />
        </button>
        <div class="invisible lg:pl-4 lg:pt-3 lg:pb-6 lg:text-xl lg:visible">
          Budget App
        </div>
        <ul>
          <li>
            <RouterLink :to="{ name: HOME }">Home</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: TRANSACTION_ENTRY }">Transaction Entry</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MenuIcon from '../icons/MenuIcon.vue';
import CloseIcon from '../icons/CloseIcon.vue';
import ThemeSelector from '../configuration/ThemeSelector.vue'
import { HOME, TRANSACTION_ENTRY } from '@/router/route-names'

const drawerToggleLabel = ref<HTMLInputElement | null>(null)

function toggleMenuDrawer() {
  if (drawerToggleLabel.value !== null) drawerToggleLabel.value.click()
}
</script>
