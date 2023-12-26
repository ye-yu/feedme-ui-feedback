<script setup lang="ts">
import { ref, computed } from 'vue'

const textFieldCode1 = `
<script>
  const value1 = ref('')
  const helper1 = computed(() =>
    value1.value.replace(/[aeuio]/g, '').length ? 'Must only contains A, E, U, I, O' : null
  )
/script>
<FmTextField v-model:model-value="value1">
  <template #label>
    Vowels
  </template>
  <template #helper-text>
    <div class="text-red">{{ helper1 }}</div>
  </template>
</FmTextField>
`.trim()

const textFieldCode2 = `
<FmTextField v-model:model-value="value1" helper-text="true">
  <template #label>
    Vowels
  </template>
  <template #helper-text>
    <div class="text-red">{{ helper1 }}</div>
  </template>
</FmTextField>
`.trim()

const value1 = ref('')
const helper1 = computed(() =>
  value1.value.replace(/[aeuio]/g, '').length ? 'Must only contains A, E, U, I, O' : null
)
</script>

<template>
  <div class="px-[100px] py-5 flex flex-col gap-5">
    <div class="font-bold">
      Text field helper component not rendered unless helper prop is also defined
    </div>
    <div>
      <highlightjs language="xml" :code="textFieldCode1" />
    </div>
    <FmTextField v-model:model-value="value1">
      <template #label> Vowels </template>
      <template #helper-text>
        <div class="text-red">{{ helper1 }}</div>
      </template>
    </FmTextField>
    <div>When helper prop is defined this way</div>
    <div>
      <highlightjs language="xml" :code="textFieldCode2" />
    </div>
    <FmTextField v-model:model-value="value1" helper-text="true">
      <template #label> Vowels </template>
      <template #helper-text>
        <div style="color: #fe1111">{{ helper1 }}</div>
      </template>
    </FmTextField>
    <div>The redundancy is in the 'helper-text' because the template has been defined</div>
  </div>
</template>
