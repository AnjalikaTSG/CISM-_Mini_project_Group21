const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const tempDir = path.join(__dirname, '../temp');

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

function generatePDF(username, employeeNo, tempPassword) {
    return new Promise((resolve, reject) => {

        const rawPath = path.join(tempDir, `${username}_raw.pdf`);
        const securedPath = path.join(tempDir, `${username}_secured.pdf`);

        const doc = new PDFDocument();
        const stream = fs.createWriteStream(rawPath);

        doc.pipe(stream);

        doc.fontSize(18).text('Temporary Password Details');
        doc.moveDown();
        doc.fontSize(12).text(`Username: ${username}`);
        doc.text(`Temporary Password: ${tempPassword}`);
        doc.moveDown();
        doc.text('⚠ This temporary password will expire in 12 hours.');
        doc.text('Please login and change your password immediately.');

        doc.end();

        stream.on('finish', () => {
            const pdfPassword = username + employeeNo;

            const command = `qpdf --encrypt "${pdfPassword}" "${pdfPassword}" 256 -- "${rawPath}" "${securedPath}"`;

            exec(command, (error) => {
                if (error) return reject(error);

                fs.unlinkSync(rawPath); 
                resolve(securedPath);
            });
        });

        stream.on('error', reject);
    });
}

module.exports = generatePDF;
