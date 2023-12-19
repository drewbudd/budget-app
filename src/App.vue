<template>
  <MenuDrawer :data-theme="colorMode">
    <template #default>
      <div class="flex justify-center p-4">
        <RouterView />
      </div>
    </template>
  </MenuDrawer>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuDrawer from './components/layout/MenuDrawer.vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()
</script>
