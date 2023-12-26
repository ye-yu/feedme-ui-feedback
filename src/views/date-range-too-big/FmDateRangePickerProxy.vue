<script setup lang="ts">
import type { FmDateRangePickerEvents, FmDateRangePickerProps } from './FmDateRangePickerProps'

defineProps<FmDateRangePickerProps>()
const emit = defineEmits<FmDateRangePickerEvents>()
</script>

<template>
  <FmDateRangePicker
    :label="label"
    :model-value="modelValue"
    @update:model-value="(mv) => emit('update:modelValue', mv)"
  />
</template>
