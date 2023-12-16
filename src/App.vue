<template>
  <MenuDrawer :data-theme="colorMode">
    <template #default>
      <div class="p-4">
        <RouterView />
        TEST
      </div>
    </template>
  </MenuDrawer>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuDrawer from './components/MenuDrawer.vue'
import { useColorMode } from '@vueuse/core';

const colorMode = useColorMode()
</script>
