import { useState, useEffect, useCallback } from 'react'
import { ModalContext } from './ModalContext'

export const ModalProvider = ({ children }) => {
    const [openCount, setOpenCount] = useState(0)

    const openModal = useCallback(() => {
        setOpenCount((prev) => prev + 1)
    }, [])

    const closeModal = useCallback(() => {
        setOpenCount((prev) => Math.max(0, prev - 1))
    }, [])

    const isModalOpen = openCount > 0

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('modal-active')
        } else {
            document.body.classList.remove('modal-active')
        }
        return () => {
            document.body.classList.remove('modal-active')
        }
    }, [isModalOpen])

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
}
