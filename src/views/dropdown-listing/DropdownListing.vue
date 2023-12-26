<script setup lang="ts">
import SECTION_IN_DROPDOWN from './assets/section-in-dropdown.png'
</script>

<template>
  <div class="px-[100px] py-5 flex flex-col gap-5">
    <div class="font-bold">Allow section in dropdown</div>
    <img style="width: 400px" :src="SECTION_IN_DROPDOWN" />
    <div>
      The proposed new data structure is to a add new property <code>group</code> in the dropdown
      options:
    </div>
    <div class="text-xs">
      <pre>
const dropdownOptions = [
  {
    label: 'Box (b)',
    value: 'box',
    group: 'Box'
  },
  {
    label: 'Set (s)',
    value: 'set',
    group: 'Box'
  },
]
  </pre
      >
    </div>
    <div>Or a slot for rendering dropdown options</div>
    <div class="text-xs">
      <pre>
&lt;FmDropdown v-model:model-value="modelValue">
  &lt;template #items>
    // ... iteration and render
  &lt;/template>
&lt;/FmDropdown>
      </pre>
    </div>
  </div>
</template>
