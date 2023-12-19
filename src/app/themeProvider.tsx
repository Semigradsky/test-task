import { ThemeProvider } from 'styled-components'
import { theme } from 'antd'
import { PropsWithChildren } from 'react'

export const StyledThemeProvider = ({ children }: PropsWithChildren) => {
  const { token } = theme.useToken()

  return (
    <ThemeProvider theme={{ antd: token }}>
      {children}
    </ThemeProvider>
  )
};
