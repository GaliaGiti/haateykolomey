const url = '../pdf/New_Horizon.pdf';
var pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';


let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null;

    const scale = 1.5,
    canvas = document.querySelector('#pdf-render'),
    ctx = canvas.getContext('2d');

    //render the page
    const renderPage = num => { 

    }

    //Get document
    pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
         pdfDoc = pdfDoc_;
         //console.log(pdfDoc)
         document.querySelector('#page-count').textContent = pdfDoc.numPages;
        
    })

