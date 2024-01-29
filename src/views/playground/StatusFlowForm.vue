<script setup lang="ts">
import { computed } from 'vue'
import type { StatusFlowFormProps } from './StatusFlowFormProps'
import { luminance } from './color'
import StatusFlowRoleActionForm from './StatusFlowRoleActionForm.vue'

const props = withDefaults(defineProps<StatusFlowFormProps>(), {
  modelValue: () => ({
    rules: [],
    actions: []
  })
})
const emit = defineEmits<{
  (event: 'update:modelValue', data: StatusFlowFormProps['modelValue']): void
}>()
const state = computed(() => props.states.find((e) => e.stateId === props.stateId)!)
const textColorWhite = computed(
  () => luminance(props.states.find((e) => e.stateId === props.stateId)?.stateColor ?? '') < 0.5
)

function pushNewRule() {
  const mv = props.modelValue
  const firstRoleId = getUnselectedRole().find((e) => e)?.roleId
  if (!firstRoleId) {
    return
  }
  mv.rules ??= []
  mv.rules.push({
    roleId: firstRoleId,
    nextStateIds: []
  })
  emit('update:modelValue', mv)
}

function deleteRule(index: number) {
  const mv = props.modelValue
  mv.rules ??= []
  mv.rules.splice(index, 1)
  emit('update:modelValue', mv)
}

function getUnselectedRole(includeRoleId?: string) {
  return props.roles.filter(
    (e) => e.roleId === includeRoleId || !props.modelValue.rules.find((r) => r.roleId === e.roleId)
  )
}
</script>

<template>
  <div
    class="w-full border border-fm-color-neutral-gray-200 fm-corner-radius-lg px-5 py-5 flex flex-col gap-2"
  >
    <div class="flex items-center gap-1 mb-3">
      <span class="fm-typo-body-md-700">When PO is in state</span>
      <div
        v-if="state.stateName"
        :class="{
          inline: true,
          uppercase: true,
          'rounded-sm': true,
          'text-white': textColorWhite,
          'text-black': !textColorWhite,
          'font-bold': true,
          'px-1': true,
          'py-1': true
        }"
        :style="{
          backgroundColor: state.stateColor,
          fontSize: '0.75rem',
          letterSpacing: '0.5px'
        }"
      >
        {{ state.stateName }}
      </div>
    </div>
    <div v-for="(_, index) in modelValue.rules" :key="index">
      <StatusFlowRoleActionForm
        :model-value="modelValue.rules[index]"
        :roles="getUnselectedRole(modelValue.rules[index]?.roleId)"
        :states="states"
        :state-id="stateId"
        @click:delete="deleteRule(index)"
      />
    </div>
    <FmButton
      type="button"
      variant="tertiary"
      label="Add rule"
      icon="add"
      @click="() => pushNewRule()"
    />
    <!-- <FmMenuDivider />
    <div class="flex flex-col gap-5">
      <div class="fm-typo-body-md-400">When switched to this state, the system should:</div>
    </div>
    <FmButton
      type="button"
      variant="tertiary"
      label="Add action"
      icon="add"
      @click="() => pushNewRule()"
    /> -->
  </div>
</template>
