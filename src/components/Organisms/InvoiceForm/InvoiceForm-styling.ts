import { Form } from 'formik'
import styled, { css } from 'styled-components'
import { themeNavigator } from '../../../utils/utils'

export const StyledWrapper = styled.div`
    position: fixed;
    height: 100vh;
    width: 200%;
    background-color: #00000071;
    z-index: 990;
    top: 0;
    left: 0;

    &.form-enter {
        transform: translateX(-50%);
        background-color: #00000010;
    }
    // enter to
    &.form-enter-active {
        transform: translateX(0%);
        background-color: #00000071;
        transition: transform 0.6s cubic-bezier(0.4, 0.59, 0.64, 1.1), background-color 0.6s ease;
    }

    // exit from
    &.form-exit {
        background-color: #00000071;
        transform: translateX(0%);
    }

    // exit to
    &.form-exit-active {
        transform: translateX(-50%);
        background-color: #00000001;
        transition: transform 0.6s ease, background-color 0.6s ease;
    }
`
export const StyledForm = styled(Form)<{ themectx: string }>`
    background-color: ${({ themectx }) => themeNavigator(`${themectx}.form.bg`)};
    border-radius: 0 20px 20px 0;
    padding: 56px 32px 0 166px;
    max-width: 750px;
    height: 100%;

    @media (max-width: 900px) {
        padding-left: 60px;
    }
    @media (max-width: 600px) {
        padding-left: 20px;
        padding-right: 12px;
        width: 100vw;
    }
`
export const StyledFormSection = styled.div<{ dates?: boolean }>`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 24px;

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }

    ${({ dates }) =>
        dates &&
        css`
            grid-template-columns: repeat(2, 1fr);
        `};
`
export const Div = styled.div`
    margin-top: 48px;
    height: 72%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    scroll-behavior: smooth;
    overflow-y: scroll;
    padding: 0 32px 16px 0;
    & > fieldset > legend {
        color: #7c5dfa;
        font-size: 1.2rem;
        font-weight: 900;
        margin-bottom: 24px;
    }
`
export const ButtonsContainer = styled.div<{ isEdit: boolean }>`
    height: 47px;
    flex-direction: row;
    gap: 8px;
    justify-content: right;
    margin-top: 38px;
    height: 556px;
    display: flex;
    ${({ isEdit }) =>
        !isEdit &&
        css`
            & > button:nth-child(1) {
                margin-right: auto;
            }
        `};
`
