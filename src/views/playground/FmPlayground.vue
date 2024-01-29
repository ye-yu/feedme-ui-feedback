<script setup lang="ts">
import { reactive } from 'vue'
import StateForm from './StateForm.vue'
import type { StateFormProps } from './StateFormProps'
import type { StatusFlowFormProps } from './StatusFlowFormProps'
import StatusFlowForm from './StatusFlowForm.vue'
import type { RoleFormProps } from './RoleFormProps'
import RoleForm from './RoleForm.vue'

const roles = reactive(new Array<RoleFormProps['modelValue']>())
function newRole() {
  roles.push({
    name: '',
    roleId: Math.random().toString(16).slice(2, 10)
  })
  accordion.roles = true
}
function defaultRoles() {
  roles.length = 0
  roles.push({
    name: 'Admin',
    roleId: Math.random().toString(16).slice(2, 10)
  })
  roles.push({
    name: 'Warehouse Manager',
    roleId: Math.random().toString(16).slice(2, 10)
  })
  accordion.roles = true
}
function deleteRole(index: number) {
  roles.splice(index, 1)
}

const states = reactive(new Array<StateFormProps['modelValue']>())
const statusFlow = reactive({} as Record<string, StatusFlowFormProps['modelValue']>)

function newState() {
  states.push({
    stateName: '',
    stateId: `${Math.random()}`,
    stateColor: `#${Math.random().toString(16).substring(2, 8)}`
  })
  accordion.statuses = true
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
    },
    {
      stateName: 'Canceled',
      stateId: `${Math.random()}`,
      stateColor: `#ff3430`
    }
  ]

  defaultStates.forEach((e) => states.push(e))
  accordion.statuses = true
}

function deleteState(index: number) {
  states.splice(index, 1)
}

const accordion = reactive({
  roles: false,
  statuses: false,
  stateFlow: true
})
</script>

<template>
  <div class="px-[100px] py-5 flex flex-col gap-5 w-full">
    <div class="flex gap-5 items-center">
      <div
        class="fm-typo-title-lg-700 flex-grow hover:underline cursor-pointer"
        @click="accordion.roles = !accordion.roles"
      >
        <span v-if="accordion.roles">&blacktriangledown;</span>
        <span v-else>&blacktriangleright;</span>
        Roles
        <span v-if="!accordion.roles">({{ roles.length }} roles)</span>
      </div>
      <div>
        <FmButton
          type="button"
          variant="secondary"
          label="Default Roles"
          @click="() => defaultRoles()"
        />
      </div>
      <div>
        <FmButton
          type="button"
          variant="primary"
          label="Add Role"
          icon="add"
          @click="() => newRole()"
        />
      </div>
    </div>
    <template v-if="accordion.roles">
      <RoleForm
        v-for="(role, index) in roles"
        :key="role.roleId"
        v-model:model-value="roles[index]"
        @click:delete="() => deleteRole(index)"
      />
    </template>
  </div>
  <div></div>
  <div class="px-[100px] py-5 flex flex-col gap-5 w-full">
    <div class="flex gap-5 items-center">
      <div
        class="fm-typo-title-lg-700 flex-grow hover:underline cursor-pointer"
        @click="accordion.statuses = !accordion.statuses"
      >
        <span v-if="accordion.statuses">&blacktriangledown;</span>
        <span v-else>&blacktriangleright;</span>
        Statuses
        <span v-if="!accordion.statuses">({{ states.length }} statuses)</span>
      </div>
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
    <template v-if="accordion.statuses">
      <StateForm
        v-for="(state, index) in states"
        :key="state.stateId"
        v-model:model-value="states[index]"
        @click:delete="() => deleteState(index)"
      />
    </template>
  </div>
  <div></div>
  <div class="px-[100px] py-5 flex flex-col gap-5 w-full">
    <div
      class="fm-typo-title-lg-700 flex-grow hover:underline cursor-pointer"
      @click="accordion.stateFlow = !accordion.stateFlow"
    >
      <span v-if="accordion.stateFlow">&blacktriangledown;</span>
      <span v-else>&blacktriangleright;</span>
      Status Flow
    </div>
    <template v-if="accordion.stateFlow">
      <template v-for="state in states" :key="state.stateId">
        <StatusFlowForm
          v-if="state.stateName"
          :states="states"
          :state-id="state.stateId"
          v-model:model-value="statusFlow[state.stateId]"
        />
      </template>
    </template>
  </div>
</template>
