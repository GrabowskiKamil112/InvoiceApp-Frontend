import styled, { css } from 'styled-components'

const Button = styled.button<{
    width?: string
    color?: string
    variant?: 'loginToggle' | 'submit'
}>`
    cursor: pointer;
    text-decoration: none;
    padding: 0;
    background-color: ${({ color }) => color};
    width: ${({ width }) => width};
    height: 47px;
    border: none;
    border-radius: 50px;
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    align-self: center;

    ${({ variant }) =>
        variant == 'loginToggle' &&
        css`
            color: #c55164;
            background: none;
            height: auto;
            margin-top: 5px;
        `};

    ${({ variant }) =>
        variant == 'submit' &&
        css`
            margin: 15px 0 30px 0;
            background-color: #c55164;
            border-radius: 4px;
            height: 30px;
            width: 100%;
        `}
`

export default Button
