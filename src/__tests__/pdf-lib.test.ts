import { degrees, PageSizes, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import * as fs from "fs";

describe('pdf-lib', () => {

    it('should create a document', async () => {
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const size = 30

        for (let i = 0; i < 10; i++) {
            const page = pdfDoc.addPage(PageSizes.A4);
            const { width, height } = page.getSize();
            const text = `Scanned page ${i + 1} of 10`;

            const textWidth = font.widthOfTextAtSize(text, size);
            if (i % 2 == 0) {
                page.drawText(text, {
                    x: (width - textWidth) / 2,
                    y: height - 4 * size,
                    size,
                    font,
                    color: rgb(0, 0, 0.75),
                });
            } else {
                page.drawText(text, {
                    x: (width + textWidth) / 2,
                    y: 4 * size,
                    size,
                    font,
                    color: rgb(0, 0, 0.75),
                    rotate: degrees(i % 2 == 0 ? 0 : 180),
                });
            }
        }

        pdfDoc.setTitle('Test Document');
        pdfDoc.setAuthor('Richard Allwood');
        pdfDoc.setSubject('Document for testing pdf-scanner');
        pdfDoc.setKeywords([ 'test', 'pdf-scanner' ]);
        pdfDoc.setProducer('pdf-scanner test');
        pdfDoc.setCreator('pdf-lib');
        pdfDoc.setCreationDate(new Date('2021-07-02T01:03:00.000Z'));
        pdfDoc.setModificationDate(new Date());

        const bytes = await pdfDoc.save();
        fs.writeFileSync('./test-document.pdf', Buffer.from(bytes));
    });

})