const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');
const path = require('path');
 
async function writeExcelTest(searchText, replaceText, change, downloadPath, updatePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(downloadPath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = readExcel(worksheet, searchText); // not async
 
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(updatePath);
}
 
// This does no async work, so don't mark it async.
function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}
 
//update Mango Price to 350. 
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/PetriRyynänen/downloads/excelTest.xlsx");
 
test('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Mango';
  const updateValue = '350';
 
  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
 
  const download = page.waitForEvent('download');
  await page.locator('#downloadButton').click();
  const download_file = path.resolve(__dirname, '../data/download.xlsx');
  const update_file = path.resolve(__dirname, '../data/updated.xlsx');
  await (await download).saveAs(download_file);
 
  // ✅ Ensure the edit finishes before upload
  await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, download_file, update_file);
 
  await page.locator('#fileinput').setInputFiles(update_file);
 
  const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});