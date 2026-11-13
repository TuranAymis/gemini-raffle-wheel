import { describe, expect, it } from 'vitest';
import { decodeCsv, detectDelimiter, namesFromCsv, namesFromRows, parseDelimited } from './csv';

const bytes = (text: string) => new TextEncoder().encode(text).buffer as ArrayBuffer;

describe('detectDelimiter', () => {
  it('finds comma, semicolon (Turkish Excel) and tab separators', () => {
    expect(detectDelimiter('a,b,c')).toBe(',');
    expect(detectDelimiter('Ad;Soyad;Yaş')).toBe(';');
    expect(detectDelimiter('a\tb')).toBe('\t');
    expect(detectDelimiter('tek sütun')).toBe(',');
  });
});

describe('parseDelimited', () => {
  it('keeps separators, line breaks and doubled quotes inside quoted cells', () => {
    expect(parseDelimited('"Ronaldo, Cristiano",2\r\n"Say ""Merhaba""",3')).toEqual([
      ['Ronaldo, Cristiano', '2'],
      ['Say "Merhaba"', '3'],
    ]);
  });
});

describe('namesFromCsv', () => {
  it('takes the first column and leaves out a header row, with semicolons from Turkish Excel', () => {
    expect(namesFromCsv('Ad;Soyad\nAyşe;Yılmaz\nMehmet;Demir')).toEqual(['Ayşe', 'Mehmet']);
  });

  it('works without a header row', () => {
    expect(namesFromCsv('Messi\nRonaldo\n\n')).toEqual(['Messi', 'Ronaldo']);
  });
});

describe('namesFromRows', () => {
  it('writes numbers as text and skips empty cells', () => {
    expect(namesFromRows([[1], [null], ['  Messi  ']])).toEqual(['1', 'Messi']);
  });

  it('leaves out an English or Turkish header word', () => {
    expect(namesFromRows([['Name'], ['Messi']])).toEqual(['Messi']);
    expect(namesFromRows([['İsim'], ['Pelé']])).toEqual(['Pelé']);
  });
});

describe('decodeCsv', () => {
  it('drops the byte order mark', () => {
    expect(decodeCsv(bytes('﻿Ad\r\nMessi\r\n'))).toBe('Ad\r\nMessi\r\n');
  });

  it('reads Windows-1254 (old Turkish Excel) when the bytes are not valid UTF-8', () => {
    const windows1254 = new Uint8Array([0x41, 0x79, 0xfe, 0x65]).buffer;
    expect(decodeCsv(windows1254)).toBe('Ayşe');
  });
});
