<script setup lang="ts">
defineProps<{
  trigger?: string
}>()
</script>

<template>
  <FmMenu :trigger="trigger">
    <slot></slot>
  </FmMenu>
</template>
