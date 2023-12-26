<script setup lang="ts">
import { useDialog } from '@feedmepos/ui-library'
import type { FooterActionButton } from 'node_modules/@feedmepos/ui-library/dist/components/dynamic-dialog/FmDynamicDialog.vue'
import type { DialogProvider } from 'node_modules/@feedmepos/ui-library/dist/plugin/dialog-plugin'
import { ref } from 'vue'

const lastClick = ref('')
const dialog: DialogProvider = useDialog()
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
  dialog
    .open({
      title: 'hello',
      message: lastClick,
      primaryActions,
      secondaryActions,
      tertiaryActions
    })
    .onPrimary(() => {
      lastClick.value = 'Primary was clicked'
    })
    .onSecondary(() => {
      lastClick.value = 'Secondary was clicked'
    })
    .onTertiary(() => {
      lastClick.value = 'Tertiary was clicked'
    })
}

const promisifyCode = `
async function convertStock() {
      const userInput = await openDialog(
            // ...params
      )
      if (!userInput) {
            // dialog is closed
            return
      }
      await api.convertStock(userInput)
      toast.success('Success')
}

async function openDialog() {
      const dialogControl = dialog.open(
            //...params
      )

      return new Promise(res => {
            dialogControl.onPrimary(() => {
                  // validate data
                  if (data is valid) {
                        res(data)
                  } else {
                        highlight error
                  }
            }).onSecondary(() => {
                  dialogControl.close()
                  res(null)
            }).onClose(() => {
                  res(null)
            })

      })
}
`
</script>

<template>
  <div class="px-[100px] py-5 flex flex-col gap-5">
    <div class="font-bold">Close dialog API after opening</div>
    <div>
      <FmButton label="Open dialog" @click="openDialog" size="md" />
    </div>
    <div class="font-bold text-sm">Use case 1: To close the dialog only when form is valid</div>
    <div>
      Sometimes a form component is rendered inside the dialog and we only want to close the dialog
      if the required information is complete
    </div>
    <div class="font-bold text-sm">Use case 2: To promisify dialog control</div>
    <div>Promisifying code so that code flow is cleaner</div>
    <div class="text-xs">
      <highlightjs language="javascript" :code="promisifyCode" />
    </div>
  </div>
</template>
