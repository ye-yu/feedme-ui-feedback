export interface FmTextFieldProps {
  label?: string
  modelValue: any
}

export interface FmTextFieldEvents {
  (event: 'update:modelValue', mv: any): void
}
