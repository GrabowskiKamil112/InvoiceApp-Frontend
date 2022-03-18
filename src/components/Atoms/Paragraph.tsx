import styled from 'styled-components'

const Paragraph = styled.p`
    color: ${({ theme }) => theme.dark.text.bodyA};
    font-size: ${({ theme }) => theme.sizes.m};
    text-shadow: 0px 0px 1px #ffffff;
    ::first-letter {
        text-transform: uppercase;
    }
`

export default Paragraph
