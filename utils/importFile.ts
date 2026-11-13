import readXlsxFile from 'read-excel-file/browser';
import { decodeCsv, namesFromCsv, namesFromRows } from './csv';

/** Thrown for a file type that cannot be read. The screen shows its own message for it. */
export class UnsupportedFileError extends Error {}

/** The names in a .csv or .xlsx file, read in the browser: nothing is uploaded anywhere. */
export async function namesFromFile(file: File): Promise<string[]> {
  const name = file.name.toLowerCase();
  // An Excel file is read from its first sheet.
  if (name.endsWith('.xlsx')) return namesFromRows((await readXlsxFile(file))[0]?.data ?? []);
  if (name.endsWith('.csv')) return namesFromCsv(decodeCsv(await file.arrayBuffer()));
  throw new UnsupportedFileError('Unsupported file');
}
