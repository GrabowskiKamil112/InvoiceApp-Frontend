import { getIn, useFormikContext } from 'formik'
import React from 'react'

const Errors: React.FC = () => {
    const { errors } = useFormikContext()
    console.log('errors:', errors)

    return (
        <div>
            {Object.values(errors).some((val) => (val as string).endsWith('required')) && (
                <div> - All fields must be filled.</div>
            )}
            {getIn(errors, 'clients_email') === 'email is incorrect' && (
                <div> - invalid email.</div>
            )}
            {
                // itemlist errors
            }
        </div>
    )
}

export default Errors
