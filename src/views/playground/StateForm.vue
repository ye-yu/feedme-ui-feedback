<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { StateFormProps } from './StateFormProps'

const props = defineProps<StateFormProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', data: StateFormProps['modelValue']): void
  (event: 'click:delete'): void
}>()

const modelValue = reactive(props.modelValue)
const modelStateName = computed({
  get() {
    return modelValue.stateName
  },
  set(data: string) {
    modelValue.stateName = data
    modelValue.stateCode = data
      .toLocaleLowerCase()
      .replace(/[^a-z]+/gi, '_')
      .replace(/^_*/, '')
      .replace(/_*$/, '')
    emit('update:modelValue', modelValue)
  }
})

const modelStateColor = computed({
  get() {
    return modelValue.stateColor
  },
  set(data: string) {
    modelValue.stateColor = data
    emit('update:modelValue', modelValue)
  }
})
</script>

<template>
  <div class="flex gap-5 items-center">
    <FmTextField v-model:modelValue="modelStateName" label="Name" />
    <div class="min-w-[12rem]">
      <label class="flex flex-col gap-4" for="stateColor">
        <div>Color</div>
        <div
          class="border border-fm-color-neutral-gray-200 hover:border-fm-color-neutral-gray-400 fm-corner-radius-md fm-typo-body-lg-400 text-fm-color-typo-primary flex items-center px-[11px] py-[7px] h-[48px] gap-5"
        >
          <div class="flex-grow">{{ modelStateColor }}</div>
          <input type="color" v-model="modelStateColor" id="stateColor" name="stateColor" />
        </div>
      </label>
    </div>
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
