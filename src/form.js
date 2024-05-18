import { PDFDocument,StandardFonts,rgb } from 'pdf-lib'

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


// Get the form containing all the fields
const form = pdfDoc.getForm()
const fields = form.getFields()
fields.forEach(field => {
    const type = field.constructor.name
    const name = field.getName()
    console.log(`${type}: '${name}'`)

  })
// Get all fields in the PDF by their names
const nameField = form.getTextField('client')

const pages = pdfDoc.getPages()
const firstPage = pages[0]
const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
firstPage.drawText('This text was added with JavaScript!', {
    x: 5,
    y: 500,
    size: 20,
    font: helveticaFont,
    color: rgb(0,0,0),

  })
   const textContent = await pdfDoc.extractText();
  //const textContent = await pdfDoc.getTextContent();

  // Extract individual text items:
  textContent.items.forEach(item => {

    console.log(item)


  });

// Fill in the basic info fields
nameField.setText('12312123')
// nameField.enableCombing();
const [ widget ]= nameField.acroField.getWidgets();
  //console.log("W:::"+widget.getOrCreateBorderStyle);
widget.getOrCreateBorderStyle().setWidth(0); // trying to restore border
// form.flatten({ updateFieldAppearances: true });
form.flatten();
// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()

fs.writeFileSync('gen-label.pdf',pdfBytes)

// For example, `pdfBytes` can be:
//   • Written to a file in Node
//   • Downloaded from the browser
//   • Rendered in an <iframe>
