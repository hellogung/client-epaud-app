import { useEffect } from "react"

export const useDocumentTitle = (title: string | null = null) => {
    useEffect(() => {
        // Buat ketika memasukan parameter title, maka format title menjadi "Title - Epaud Application"
        // Tapi kalau tidak ada title, maka title menjadi "Epaud Application"
        if (title) {
            document.title = `${title} - Epaud Application`
        } else {
            document.title = "Epaud Application"
        }
    }, [title])
}

// Penggunaan di komponen:
// function Dashboard() {
//   useDocumentTitle('Dashboard - My App');
  
//   return <div>Dashboard Content</div>;
// }