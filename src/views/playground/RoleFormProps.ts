export interface RoleFormProps {
  modelValue: {
    name: string
    roleId: string
  }
}

export interface RoleFormEvents {
  (event: 'update:model-value', value: RoleFormProps['modelValue']): void
  (event: 'click:delete'): void
}
