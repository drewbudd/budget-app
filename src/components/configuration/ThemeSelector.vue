<template>
  <details class="dropdown dropdown-end" ref="menuParent">
    <summary class="btn btn-ghost text-primary-content">Theme</summary>
    <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li v-for="theme in themes" :key="theme.value">
        <div class="form-control">
          <label class="label cursor-pointer w-44">
            <span class="label-text">{{ theme.display }}</span>
            <input type="radio" name="theme-radios" class="radio theme-controller" :value="theme.value"
              v-model="colorMode" @click="onSelectTheme" />
          </label>
        </div>
      </li>
    </ul>
  </details>
</template>

<script lang="ts">
import { useColorMode } from '@vueuse/core';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ThemeSelector',
  setup() {
    const colorMode = useColorMode()

    return {
      colorMode
    }
  },
  data() {
    return {
      themes: [
        { display: 'Default', value: 'default' },
        { display: 'Light', value: 'light' },
        { display: 'Dark', value: 'dark' },
        { display: 'Cupcake', value: 'cupcake' },
        { display: 'Bumbee', value: 'bumblebee' },
        { display: 'Emerald', value: 'emerald' },
        { display: 'Corporate', value: 'corporate' },
        { display: 'Synthwave', value: 'synthwave' },
        { display: 'Retro', value: 'retro' },
        { display: 'Cyberpunk', value: 'cyberpunk' },
        { display: 'Valentine', value: 'valentine' },
        { display: 'Halloween', value: 'halloween' },
        { display: 'Garden', value: 'garden' },
        { display: 'Forest', value: 'forest' },
        { display: 'Aqua', value: 'aqua' },
        { display: 'LoFi', value: 'lofi' },
        { display: 'Pastel', value: 'pastel' },
        { display: 'Fantasy', value: 'fantasy' },
        { display: 'Wireframe', value: 'wireframe' },
        { display: 'Black', value: 'black' },
        { display: 'Luxury', value: 'luxury' },
        { display: 'Dracula', value: 'dracula' },
        { display: 'CMYK', value: 'cmyk' },
        { display: 'Autumn', value: 'autumn' },
        { display: 'Business', value: 'business' },
        { display: 'Acid', value: 'acid' },
        { display: 'Lemonade', value: 'lemonade' },
        { display: 'Night', value: 'night' },
        { display: 'Coffee', value: 'coffee' },
        { display: 'Winter', value: 'winter' }
      ] as { display: string; value: string }[]
    }
  },
  methods: {
    async onSelectTheme() {
      setTimeout(() => {
        this.$refs.menuParent.removeAttribute('open')
      }, 100);
    }
  }
})
</script>