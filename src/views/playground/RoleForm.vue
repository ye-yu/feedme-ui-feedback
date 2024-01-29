<script setup lang="ts">
import { computed } from 'vue'
import type { RoleFormEvents, RoleFormProps } from './RoleFormProps'

const props = defineProps<RoleFormProps>()
const emit = defineEmits<RoleFormEvents>()

const modelValue = computed({
  get() {
    return props.modelValue.name
  },
  set(v: RoleFormProps['modelValue']['name']) {
    const mv = {
      ...props.modelValue
    }
    mv.name = v
    emit('update:model-value', mv)
  }
})
</script>

<template>
  <div class="flex flex-row items-center gap-5">
    <FmTextField label="Role name" v-model:model-value="modelValue" />
    <FmButton
      class="mt-5"
      type="button"
      size="md"
      variant="tertiary"
      icon="delete"
      icon-color="#FF0000"
      @click="emit('click:delete')"
    />
  </div>
</template>
