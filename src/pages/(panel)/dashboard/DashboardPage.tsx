import { useDocumentTitle } from "@/hooks/use-document-title"
import { useAuthStore } from "@/pages/(auth)/login/login.store"
import { motion } from "motion/react"

const DashboardPage = () => {
  useDocumentTitle("Dashboard")
  console.log(useAuthStore.getState())
  return (
    <>
      {/* Tambahkan animation menggunakan motion */}
      <motion.h1 className="font-bold text-5xl mb-3"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .75, ease: "easeInOut" }}
      >Dashboard</motion.h1>
      <motion.div className="grid auto-rows-min gap-4 md:grid-cols-3"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .75, ease: "easeInOut", delay: .3 }}
      >
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </motion.div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </>
  )
}

export default DashboardPage