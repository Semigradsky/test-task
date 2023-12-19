import { Grid, Layout } from 'antd'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  menu: ReactNode;
  header: ReactNode;
  content: ReactNode;
}

const siderWidth = 200

const Container = styled(Layout)({
  minHeight: '100vh'
})

const LeftSide = styled('div')({
  position: 'fixed',
  top: 0,
  bottom: 0,
  zIndex: 1,
  display: 'flex',
})

const RightSide = styled(Layout)<{ $fullWidth: boolean }>(({ $fullWidth }) => ({
  marginLeft: $fullWidth ? 0 : siderWidth
}))

const Content = styled(Layout.Content)(({ theme }) => ({
  margin: theme.antd.margin,
  padding: theme.antd.paddingLG,
  background: theme.antd.colorBgContainer,
  borderRadius: theme.antd.borderRadiusLG,
}))

const Footer = styled(Layout.Footer)({
  textAlign: 'center',
})

export const DefaultLayout: FC<Props> = ({
  menu,
  header,
  content,
}) => {
  const { lg } = Grid.useBreakpoint()

  return (
    <Container>
      <LeftSide>
        <Layout.Sider
          breakpoint='lg'
          collapsedWidth={0}
          width={siderWidth}
          defaultCollapsed={!lg}
        >
          {menu}
        </Layout.Sider>
      </LeftSide>
      <RightSide $fullWidth={!lg}>
        <Layout.Header>
          {header}
        </Layout.Header>
        <Content>
          {content}
        </Content>
        <Footer>
          Dmitry Semigradsky ©2023
        </Footer>
      </RightSide>
    </Container>
  )
}
