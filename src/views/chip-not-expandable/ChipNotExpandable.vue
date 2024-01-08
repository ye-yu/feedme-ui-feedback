<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import FM_TABLE_PAGINATION_OPTIONS from '@/views/chip-not-expandable/assets/fm-table-pagination-options.png'
import FM_TABLE_PAGINATION_INVENTORY_PORTAL from '@/views/chip-not-expandable/assets/fm-table-in-inventory-portal.png'
import FM_TABLE_PAGINATION_INVENTORY_PORTAL_CONSOLE from '@/views/chip-not-expandable/assets/fm-table-in-inventory-portal-console.png'
interface ItemData {
  Item: string
  Code: string
  Quantity: number
  Price: number
}
const data: ItemData[] = [
  {
    Item: 'Widget',
    Code: 'W123',
    Quantity: 10,
    Price: 12.99
  },
  {
    Item: 'Gadget',
    Code: 'G456',
    Quantity: 5,
    Price: 24.99
  },
  {
    Item: 'Doodad',
    Code: 'D789',
    Quantity: 8,
    Price: 8.5
  }
  // Add more items as needed
]
const columnDefs: ColumnDef<ItemData>[] = [
  {
    accessorKey: 'Item'
  },
  {
    accessorKey: 'Code'
  },
  {
    accessorKey: 'Quantity'
  },
  {
    accessorKey: 'Price'
  }
]
</script>

<template>
  <div class="px-[100px] py-5 flex flex-col gap-5">
    <div class="font-bold">Tiny UI Bugs 0.0.23</div>
    <div class="flex flex-col gap-3">
      <div class="text-sm font-bold">
        # 1. Chip content has fixed size and simplifies to ellipsis
      </div>
      <FmChip label="24 DEC 2023 - 08 JAN 2024" icon="calendar_month" />
      <FmChip label="24 DEC 2023 - 08 JAN 2024" icon="calendar_month" style="width: 30rem" />
    </div>
    <div class="flex flex-col gap-3 mt-5">
      <div class="text-sm font-bold">
        # 2. Pagination dropdown hidden behind headers (zoom in browser to see effect)
      </div>
      <div class="w-[20rem] border px-1 py-1 rounded">
        <img :src="FM_TABLE_PAGINATION_OPTIONS" alt="FmTable pagination option overflow" />
      </div>
      <div>
        <FmTable :row-data="data" :column-defs="columnDefs"></FmTable>
      </div>
    </div>
    <div class="flex flex-col gap-3 mt-5">
      <div class="text-sm font-bold">
        # 3. Pagination dropdown seems broken if applied in inventory-portal
      </div>
      <div>
        uhhh this one honestly i dunno how same code but different appearance, but removing 'flex
        flex-col' seemed work
      </div>
      <div class="w-[20rem] border px-1 py-1 rounded">
        <img
          :src="FM_TABLE_PAGINATION_INVENTORY_PORTAL"
          alt="FmTable pagination in inventory portal"
        />
      </div>
      <div class="w-[20rem] border px-1 py-1 rounded">
        <img
          :src="FM_TABLE_PAGINATION_INVENTORY_PORTAL_CONSOLE"
          alt="FmTable pagination in inventory portal console output"
        />
      </div>
    </div>
  </div>
</template>
