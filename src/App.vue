<script setup lang="ts">
import { useRoute } from 'vue-router'
import router from './router/router'
import { routes } from './router/routes'
import FmPlayground from './views/playground/FmPlayground.vue'

const currentRoute = useRoute()
</script>

<template>
  <div class="flex w-screen">
    <div class="flex flex-col shadow rounded h-screen" style="min-width: 300px">
      <div class="text-lg font-bold px-5 py-5 mb-2">Routes</div>
      <a
        :class="{
          'px-5': true,
          'py-5': true,
          'w-100': true,
          'text-sm': true,
          'bg-gray-100': route.path === currentRoute.path,
          'text-gray-300': typeof route.props === 'object' && route.props?.addressed
        }"
        v-for="route in routes"
        :key="route.path"
        :href="`${route.path}`"
        @click="router.push(route.path)"
      >
        <span
          v-if="typeof route.props === 'object' && route.props?.addressed"
          class="text-emerald-500 pr-1"
          >✓</span
        >
        {{ typeof route.props === 'object' && route.props?.name }}
      </a>
    </div>
    <div>
      <RouterView />
      <FmPlayground v-if="currentRoute.path === '/'" />
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
