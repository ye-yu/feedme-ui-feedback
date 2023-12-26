import DialogCloseVue from '@/views/dialog/DialogClose.vue'
import DropdownListing from '@/views/dropdown-listing/DropdownListing.vue'
import DropdownPlacementVue from '@/views/dropdown-placement/DropdownPlacement.vue'
import DropdownFixVue from '@/views/dropdown/DropdownFix.vue'
import TextFieldHelperVue from '@/views/text-field-helper/TextFieldHelper.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/dropdown-null-fix',
    component: DropdownFixVue,
    props: {
      name: '[Bug] Dropdown null fix'
    }
  },
  {
    path: '/dropdown-placement',
    component: DropdownPlacementVue,
    props: {
      name: '[Bug] Dropdown placement'
    }
  },
  {
    path: '/dropdown-listing',
    component: DropdownListing,
    props: {
      name: '[Feature] Dropdown listing'
    }
  },
  {
    path: '/dialog-close-api',
    component: DialogCloseVue,
    props: {
      name: '[Feature] Dialog Close API'
    }
  },
  {
    path: '/text-field-helper',
    component: TextFieldHelperVue,
    props: {
      name: '[Bug] Text field helper'
    }
  }
]
