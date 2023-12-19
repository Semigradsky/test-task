import { Menu } from 'antd'
import { FC } from 'react'

import { menuItems } from './menuItems'

export const AppMenu: FC = () => {
  return (
    <Menu mode='inline' defaultSelectedKeys={['4']} items={menuItems} />
  )
}
