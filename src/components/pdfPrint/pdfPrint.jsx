
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./pdfPrint.css";
import { IconButton } from "@mui/material";
import Printer from "../../assests/printer.png";

const PDFPrint = ({ data }) => {

    const openPdfInNewTab = async () => {
        const hiddenDiv = document.createElement("div");
        hiddenDiv.style.position = "absolute";
        hiddenDiv.style.left = "-9999px";

        // build sections manually
        let sectionsHtml = "";
        data?.section?.forEach(e => {
            let fieldsHtml = "";
            Object.keys(e.fields).forEach(key => {
                fieldsHtml += `
               <tr>
                    ${e?.label == ''
                        ? `<td style="width:50%; padding:4px;">
                                <h4 style="margin:0; font-size:14px; border-bottom:1px solid #000; display:inline-block;">
                                    ${key}:
                                </h4>
                            </td>`
                        : `<td style="font-weight:600; font-size:12px; text-align:left; width:50%; padding:4px;">
                                ${key}:
                            </td>`
                    }
                    <td style="font-weight:200; font-size:12px; text-align:left; width:50%; padding:4px;">
                        ${e.fields[key]}
                    </td>
                </tr>
                `;
            });

            sectionsHtml += `
          <div class="section">
            ${e.label ? `<h4>${e.label}</h4>` : ""}
             <table style="width:100%; border-collapse:collapse;">
      <tbody>
        ${fieldsHtml}
      </tbody>
    </table>
          </div>
        `;
        });

        // <div class="row"><span>${key}:</span> <span>${e.fields[key]}</span></div>
        hiddenDiv.innerHTML = `
      <div class="receipt">
        <div class="header">
          <div class="logo">
            <img src="${require("../../assests/Touchpoint-logo-new.png")}" alt="Logo" />
          </div>
          <div class="header-text">
            <h2>${data?.header}</h2>
          </div>
        </div>
        ${sectionsHtml}
        <div class="footer">
          <span>PROCESSING RECEIPT</span>
          <span>Powered by Qubits Informatics</span>
        </div>
      </div>
    `;

        document.body.appendChild(hiddenDiv);

        const canvas = await html2canvas(hiddenDiv, { scale: 5 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        document.body.removeChild(hiddenDiv);

        const pdfBlob = pdf.output("blob");
        const blobUrl = URL.createObjectURL(pdfBlob);
        window.open(blobUrl, "_blank");
    };



    return (
        <>
            <IconButton onClick={openPdfInNewTab} sx={{ width: '40px', margin: '0px auto' }}>
                <img src={Printer} style={{ width: '25px', height: '25px', objectFit: 'contain' }} />
            </IconButton>
        </>
    );
};

export default PDFPrint;
