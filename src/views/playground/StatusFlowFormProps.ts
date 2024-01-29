import type { RoleFormProps } from './RoleFormProps'
import type { StateFormProps } from './StateFormProps'
import type { StatusFlowRoleActionFormProps } from './StatusFlowRoleActionFormProps'

export interface StatusFlowFormProps {
  roles: RoleFormProps['modelValue'][]
  states: StateFormProps['modelValue'][]
  stateId: string
  modelValue: {
    rules: StatusFlowRoleActionFormProps['modelValue'][]
    actions: string[]
  }
}
