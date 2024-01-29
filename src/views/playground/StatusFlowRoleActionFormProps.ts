import type { RoleFormProps } from './RoleFormProps'
import type { StateFormProps } from './StateFormProps'

export interface StatusFlowRoleActionFormProps {
  roles: RoleFormProps['modelValue'][]
  states: StateFormProps['modelValue'][]
  stateId: string
  modelValue: {
    nextStateIds: string[]
    roleId: string
  }
}
