import DropdownListing from '@/views/dropdown-listing/DropdownListing.vue'
import DropdownPlacementVue from '@/views/dropdown-placement/DropdownPlacement.vue'
import DropdownFixVue from '@/views/dropdown/DropdownFix.vue'
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
  }
]
