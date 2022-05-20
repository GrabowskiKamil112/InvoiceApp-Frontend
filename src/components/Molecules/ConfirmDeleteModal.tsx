import React, { useContext } from 'react'
import PageContext from '../../context/pageContext'
import ModalTemplate from '../../templates/ModalTempalate'
import Button from '../Atoms/Button'
import Header from '../Atoms/Header'
import Paragraph from '../Atoms/Paragraph'




interface Props {
    deleteFn: () => void
    cancelFn: () => void
    invoiceId?: string
}

const ConfirmDeleteModal: React.FC<Props> = ({ deleteFn, cancelFn, invoiceId }) => {
    const { activeTheme } = useContext(PageContext)
    return (
        <ModalTemplate>          
                <Header size="medium" fontSize="2.4">
                    Confirm Deletion
                </Header>
                <Paragraph
                    themeCtx={activeTheme}>{`Are you sure you want to delete invoice ${invoiceId
                    ?.substring(0, 6)
                    .toUpperCase()}? This action cannot be undone.`}</Paragraph>
                <div>
                    <Button color="rgb(236, 87, 87)" onClick={() => deleteFn()}>
                        delete
                    </Button>
                    <Button color="rgb(37, 41, 69)" onClick={() => cancelFn()}>
                        cancel
                    </Button>
                </div>           
        </ModalTemplate>
    )
}

export default ConfirmDeleteModal
