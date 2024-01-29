import type { StateFormProps } from "./StateFormProps"

export interface StatusFlowRoleActionFormProps {
  states: StateFormProps['modelValue'][]
  stateId: string
  modelValue: {
    nextStateIds: string[]
    role: string
  }
}