



const pdfjsLib = await import('pdfjs-dist/build/pdf.mjs');

// Function to extract text from a page
async function extractTextFromPage(pdf, pageNum) {
  const page = await pdf.getPage(pageNum);
  const tokenizedText = await page.getTextContent();
  const pageText = tokenizedText.items.map(token => token.str).join('');
  return pageText;
}

// Loading a PDF and extracting all its text
async function getAllTextFromPDF(pdfPath) {
  const loadingTask = pdfjsLib.getDocument(pdfPath);
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  console.log({numPages})
  const allText = [];

  for (let i = 1; i <= numPages; i++) {
    //const pageText = await extractTextFromPage(pdf, i);
    const page = await pdf.getPage(i);
    const text= await page.getTextContent();
    const items=await text.items
    
  }

  return allText.join('\n');
}

// Replace 'path/to/document.pdf' with the actual PDF file path
const pdfPath = 'report-n2.pdf';

const text=await getAllTextFromPDF(pdfPath)

console.log("text==========>"+text)

