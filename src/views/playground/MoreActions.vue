<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  actions: { label: string; color: string }[]
}>()

const emit = defineEmits<{
  (event: 'click:action', action: string): void
}>()
const showMenu = ref(false)
const menuHovered = ref(false)
</script>

<template>
  <div class="relative my-auto">
    <fm-button
      variant="tertiary"
      size="md"
      icon="more_vert"
      iconColor="#555"
      @click="showMenu = true"
      @blur="() => (menuHovered ? void 0 : (showMenu = false))"
    />
    <div
      v-if="showMenu"
      class="w-[130px] absolute bg-white br-md px-1 py-1 rounded shadow"
      style="z-index: 100"
    >
      <div
        class="br-md px-2 py-3 cursor-pointer rounded hover:bg-slate-100"
        v-for="action in actions"
        :key="action.label"
        @click="() => (emit('click:action', action.label), (showMenu = false))"
        @mouseover="menuHovered = true"
        @mouseout="menuHovered = false"
      >
        <span :class="action.color">{{ action.label }}</span>
      </div>
    </div>
  </div>
</template>
