import type { StateFormProps } from "./StateFormProps";
import type { StatusFlowRoleActionFormProps } from "./StatusFlowRoleActionFormProps";

export interface StatusFlowFormProps {
  states: StateFormProps['modelValue'][]
  stateId: string
  modelValue: {
    rules: StatusFlowRoleActionFormProps['modelValue'][]
    actions: string[]
  }
}