import { getIn, useFormikContext } from 'formik'
import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    & > div {
        font-size: 1.1rem;
        color: #ec5757;
        margin-bottom: 4px;
        font-weight: 700;
    }
`

type Errors = {
    [key: string]: string
}

const Errors: React.FC = () => {
    const { errors } = useFormikContext<Errors>()

    return (
        <StyledWrapper>
            {Object.values(errors).some((val) => (val as string).endsWith('required field')) && (
                <div> - All fields must be filled.</div>
            )}
            {errors['to.email']?.endsWith('incorrect') && <div> - invalid email.</div>}
            {getIn(errors, 'items_list')?.endsWith('at least 1 items') && (
                <div> - An item must be added.</div>
            )}
            {Object.values(errors).some((val) => (val as string).includes('must be a')) && (
                <div> - invalid input.</div>
            )}
        </StyledWrapper>
    )
}

export default Errors
