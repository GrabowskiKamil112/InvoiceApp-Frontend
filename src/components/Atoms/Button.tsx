import styled, { css } from 'styled-components'

const Button = styled.button<{
    width?: string
    color?: string
    variant?: 'loginToggle' | 'submit' | 'back'
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
    color: white;
    text-align: center;
    position: relative;
    overflow: hidden;

    &::after {
        transition: all 0.3s ease;
        content: '';
        background-color: white;
        opacity: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: 9999;
    }

    &:hover::after {
        opacity: 0.35;
    }

    ${({ variant }) =>
        variant == 'loginToggle' &&
        css`
            color: #c55164;
            background: none;
            height: auto;
            margin-top: 5px;
            overflow: visible;
            &:hover::after {
                opacity: 0;
            }
        `};

    ${({ variant }) =>
        variant == 'submit' &&
        css`
            margin: 15px 0 30px 0;
            background-color: #c55164;
            border-radius: 4px;
            height: 30px;
            width: 100%;
            &:hover::after {
                opacity: 0.2;
            }
        `}
    ${({ variant }) =>
        variant == 'back' &&
        css`
            font-family: inherit;
            background-color: transparent;
            height: 24px;
            width: 82px;
            display: flex;
            justify-content: space-between;
            color: #fff;
            text-transform: lowercase;
            font-weight: 500;
            font-size: ${({ theme }) => theme.sizes.m};
            transition: color 0.3s ease;
            height: auto;

            &:hover {
                color: #545972;
            }
            &:hover::after {
                opacity: 0;
            }

            & span {
                display: block;
                &::first-letter {
                    text-transform: uppercase;
                }
            }
        `}
`

export default Button
