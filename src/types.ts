
export interface IrrigationSolution {
  id: string;
  name: string;
  typeOfDigitalTechnologies: string;
  waterApplications: string[];
  shortDescription: string;
  price: string;
  figure: string; // URL or description
  smartSensorsType: string;
  remoteSensing: string;
  photo: string;
  composedOf: string;
  typeOfIrrigation: string[];
  scaleOfUse: string;
  technologicalAdvancement: string;
  developer: string;
  documentationType: string;
  links: string[];
  lastUpdate: string;
  documentContent: string;
  typeOfBoard: string[];
  priceRange: string;
}

export interface FilterState {
  searchQuery: string;
  digitalTechnologies: string[];
  typeOfIrrigation: string[];
  scaleOfUse: string[];
  techAdvancement: string[];
  developer: string[];
  documentationType: string[];
  documentContent: string[];
  typeOfBoard: string[];
  priceRange: string[];
}
