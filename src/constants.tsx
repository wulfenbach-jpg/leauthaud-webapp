
import { IrrigationSolution } from './types';

/**
 * CONFIGURATION: Google Sheet Data Source
 * Direct published CSV link provided by user.
 */
export const getCsvUrl = () => 
  `https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9tMcmVf75Ufi9ZvICzQl4IcbQVU6ri732gXoxgk27RY_v3HU-EPKff7kd0XoK8w/pub?gid=1106095519&single=true&output=csv`;

export const FILTER_OPTIONS = {
  digitalTechnologies: [
    'Remote sensing', 'AI', 'IoT', 'Big Data', 'Robotics', 
    'Smart Sensors', 'Blockchain', 'Autonomous Systems'
  ],
  typeOfIrrigation: ['Drip', 'Sprinkler', 'Surface', 'Universal', 'Other'],
  scaleOfUse: ['Pot', 'Garden', 'Farm'],
  techAdvancement: [
    'Planning to Design', 'Under Development', 
    'Advanced Prototypes/Proof of Concept', 'Initial Testing', 
    'Successful Testing Iterations', 'Deployment', 'Maintenance and Upgrades'
  ],
  developer: [
    'Student', 'Start-Up', 'Entrepeneurs', 'Farmworkers', 
    'Open-source Community', 'Individual', 'Other'
  ],
  documentationType: ['Written', 'Video', 'N/A'],
  documentContent: ['Components', 'Installation/Setup', 'Source Code']
};
