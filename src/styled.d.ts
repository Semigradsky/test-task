import { GlobalToken } from 'antd'

declare module 'styled-components' {
  export interface DefaultTheme {
    antd: GlobalToken;
  }
}
