
const fs = require('fs');
const fontkit = require('@pdf-lib/fontkit')
import { StandardFonts } from 'pdf-lib'

const  embedFont=async(pdfDocument)=>{
    pdfDocument.registerFontkit(fontkit)
    const yaheiFontBytes = fs.readFileSync('fonts/yahei.ttf')
    const notoFontBytes= fs.readFileSync('fonts/NotoSans-Regular.ttf')
    const aliFontBytes= fs.readFileSync('fonts/ali.ttf')
    const ubuntuFontBytes= fs.readFileSync('fonts/ubuntu.ttf')
    const helveticaFont = await pdfDocument.embedFont(StandardFonts.Helvetica)
    const yaheiFont = await pdfDocument.embedFont(yaheiFontBytes,{subset:true})
    const notoFont = await pdfDocument.embedFont(notoFontBytes,{subset:true})
    const aliFont = await pdfDocument.embedFont(aliFontBytes,{subset:true})
    const ubuntuFont = await pdfDocument.embedFont(ubuntuFontBytes,{subset:true})
    
    
    return {yaheiFont,notoFont,helveticaFont,aliFont,ubuntuFont}
}
export default embedFont

