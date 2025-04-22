import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

const ReportPage = () => {
  const location = useLocation();
  const [reportDetails, setReportDetails] = useState(null);
  const [exportFormat, setExportFormat] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (location.state) {
      const { reportDetails, exportFormat, title } = location.state;
      setReportDetails(reportDetails);
      setExportFormat(exportFormat);
      setTitle(title);
    }
  }, [location]);

  // Function to generate CSV from JSON
  const jsonToCSV = (jsonData, deviceID) => {
    if (jsonData.length === 0) {
      console.log(`No data for DeviceID: ${deviceID}`);
      return;
    }

    const headers = Object.keys(jsonData[0]);
    const csvContent = [
      headers.join(","),
      ...jsonData.map((row) =>
        headers
          .map(
            (header) =>
              `"${
                row[header] ? row[header].toString().replace(/"/g, '""') : ""
              }"`
          )
          .join(",")
      ),
    ].join("\n");

    // Create a Blob and use FileReader to encode as Base64
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      // Send Base64 data to React Native WebView for download
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "download",
          format: "csv",
          filename: `Report_${deviceID}.csv`,
          content: base64,
        })
      );

      // Trigger local download (saves the file to user's machine)
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Report_${deviceID}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    reader.readAsDataURL(blob);
  };

  // Function to generate PDF from JSON
  const generatePDF = (reportData, deviceId, startDate, endDate) => {
    const doc = new jsPDF("landscape");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;

    // Header Section
    const logoWidth = 30;
    const logoHeight = 10;

    // Add Logo (Replace with your actual logo path or base64)
    const logoBase64 = "/logo.png"; // Replace with actual logo
    doc.addImage(logoBase64, "PNG", margin, 10, logoWidth, logoHeight);

    // Title of the Report
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16); // Reduced font size for better alignment
    doc.text(`${title}`, pageWidth / 2, 20, { align: "center" }); // Use passed title here

    // Centered Start and End Dates (Dynamic based on device)
    doc.setFontSize(10); // Reduced font size for dates
    const centerText = `${startDate} To: ${endDate}`;
    doc.text(centerText, pageWidth / 2, 30, { align: "center" });

    // Current Date on the Right
    const currentDate = new Date().toLocaleDateString();
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${currentDate}`, pageWidth - margin - 30, 15);

    // Add a line below the header
    doc.setLineWidth(0.5);
    doc.line(margin, 35, pageWidth - margin, 35);

    // Table Section
    let yOffset = 45;

    if (reportData.length > 0) {
      const headers = Object.keys(reportData[0]);
      const tableWidth = pageWidth - 2 * margin;
      const cellWidth = Math.max(tableWidth / headers.length, 25); // Minimum column width

      // Add table headers
      doc.setFontSize(8); // Reduced font size for the table
      doc.setFont("Helvetica", "bold");
      headers.forEach((header, index) => {
        const xPos = margin + index * cellWidth;
        doc.text(header, xPos, yOffset, {
          maxWidth: cellWidth - 2,
          align: "left",
        });
      });

      // Draw a line below the headers
      yOffset += 5;
      doc.line(margin, yOffset, pageWidth - margin, yOffset);

      // Add data rows
      yOffset += 5;
      doc.setFont("Helvetica", "normal");
      reportData.forEach((row) => {
        let rowHeight = 0; // Keep track of row height for wrapping
        headers.forEach((header, colIndex) => {
          const xPos = margin + colIndex * cellWidth;
          const cellText = row[header]?.toString() || "";
          const wrappedText = doc.splitTextToSize(cellText, cellWidth - 2); // Wrap text within the cell width

          // Add each line of the wrapped text
          wrappedText.forEach((line, lineIndex) => {
            const lineYOffset = yOffset + lineIndex * 4; // Adjust line spacing
            doc.text(line, xPos, lineYOffset, { align: "left" });
          });

          // Calculate the height of the row based on the number of wrapped lines
          rowHeight = Math.max(rowHeight, wrappedText.length * 4);
        });

        yOffset += rowHeight; // Move to the next row

        // If content exceeds page height, add a new page
        if (yOffset > pageHeight - 20) {
          doc.addPage();
          yOffset = 20; // Reset yOffset for the new page
        }
      });
    } else {
      doc.setFontSize(14);
      doc.text("No data available for this report.", margin, yOffset);
    }

    // Convert PDF to Base64 String
    const pdfContent = doc.output("datauristring").split(",")[1];

    // Send PDF content to React Native via WebView
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "download",
        format: "pdf",
        filename: `${title}_${deviceId}.pdf`,
        content: pdfContent,
      })
    );

    // Save the PDF locally on the user's PC
    doc.save(`${title}_${deviceId}.pdf`);
  };

  return (
    <div>
      <h1>{title}</h1>
      {reportDetails ? (
        <div>
          {/* Render the report based on the details passed */}
          {exportFormat === "csv" && (
            <button onClick={() => jsonToCSV(reportDetails, title)}>
              Download CSV
            </button>
          )}
          {exportFormat === "pdf" && (
            <button onClick={() => generatePDF(reportDetails, title)}>
              Download PDF
            </button>
          )}
        </div>
      ) : (
        <p>No report data available.</p>
      )}
    </div>
  );
};

export default ReportPage;
