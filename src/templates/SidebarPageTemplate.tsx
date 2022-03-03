import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    margin-left: 150px;
`
type Props = {
    children: React.ReactNode
}

const SidebarPageTemplate = ({ children }: Props) => <StyledWrapper>{children}</StyledWrapper>

export default SidebarPageTemplate
