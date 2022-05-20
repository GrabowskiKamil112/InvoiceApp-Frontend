import React from 'react'
import { useAppSelector } from '../../store/hooks/hooks'
import ModalTemplate from '../../templates/ModalTempalate'
import Header from '../Atoms/Header'

const UserCreatedModal: React.FC = () => {
    const username = useAppSelector((state) => state.username)
    return (
        <ModalTemplate>
            <Header size={'big'}>UserCreated: {username}</Header>
        </ModalTemplate>
    )
}

export default UserCreatedModal
