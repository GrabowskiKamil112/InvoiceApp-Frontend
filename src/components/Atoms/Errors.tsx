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

const Errors: React.FC = () => {
    const { errors } = useFormikContext()
    console.log('errors:', errors)

    return (
        <StyledWrapper>
            {Object.values(errors).some((val) => (val as string).endsWith('required')) && (
                <div> - All fields must be filled.</div>
            )}
            {getIn(errors, 'clients_email') === 'email is incorrect' && (
                <div> - invalid email.</div>
            )}
            {
                // itemlist errors
            }
        </StyledWrapper>
    )
}

export default Errors
