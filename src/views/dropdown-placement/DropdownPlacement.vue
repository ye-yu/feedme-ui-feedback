<script setup lang="ts">
import { ref } from 'vue'

const options = [
  {
    label: 'Gramme',
    value: 'null'
  },
  {
    label: 'PCS',
    value: { _id: 'pcs', measurement: 'something' }
  },
  {
    label: 'Kilogramme',
    value: { _id: 'kg', measurement: 'something' }
  }
]

const selectedValue = ref(options[0].value)

const possiblePlacements = [
  'top',
  'right',
  'bottom',
  'left',
  'top-start',
  'top-end',
  'right-start',
  'right-end',
  'bottom-start',
  'bottom-end',
  'left-start',
  'left-end'
] as const
</script>

<template>
  <div class="px-[100px] py-5 flex flex-col gap-5">
    <div class="font-bold">[v0.0.14] Dropdown placement syntax not sensible</div>
    <div class="text-xs">
      <span style="color: red">*</span>
      Note: in v0.0.17, dropdown does not close when other dropdown is selected
    </div>
    <FmSelect
      v-for="placement in possiblePlacements"
      :key="placement"
      :placement="placement"
      :items="options"
      v-model:model-value="selectedValue"
      :label="`Placement --> ${placement}`"
    />
  </div>
</template>
