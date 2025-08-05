"use client"

import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import { saveAs } from "file-saver"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface ExportButtonsProps {
  targetId: string
  csvData: Record<string, string | number>[]
}

export function ExportButtons({ targetId, csvData }: ExportButtonsProps) {
  const exportPDF = async () => {
    const input = document.getElementById(targetId)
    if (!input) return

    const canvas = await html2canvas(input)
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save("dashboard-table.pdf")
  }

  const exportCSV = () => {
    const headers = Object.keys(csvData[0])
    const rows = csvData.map(row => headers.map(header => row[header]))
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    saveAs(blob, "dashboard-table.csv")
  }

  return (
    <div className="flex gap-2 mb-4 justify-end">
      <Button onClick={exportCSV} variant="secondary" className="flex items-center gap-1">
        <FileText className="h-4 w-4" /> CSV
      </Button>
      <Button onClick={exportPDF} variant="secondary" className="flex items-center gap-1">
        <Download className="h-4 w-4" /> PDF
      </Button>
    </div>
  )
}
