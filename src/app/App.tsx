import { FC } from 'react'
import { ConfigProvider } from 'antd'

import { AppMenu } from 'features/menu'
import { PersonsList } from 'features/persons-list'
import { DefaultLayout } from 'layouts/default'
import { antdTokens } from 'config/antdTokens'

import { StyledThemeProvider } from './themeProvider'

const App: FC = () => {
  return (
    <ConfigProvider theme={{ token: antdTokens }}>
      <StyledThemeProvider>
        <DefaultLayout
          menu={<AppMenu />}
          header={null}
          content={<PersonsList />}
        />
      </StyledThemeProvider>
    </ConfigProvider>
  )
}

export default App
