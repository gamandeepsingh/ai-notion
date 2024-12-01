import LiveblocksProviderWrapper from '@/components/LiveblocksProvider'

const PageLayout = ({Children}:{
    Children: React.ReactNode
}) => {
  return (
    <LiveblocksProviderWrapper>
      {Children}
    </LiveblocksProviderWrapper>
  )
}

export default PageLayout
