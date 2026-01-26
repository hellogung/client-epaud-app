import { useDocumentTitle } from '@/hooks/use-document-title'
import { motion } from "motion/react"

const SekolahPage = () => {
    useDocumentTitle("Sekolah")
    return (
        <>
            <motion.h1 className="font-bold text-5xl mb-8"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .75, ease: "easeInOut" }}
            >Sekolah</motion.h1>
        </>
    )
}

export default SekolahPage