import styled from "styled-components"
import { themeNavigator } from "../../../utils/utils"

export const StyledWrapper = styled.section<{ themeCtx: string }>`
    width: 100%;
    margin: auto;
    background-color: ${({ themeCtx }) => themeNavigator(`${themeCtx}.invoiceItem.bg`)};
    padding: 24px;
    border-radius: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr auto;
    grid-template-areas:
        'title title from'
        'dates to email'
        'items items items';

    @media (max-width: 750px) {
        row-gap: 20px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(1fr, 4) auto;
        grid-template-areas:
            'title .'
            'from .'
            'dates to'
            'email email'
            'items items';
    }
`
export const Title = styled.div`
    grid-area: title;

    & p {
        margin-top: 6px;
    }
    @media (max-width: 750px) {
        & h2 {
            font-size: 14px;
        }
    }

    & h2 span {
        color: rgb(126, 136, 195);
    }
`
export const Address1 = styled.address`
    display: flex;
    flex-direction: column;
    grid-area: from;
    justify-items: end;
    & p {
        text-align: right;
        display: block;
        margin-bottom: 4px;
        float: right;
    }
    @media (max-width: 750px) {
        justify-self: start;
        & p {
            text-align: left;
        }
    }
`
export const Address2 = styled.address`
    display: flex;
    flex-direction: column;
    grid-area: to;
    justify-items: end;
    & h2 {
        margin: 8px 0 6px 0;
    }

    & p {
        margin-bottom: 4px;
        display: block;
        float: right;
    }
`
export const Dates = styled.div`
    padding-bottom: 20px;
    grid-area: dates;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & p {
        margin-bottom: 6px;
    }
`
export const Email = styled.div`
    grid-area: email;
    & p {
        margin-bottom: 8px;
    }
`