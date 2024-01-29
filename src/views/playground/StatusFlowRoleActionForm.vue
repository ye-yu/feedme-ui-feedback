<script setup lang="ts">
import { computed } from 'vue'
import type { StatusFlowRoleActionFormProps } from './StatusFlowRoleActionFormProps'
import { luminance } from './color'
import type { StateFormProps } from './StateFormProps'

const props = defineProps<StatusFlowRoleActionFormProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', data: StatusFlowRoleActionFormProps['modelValue']): void
  (event: 'click:delete'): void
}>()

const nextStates = computed(() => {
  const nextStateIds = props.modelValue.nextStateIds ?? []
  const validNextStates = nextStateIds.filter((e) => props.states.find((s) => s.stateId === e))
  return props.states.filter((e) => validNextStates.includes(e.stateId))
})

const availableStates = computed(() => {
  const nextStateIds = props.modelValue.nextStateIds ?? []
  const validNextStates = nextStateIds.filter((e) => props.states.find((s) => s.stateId === e))
  return props.states
    .filter((e) => !validNextStates.includes(e.stateId) && e.stateId !== props.stateId)
    .map((e) => ({
      label: e.stateName,
      value: e
    }))
})

function textColorShouldBeWhite(state: StateFormProps['modelValue']) {
  return luminance(state.stateColor ?? '') < 0.5
}

function addNextState(state: StateFormProps['modelValue']) {
  const mv = props.modelValue
  mv.nextStateIds ??= []
  mv.nextStateIds.push(state.stateId)
  emit('update:modelValue', mv)
}

function removeState(index: number) {
  const mv = props.modelValue
  mv.nextStateIds ??= []
  mv.nextStateIds.splice(index, 1)
  emit('update:modelValue', mv)
}
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <FmTextField placeholder="Input role" v-model:model-value="modelValue.role" />
    <div>can change PO status to</div>
    <template v-for="(state, index) in nextStates" :key="state.stateId">
      <div
        v-if="state.stateName"
        :class="{
          'inline-flex': true,
          'items-center': true,
          uppercase: true,
          'rounded-sm': true,
          'text-white': textColorShouldBeWhite(state),
          'text-black': !textColorShouldBeWhite(state),
          'font-bold': true,
          'px-2': true,
          'py-1': true,
          'gap-1': true
        }"
        :style="{
          backgroundColor: state.stateColor,
          fontSize: '0.75rem',
          letterSpacing: '0.5px'
        }"
      >
        <div>{{ state.stateName }}</div>
        <div class="hover:font-bold cursor-pointer" @click="removeState(index)">&times;</div>
      </div>
    </template>
    <div>
      <FmSelect
        v-if="availableStates.length"
        :model-value="null"
        placeholder="Select next state"
        :items="availableStates"
        @update:model-value="(nextState: StateFormProps['modelValue']) => addNextState(nextState)"
      />
    </div>
    <div>
      <FmButton
        type="button"
        size="md"
        variant="tertiary"
        icon="delete"
        icon-color="#FF0000"
        @click="emit('click:delete')"
      />
    </div>
  </div>
</template>
