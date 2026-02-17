import Papa, { ParseError, ParseResult } from 'papaparse';
import { IrrigationSolution } from '../types.ts';
import { getCsvUrl } from '../constants.tsx';

// 1. Define an interface for the raw CSV row to avoid 'any'
interface RawCsvRow {
  'Name'?: string;
  'Type of Digital technologies'?: string;
  'Water applications'?: string;
  'Short description of product'?: string;
  'Price*'?: string;
  'Figure (diff components/how it works)'?: string;
  'If smart sensors, what type are used'?: string;
  'If remote sensing'?: string;
  'Photo'?: string;
  'What it is composed of'?: string;
  'Type of irrigation'?: string;
  'Scale of use described'?: string;
  'Technological advancement'?: string;
  'Developer'?: string;
  'Documentation type'?: string;
  'Link to website(s)'?: string;
  'Date last update of website'?: string;
  'Document content'?: string;
}

const transformDriveUrl = (url: string): string => {
  if (!url) return '';
  const cleanedUrl = url.trim();
  if (cleanedUrl.includes('drive.google.com')) {
    const dMatch = cleanedUrl.match(/\/d\/([a-zA-Z0-9_-]{25,50})/);
    const idMatch = cleanedUrl.match(/[?&]id=([a-zA-Z0-9_-]{25,50})/);
    const fileId = (dMatch && dMatch[1]) || (idMatch && idMatch[1]);
    if (fileId) return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }
  return cleanedUrl;
};

export const fetchSheetData = async (): Promise<IrrigationSolution[]> => {
  try {
    const response = await fetch(getCsvUrl());
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const csvText = await response.text();
    const rawLines = csvText.split(/\r?\n/);
    
    if (rawLines.length < 3) {
      console.warn("CSV appears to be empty or missing data rows.");
      return [];
    }
    
    const dataOnlyCsv = rawLines.slice(2).join('\n');

    return new Promise((resolve, reject) => {
      // 2. Pass the interface to Papa.parse for generic typing
      Papa.parse<RawCsvRow>(dataOnlyCsv, {
        header: true,
        skipEmptyLines: true,
        complete: (results: ParseResult<RawCsvRow>) => {
          if (!results.data || results.data.length === 0) {
            resolve([]);
            return;
          }

          const mappedData: IrrigationSolution[] = results.data
            .filter((row) => row['Name'] && row['Name'].trim() !== '')
            .map((row, index) => {
              const rawPhoto = row['Photo'] || '';
              const rawFigure = row['Figure (diff components/how it works)'] || '';
              
              return {
                id: `sol-${index}`,
                name: row['Name'] || 'Untitled Solution',
                typeOfDigitalTechnologies: row['Type of Digital technologies'] || '',
                waterApplications: (row['Water applications'] || '').split(',').map(s => s.trim()).filter(Boolean),
                shortDescription: row['Short description of product'] || '',
                price: row['Price*'] || 'N/A',
                figure: transformDriveUrl(rawFigure),
                smartSensorsType: row['If smart sensors, what type are used'] || 'None',
                remoteSensing: row['If remote sensing'] || 'N/A',
                photo: transformDriveUrl(rawPhoto),
                composedOf: row['What it is composed of'] || '',
                typeOfIrrigation: (row['Type of irrigation'] || '').split(',').map(s => s.trim()).filter(Boolean),
                scaleOfUse: row['Scale of use described'] || '',
                technologicalAdvancement: row['Technological advancement'] || '',
                developer: row['Developer'] || '',
                documentationType: row['Documentation type'] || '',
                links: (row['Link to website(s)'] || '').split(',').map(s => s.trim()).filter(Boolean),
                lastUpdate: row['Date last update of website'] || '',
                documentContent: row['Document content'] || ''
              };
            });
          resolve(mappedData);
        },
        // 3. Explicitly typed error
        error: (error: Error) => {
          console.error("PapaParse error:", error);
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};