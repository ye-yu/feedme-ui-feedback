export interface FmDateRangePickerProps {
  label?: string
  modelValue: any
}

export interface FmDateRangePickerEvents {
  (event: 'update:modelValue', mv: any): void
}
