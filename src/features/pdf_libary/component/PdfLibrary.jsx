import React from 'react';
import '../css/PdfLibrary.css';
import pdfIcon from '../../../app/assets/pdf.png';
import downloadIcon from '../../../app/assets/download.png';
import usePdfList from '../hooks/usePdfList';
import PdfCardSkeleton from './PdfCardSkeleton'; // 🆕

const PdfLibrary = () => {
    const { pdfs, loading } = usePdfList(); // 🆕

    const handleDownload = (url, title) => {
        const link = document.createElement('a');
        link.href = `${process.env.REACT_APP_UPLOADS_URL}${url.split('/').pop()}`;
        link.download = title + '.pdf';
        link.target = '_blank';
        link.click();
    };

    return (
        <div className="pdf-library">
            <h2>PDF Library</h2>
            <div className="pdf-grid">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => <PdfCardSkeleton key={i} />)
                    : pdfs.map((pdf) => (
                        <div className="pdf-card" key={pdf._id}>
                            <div className="pdf-info">
                                <img src={pdfIcon} alt="PDF" className="pdf-icon" />
                                <span className="pdf-title">{pdf.title}</span>
                            </div>
                            <img
                                src={downloadIcon}
                                alt="Download"
                                className="download-icon"
                                onClick={() => handleDownload(pdf.url, pdf.title)}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default PdfLibrary;
