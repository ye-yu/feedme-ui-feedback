import ChipNotExpandableVue from '@/views/chip-not-expandable/ChipNotExpandable.vue'
import DateRangeTooBigVue from '@/views/date-range-too-big/DateRangeTooBig.vue'
import DialogCloseVue from '@/views/dialog/DialogClose.vue'
import DropdownListing from '@/views/dropdown-listing/DropdownListing.vue'
import DropdownPlacementVue from '@/views/dropdown-placement/DropdownPlacement.vue'
import DropdownFixVue from '@/views/dropdown/DropdownFix.vue'
import FmPlaygroundVue from '@/views/playground/FmPlayground.vue'
import TextFieldHelperVue from '@/views/text-field-helper/TextFieldHelper.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/0-0-23-bugs',
    component: ChipNotExpandableVue,
    props: {
      name: '[Bug] 0.0.23 Bugs'
    }
  },

  {
    path: '/dropdown-null-fix',
    component: DropdownFixVue,
    props: {
      name: '[Bug] Dropdown null fix',
      addressed: true
    }
  },
  {
    path: '/dropdown-placement',
    component: DropdownPlacementVue,
    props: {
      name: '[Bug] Dropdown placement',
      addressed: true
    }
  },
  {
    path: '/dropdown-listing',
    component: DropdownListing,
    props: {
      name: '[Feature] Dropdown listing',
      addressed: true
    }
  },
  {
    path: '/dialog-close-api',
    component: DialogCloseVue,
    props: {
      name: '[Feature] Dialog Close API',
      addressed: true
    }
  },
  {
    path: '/text-field-helper',
    component: TextFieldHelperVue,
    props: {
      name: '[Bug] Text field helper',
      addressed: true
    }
  },
  {
    path: '/date-range-too-big',
    component: DateRangeTooBigVue,
    props: {
      name: '[Bug] Date range too big',
      addressed: true
    }
  },
  {
    path: '/playground',
    component: FmPlaygroundVue,
    props: {
      name: 'Playground'
    }
  }
]
