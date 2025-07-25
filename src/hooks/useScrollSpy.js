import { useEffect, useState } from 'react'

export default function useScrollSpy(sectionIds, offset = 100) {
    const [activeId, setActiveId] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + offset

            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const section = document.getElementById(sectionIds[i])
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveId(sectionIds[i])
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [sectionIds, offset])

    return activeId
}
