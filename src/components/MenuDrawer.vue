<template>
  <div class="drawer lg:drawer-open">
    <input id="menu-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <div class="navbar bg-base-100">
        <div class="flex-none">
          <label ref="drawerToggleLabel" for="menu-drawer"
            class="btn btn-ghost btn-square drawer-button self-start lg:hidden">
            M
            <!--<Icon name="material-symbols:menu" />-->
          </label>
        </div>
        <div class="flex-1">
          <a class="btn btn-ghost text-xl">Budget App</a>
        </div>
        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost">
              Theme
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li v-for="theme in themes" :key="theme.value">
                <div class="form-control">
                  <label class="label cursor-pointer w-44">
                    <span class="label-text">{{ theme.display }}</span>
                    <input type="radio" name="theme-radios" class="radio theme-controller" :value="theme.value"
                      v-model="colorMode" />
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <slot name="default"></slot>
    </div>
    <div class="drawer-side">
      <label for="menu-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="menu p-2 w-80 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <button for="menu-drawer" class="btn btn-ghost btn-square drawer-button self-start lg:hidden"
          @click.stop="toggleMenuDrawer">
          T
          <!--<Icon name="material-symbols:close" />-->
        </button>
        <ul>
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { ref } from 'vue'

const themes: { display: string, value: string }[] = [
  { display: 'Default', value: 'default' },
  { display: 'Light', value: 'light' },
  { display: 'Dark', value: 'dark' },
  { display: 'Retro', value: 'retro' },
  { display: 'Cyberpunk', value: 'cyberpunk' },
  { display: 'Synthwave', value: 'synthwave' },
  { display: 'Valentine', value: 'valentine' },
  { display: 'Aqua', value: 'aqua' },
  { display: 'CMYK', value: 'cmyk' },
]

const colorMode = useColorMode()

const drawerToggleLabel = ref<HTMLInputElement | null>(null)

function toggleMenuDrawer() {
  if (drawerToggleLabel.value !== null) drawerToggleLabel.value.click()
}
</script>