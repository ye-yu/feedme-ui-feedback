<script setup lang="ts">
import { reactive } from 'vue'
import StateForm from './StateForm.vue'
import type { StateFormProps } from './StateFormProps'
import type { StatusFlowFormProps } from './StatusFlowFormProps'
import StatusFlowForm from './StatusFlowForm.vue'

const states = reactive(new Array<StateFormProps['modelValue']>())
const statusFlow = reactive({} as Record<string, StatusFlowFormProps['modelValue']>)

function newState() {
  states.push({
    stateName: '',
    stateId: `${Math.random()}`,
    stateColor: `#${Math.random().toString(16).substring(2, 8)}`
  })
}

function defaultStates() {
  states.length = 0
  const defaultStates: typeof states = [
    {
      stateName: 'Draft',
      stateId: `${Math.random()}`,
      stateColor: `#171717`
    },
    {
      stateName: 'Pending Approval',
      stateId: `${Math.random()}`,
      stateColor: `#FFD700`
    },
    {
      stateName: 'Pending Receiving',
      stateId: `${Math.random()}`,
      stateColor: `#008080`
    },
    {
      stateName: 'Received',
      stateId: `${Math.random()}`,
      stateColor: `#00bd00`
    }
  ]

  defaultStates.forEach((e) => states.push(e))
}

function deleteState(index: number) {
  states.splice(index, 1)
}
</script>

<template>
  <div class="px-[100px] py-5 flex flex-col gap-5 w-full">
    <div class="flex gap-5 items-center">
      <div class="fm-typo-title-lg-700 flex-grow">Statuses</div>
      <div>
        <FmButton
          type="button"
          variant="secondary"
          label="Default States"
          @click="() => defaultStates()"
        />
      </div>
      <div>
        <FmButton
          type="button"
          variant="primary"
          label="Add State"
          icon="add"
          @click="() => newState()"
        />
      </div>
    </div>
    <StateForm
      v-for="(state, index) in states"
      :key="state.stateId"
      v-model:model-value="states[index]"
      @click:delete="() => deleteState(index)"
    />
  </div>
  <div></div>
  <div class="px-[100px] py-5 flex flex-col gap-5 w-full">
    <div class="fm-typo-title-lg-700 flex-grow">Status Flow</div>
    <template v-for="state in states" :key="state.stateId">
      <StatusFlowForm
        v-if="state.stateName"
        :states="states"
        :state-id="state.stateId"
        v-model:model-value="statusFlow[state.stateId]"
      />
    </template>
  </div>
</template>
