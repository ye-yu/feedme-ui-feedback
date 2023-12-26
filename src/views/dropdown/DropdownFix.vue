<script setup lang="ts">
import { computed, ref } from 'vue'

const options = [
  {
    label: 'Gramme',
    value: null
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
const optionsCode1 = `
const options = [
  {
    label: 'Gramme',
    value: null
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
`.trim()

const selectedValue = ref(options[0].value)

const optionsWorkaround = [
  {
    label: 'Gramme',
    value: { value: null }
  },
  {
    label: 'PCS',
    value: { value: { _id: 'pcs', measurement: 'something' } }
  },
  {
    label: 'Kilogramme',
    value: { value: { _id: 'kg', measurement: 'something' } }
  }
]

const optionsCode2 = `
const optionsWorkaround = [
  {
    label: 'Gramme',
    value: { value: null }
  },
  {
    label: 'PCS',
    value: { value: { _id: 'pcs', measurement: 'something' } }
  },
  {
    label: 'Kilogramme',
    value: { value: { _id: 'kg', measurement: 'something' } }
  }
]`.trim()

const selectedValueWorkaround = ref(optionsWorkaround[0].value)
const selectedValueActual = computed(() => selectedValueWorkaround?.value?.value ?? null)
</script>

<template>
  <div class="px-[100px] py-5 flex flex-col gap-5">
    <div class="font-bold">
      [v0.0.14] Input text is greyed out if the value is <code>null</code>
    </div>
    <div class="text-xs">
      <span style="color: red">*</span> Note: in v0.0.17, component throws error if
      <code>model-value</code> is
      <code>null</code>
    </div>
    <div>
      Due to data structure saved in the database, the value <code>null</code> is necessary as one
      of the dropdown options
    </div>
    <div>
      <highlightjs language="javascript" :code="optionsCode1" />
    </div>
    <div>
      Desired output: when unit 'Gramme' is selected, the text color is not grayed (due the value
      holding <code>null</code> value)
    </div>
    <FmSelect
      :items="options"
      v-model:model-value="selectedValue"
      :label="`Measurement --> ${JSON.stringify(selectedValue?._id ?? null)}`"
    />
    <div>
      Current workaround is to wrap the values in object <code>{value: null}</code>, and this
      creates redundant code.
    </div>
    <div>
      <highlightjs language="javascript" :code="optionsCode2" />
    </div>

    <FmSelect
      :items="optionsWorkaround"
      v-model:model-value="selectedValueWorkaround"
      :label="`Measurement --> ${JSON.stringify(selectedValueActual?._id ?? null)}`"
    />
  </div>
</template>
