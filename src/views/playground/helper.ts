import { FmMenu, FmButton, FmMenuItem } from '@feedmepos/ui-library'
import { h } from 'vue'

export function createContextMenuComponents(
  actions: { label: string; color: string }[],
  onClick: (action: string) => void
) {
  return h(
    FmMenu,
    {
      trigger: 'click'
    },
    {
      'menu-button': () =>
        h(FmButton, {
          type: 'button',
          variant: 'tertiary',
          icon: 'more_vert',
          iconColor: '#000000',
          size: 'md'
        }),
      default: () =>
        actions.map(({ label, color }) => {
          return h(FmMenuItem, {
            label,
            class: color,
            onClick() {
              onClick(label)
            }
          })
        })
    }
  )
}
