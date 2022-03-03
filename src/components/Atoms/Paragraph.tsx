import styled from 'styled-components'

export const Paragraph = styled.p`
    color: ${({ theme }) => theme.dark.text.bodyA};
    font-size: ${({ theme }) => theme.sizes.m};
    ::first-letter {
        text-transform: uppercase;
    }
`

export default Paragraph
