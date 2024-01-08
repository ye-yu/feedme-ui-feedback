<script setup lang="ts">
import type { FmTextFieldEvents, FmTextFieldProps } from './FmTextFieldProps'

defineProps<FmTextFieldProps>()
const emit = defineEmits<FmTextFieldEvents>()
</script>

<template>
  <FmTextField
    :label="label"
    :model-value="modelValue"
    @update:model-value="(mv) => emit('update:modelValue', mv)"
  />
</template>
