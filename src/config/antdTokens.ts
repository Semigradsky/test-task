import { AliasToken, OverrideToken } from 'antd/es/theme/interface'

export const antdTokens: Partial<AliasToken & OverrideToken> = {
  margin: 16,
  marginLG: 24,
  padding: 16,
  paddingLG: 24,

  fontSize: 14,
  lineHeight: 11/7,

  Layout: {
    siderBg: 'mintcream',
    headerBg: 'mintcream',
  },

  Menu: {
    itemBg: 'mintcream',
  }
}
