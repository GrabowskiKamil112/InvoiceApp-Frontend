import styled, { css } from 'styled-components'
import { themeNavigator } from '../../utils/utils'

const Button = styled.button<{
    color?: string
    variant?: 'loginToggle' | 'submit' | 'back' | 'addNewItem'
    disabled?: boolean
    themeCtx?: string
}>`
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
    padding: 0;
    background-color: ${({ color }) => color};
    width: auto;
    height: 47px;
    border: none;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1.4rem;
    color: white;
    text-align: center;
    transition: background-color 0.2s ease;
    position: relative;
    overflow: hidden;
    padding: 0 24px;
    white-space: normal;
    @media (max-width: 390px) {
        height: 67px;
    }

    & > img {
        margin-right: 4px;
        transform: translateY(+10%);
    }

    ${({ disabled }) =>
        disabled &&
        css`
            cursor: default;
            &:hover::after {
                    display: none;
                }
            }
        `};

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

    ${({ variant, themeCtx }) =>
        variant == 'addNewItem' &&
        css`
            color: ${themeNavigator(`${themeCtx}.btn.secondary.text`)};
            background-color: ${themeNavigator(`${themeCtx}.btn.secondary.bg`)};
            width: 100%;
            &:hover {
                background-color: ${themeNavigator(`${themeCtx}.btn.secondary.hover`)};
                &:after {
                    opacity: 0;
                }
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
