import React from 'react';
import '../css/PdfLibrary.css';
import pdfIcon from '../../assets/pdf.png';
import downloadIcon from '../../assets/download.png';

const pdfList = [
    { title: "Constitution of Nepal 2072" },
    { title: "Civil code" },
    { title: "Criminal Code" },
    { title: "Land & property" },
    { title: "Tax" },
];

const PdfLibrary = () => {
    return (
        <div className="pdf-library">
            <h2>PDF Library</h2>
            <div className="pdf-grid">
                {pdfList.map((pdf, index) => (
                    <div className="pdf-card" key={index}>
                        <div className="pdf-info">
                            <img src={pdfIcon} alt="PDF" className="pdf-icon" />
                            <span className="pdf-title">{pdf.title}</span>
                        </div>
                        <img src={downloadIcon} alt="Download" className="download-icon" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PdfLibrary;
