<script setup lang="ts">
import { computed, h, reactive } from 'vue'
import StateForm from './StateForm.vue'
import type { StateFormProps } from './StateFormProps'
import type { StatusFlowFormProps } from './StatusFlowFormProps'
import StatusFlowForm from './StatusFlowForm.vue'
import type { RoleFormProps } from './RoleFormProps'
import RoleForm from './RoleForm.vue'
import * as core from '@feedmepos/core'
import z from 'zod'
import type { ColumnDef } from '@tanstack/vue-table'

type FdoPermissionRule = z.infer<(typeof core)['entity']['FdoPermissionRule']>
type FdtoPermissionAccessRes = z.infer<(typeof core)['entity']['FdtoPermissionAccessRes']>

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
    stateCode: '',
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
      stateCode: 'draft',
      stateId: `${Math.random()}`,
      stateColor: `#171717`
    },
    {
      stateName: 'Pending Approval',
      stateCode: 'pending_approval',
      stateId: `${Math.random()}`,
      stateColor: `#FFD700`
    },
    {
      stateName: 'Pending Receiving',
      stateCode: 'pending_receiving',
      stateId: `${Math.random()}`,
      stateColor: `#008080`
    },
    {
      stateName: 'Received',
      stateCode: 'received',
      stateId: `${Math.random()}`,
      stateColor: `#00bd00`
    },
    {
      stateName: 'Canceled',
      stateCode: 'canceled',
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

function getPermissionSubject(
  from: StateFormProps['modelValue'],
  to: StateFormProps['modelValue']
) {
  return `po::transition::${from.stateCode}::${to.stateCode}`
}

function getPermissionRules() {
  const rules = Object.entries(statusFlow).flatMap(([stateId, flow]) => {
    const state = states.find((e) => e.stateId === stateId)
    if (!state) {
      return []
    }

    const rules = flow.rules.flatMap((e) =>
      e.nextStateIds.map((s) => states.find((e) => e.stateId === s)!).filter((e) => e)
    )
    if (!rules.length) {
      return []
    }

    const permissionIdToRoleId = flow.rules.reduce(
      (a, b) => {
        for (const stateId of b.nextStateIds) {
          const nextState = states.find((e) => e.stateId === stateId)
          if (!nextState) {
            continue
          }
          const subject = getPermissionSubject(state, nextState)
          a[subject] ??= []
          a[subject].push(b.roleId)
        }
        return a
      },
      {} as Record<string, string[]>
    )
    return Object.entries(permissionIdToRoleId).map(([subject, roleIds]) => {
      const rule: FdoPermissionRule = {
        label: subject,
        subject: subject,
        actions: ['manage'],
        conditions: JSON.stringify({
          roleId: {
            $in: roleIds
          }
        })
      }
      return rule
    })
  })
  return core.Permission(rules)
}

const permissionTable = computed(() => {
  const rules = getPermissionRules()

  const data = states.flatMap((from) => {
    return states
      .filter((e) => e.stateId !== from.stateId)
      .map((to) => {
        const permissionSubject = getPermissionSubject(from, to)
        const permissionInfo = {
          from,
          to,
          subject: permissionSubject
        }
        const rolesAccess = roles.reduce(
          (a, b) => {
            a[b.roleId] = rules.can({
              subject: permissionSubject,
              action: 'manage',
              conditions: { roleId: b.roleId }
            })
            return a
          },
          {} as Record<string, FdtoPermissionAccessRes>
        )
        return {
          ...permissionInfo,
          ...rolesAccess
        } as typeof permissionInfo & { [key: string]: FdtoPermissionAccessRes }
      })
  })
  const columns: ColumnDef<(typeof data)[number]>[] = [
    {
      id: 'State From',
      header: 'State From',
      accessorKey: 'from.stateName'
    },
    {
      id: 'State To',
      header: 'State To',
      accessorKey: 'to.stateName'
    },
    {
      id: 'Permission Subject',
      header: 'Permission Subject',
      accessorKey: 'subject'
    },
    ...roles.map((e) => {
      const def: ColumnDef<(typeof data)[number]> = {
        id: `role_${e.roleId}`,
        header: `${e.name}`,
        cell(props) {
          const row = props.row.original
          return h(
            'span',
            {
              class: {
                'text-fm-color-typo-error': !row[e.roleId]?.result && row[e.roleId]?.reason,
                'text-fm-color-typo-success': row[e.roleId]?.result
              }
            },
            row[e.roleId]?.result ? 'Yes' : row[e.roleId]?.reason || 'Default'
          )
        }
      }
      return def
    })
  ]

  return {
    data,
    columns
  }
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
          :roles="roles"
          :states="states"
          :state-id="state.stateId"
          v-model:model-value="statusFlow[state.stateId]"
        />
      </template>
    </template>
  </div>
  <div class="px-[100px] py-5 flex flex-col gap-5 w-full">
    <FmTable
      :key="JSON.stringify({ states, statusFlow })"
      :column-defs="permissionTable.columns"
      :row-data="permissionTable.data"
    />
  </div>
</template>
