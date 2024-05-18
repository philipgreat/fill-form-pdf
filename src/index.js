import { PDFDocument,StandardFonts,rgb } from 'pdf-lib'
import embedFont from './fonts'
// These should be Uint8Arrays or ArrayBuffers
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()

const fs = require('fs');

const filePath = 'report-n2.pdf';
const bytes = fs.readFileSync(filePath);
console.log("bytes",bytes.length,typeof(bytes))
const formPdfBytes = bytes


// Load a PDF with form fields
const pdfDoc = await PDFDocument.load(formPdfBytes)

const {yaheiFont,notoFont,aliFont,ubuntuFont}=await embedFont(pdfDoc)


// Get the form containing all the fields

// Get all fields in the PDF by their names

const pages = pdfDoc.getPages()
const firstPage = pages[0]


firstPage.drawText("中文客户测试",{
  x: 180,
  y: 670,
  size: 20,
  font: yaheiFont,
  color: rgb(0,0,0),

})
firstPage.drawText("车牌号-aliFont",{
  x: 130,
  y: 525,
  size: 10,
  font: aliFont,
  color: rgb(0,0,0),

})

firstPage.drawText("车牌号-ubuntuFont",{
  x: 130,
  y: 500,
  size: 10,
  font: ubuntuFont,
  color: rgb(0,0,0),

})
firstPage.drawText("车牌号-notoFont",{
  x: 130,
  y: 480,
  size: 10,
  font: notoFont,
  color: rgb(0,0,0),

})

const pdfBytes = await pdfDoc.save()

fs.writeFileSync('gen-label.pdf',pdfBytes)

// For example, `pdfBytes` can be:
//   • Written to a file in Node
//   • Downloaded from the browser
//   • Rendered in an <iframe>