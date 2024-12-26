// file: download-archives.ts

import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Zero-pad a number to a specified length. For example:
 *   zeroPad(6, 4) -> '0006'
 *   zeroPad(109, 4) -> '0109'
 */
function zeroPad(num: number, length: number): string {
  return String(num).padStart(length, '0');
}

/**
 * Download an image from the given URL and save it to the specified file path.
 */
async function downloadImage(url: string, filePath: string): Promise<void> {
  try {
    console.log(`Downloading ${url}...`);
    const response = await axios.get<ArrayBuffer>(url, {
      responseType: 'arraybuffer'
    });
    fs.writeFileSync(filePath, Buffer.from(response.data));
    console.log(`Saved => ${filePath}`);
  } catch (error) {
    console.error(`Error downloading ${url}:`, error);
  }
}

async function main() {
  let globalIndex = 1; // This will be used to name the files: 1.jpg, 2.jpg, 3.jpg, etc.

  // ---- Range 1: 1410 to 1589 (5MI0782) ----
  for (let i = 1410; i <= 1589; i++) {
    const url = `http://archivesenligne.archives-isere.fr/mdr/index.php/docnumserv/getImageVisualiseur/ST/VIG6/TOURDUPIN(LA)@9NUM_AC509_3@AD038_9NUM_5MI0782_${i}.JPG/Ti9UMTcvNTAvMjAw`;
    const fileName = `${globalIndex}.jpg`;
    const filePath = path.join(__dirname, 'assets', fileName);

    await downloadImage(url, filePath);
    globalIndex++;
  }

  // ---- Range 2: 0006 to 0109 (5MI0783) ----
  for (let i = 6; i <= 109; i++) {
    // We need to zero-pad the index to 4 digits, e.g., 0006, 0007, ... 0109
    const paddedNumber = zeroPad(i, 4);
    const url = `http://archivesenligne.archives-isere.fr/mdr/index.php/docnumserv/getImageVisualiseur/ST/VIG6/TOURDUPIN(LA)@9NUM_AC509_3@AD038_9NUM_5MI0783_${paddedNumber}.JPG/Ti9UMTcvNTAvMjAw`;
    const fileName = `${globalIndex}.jpg`;
    const filePath = path.join(__dirname, 'assets', fileName);

    await downloadImage(url, filePath);
    globalIndex++;
  }

  console.log('All downloads complete.');
}

// Execute the main function
main().catch((error) => {
  console.error('Fatal error:', error);
});
