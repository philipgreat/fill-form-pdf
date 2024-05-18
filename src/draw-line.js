import { PDFDocument,StandardFonts,rgb } from 'pdf-lib'

// These should be Uint8Arrays or ArrayBuffers
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()

const fs = require('fs');
const fontkit = require('@pdf-lib/fontkit')
const filePath = 'report-n2.pdf';
const bytes = fs.readFileSync(filePath);
console.log("bytes",bytes.length,typeof(bytes))
const formPdfBytes = bytes


// Load a PDF with form fields
const pdfDoc = await PDFDocument.load(formPdfBytes)
pdfDoc.registerFontkit(fontkit)
const fontBytes = fs.readFileSync('fonts/yahei.ttf')
const notoFontBytes= fs.readFileSync('fonts/noto.ttf')
const yahei = await pdfDoc.embedFont(fontBytes,{subset:true})
const notoFont = await pdfDoc.embedFont(notoFontBytes,{subset:true})

const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
// Get the form containing all the fields
const form = pdfDoc.getForm()
const fields = form.getFields()

// Get all fields in the PDF by their names

const pages = pdfDoc.getPages()
const firstPage = pages[0]


const height=firstPage.getHeight()
const width=firstPage.getWidth();
for(let i=0;i<width;i+=20){

  firstPage.drawLine({
    start: { x: i, y: 0 },
    end: { x: i, y: height },
    thickness: 0.1,
    color: rgb(0.75, 0.2, 0.2),
    opacity: 0.75,
  })
  firstPage.drawText(i+"",{
    x: i,
    y: height-20,
    size: 5,
    font: helveticaFont,
    color: rgb(0,0,0),

  })
  firstPage.drawText(i+"",{
    x: i,
    y: 20,
    size: 5,
    font: helveticaFont,
    color: rgb(0,0,0),

  })
}

for(let i=0;i<height;i+=20){

  firstPage.drawLine({
    start: { x: 0, y: i },
    end: { x: width, y: i },
    thickness: 0.1,
    color: rgb(0.75, 0.2, 0.2),
    opacity: 0.75,
  })
  firstPage.drawText(i+"",{
    x: 0,
    y: i,
    size: 5,
    font: yahei,
    color: rgb(0,0,0),

  })
  firstPage.drawText(i+"",{
    x: width-40,
    y: i,
    size: 5,
    font: helveticaFont,
    color: rgb(0,0,0),

  })



}

firstPage.drawText("中文客户测试",{
  x: 180,
  y: 670,
  size: 20,
  font: notoFont,
  color: rgb(0,0,0),

})
firstPage.drawText("车牌号",{
  x: 130,
  y: 525,
  size: 20,
  font: notoFont,
  color: rgb(0,0,0),

})
const pdfBytes = await pdfDoc.save()

fs.writeFileSync('gen-label.pdf',pdfBytes)

// For example, `pdfBytes` can be:
//   • Written to a file in Node
//   • Downloaded from the browser
//   • Rendered in an <iframe>