<script setup lang="ts">
import { useDialog } from '@feedmepos/ui-library'
import type { FooterActionButton } from 'node_modules/@feedmepos/ui-library/dist/components/dynamic-dialog/FmDynamicDialog.vue'
import type { DialogProvider } from 'node_modules/@feedmepos/ui-library/dist/plugin/dialog-plugin'
import { ref } from 'vue'
import FmDateRangePickerProxy from './FmDateRangePickerProxy.vue'

const dialog: DialogProvider = useDialog()
const dateRangeModel = ref({})
function openDialog() {
  const primaryActions: FooterActionButton = {
    text: 'Primary',
    close: false
  }
  const secondaryActions: FooterActionButton = {
    text: 'Secondary',
    close: false
  }
  const tertiaryActions: FooterActionButton = {
    text: 'Tertiary',
    close: false
  }
  dialog.open({
    title: 'hello',
    contentComponent: FmDateRangePickerProxy,
    contentComponentProps: {
      label: 'Pick a date range',
      modelValue: dateRangeModel.value,
      'onUpdate:modelValue': (mv: any) => (dateRangeModel.value = mv)
    },
    primaryActions,
    secondaryActions,
    tertiaryActions
  })
}
</script>

<template>
  <div class="px-[100px] py-5 flex flex-col gap-5">
    <div class="font-bold">Date range selection popup will overflow on a popup</div>
    <FmButton label="Open dialog" @click="openDialog" size="md" />
  </div>
</template>
