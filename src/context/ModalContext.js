import { createContext } from 'react'

export const ModalContext = createContext({
    isModalOpen: false,
    openModal: () => { },
    closeModal: () => { }
})
