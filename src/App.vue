<script setup lang="ts">
import { useRoute } from 'vue-router'
import router from './router/router'
import { routes } from './router/routes'

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
          'bg-gray-100': route.path === currentRoute.path
        }"
        v-for="route in routes"
        :key="route.path"
        :href="`${route.path}`"
        @click="router.push(route.path)"
      >
        {{ typeof route.props === 'object' && route.props?.name }}
      </a>
    </div>
    <div>
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
