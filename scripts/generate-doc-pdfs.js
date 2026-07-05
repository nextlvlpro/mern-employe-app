const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const docsDir = path.join(__dirname, '..', 'docs');

const htmlFiles = [
  path.join(docsDir, 'FINAL_PROJECT_REPORT.html'),
  path.join(docsDir, 'MILESTONE_PROGRESS_REPORT.html'),
  ...fs
    .readdirSync(path.join(docsDir, 'milestones'))
    .filter((file) => file.endsWith('.html'))
    .sort()
    .map((file) => path.join(docsDir, 'milestones', file))
];

async function main() {
  const browser = await chromium.launch();

  for (const htmlFile of htmlFiles) {
    const page = await browser.newPage();
    await page.goto(`file://${htmlFile.replaceAll('\\', '/')}`, { waitUntil: 'networkidle' });
    const pdfFile = htmlFile.replace(/\.html$/i, '.pdf');
    await page.pdf({
      format: 'A4',
      path: pdfFile,
      printBackground: true
    });
    await page.close();
    console.log(`Generated ${pdfFile}`);
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
