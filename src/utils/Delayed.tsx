import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

interface Props {
    waitBeforeShow: number
    children: React.ReactNode
}
const Delayed = ({ children, waitBeforeShow }: Props): React.ReactNode => {
    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setHidden(!hidden)
        }, waitBeforeShow)
    }, [])

    return hidden ? '' : children
}

Delayed.propTypes = {
    waitBeforeShow: PropTypes.number.isRequired,
}

export default Delayed
