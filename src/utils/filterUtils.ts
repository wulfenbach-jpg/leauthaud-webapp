export const matchInString = (fieldValue: string, selectedValues: string[]) => {
  if (selectedValues.length === 0) return true;
  return selectedValues.some(val => fieldValue.toLowerCase().includes(val.toLowerCase()));
};

export const matchInArray = (fieldArray: string[], selectedValues: string[]) => {
  if (selectedValues.length === 0) return true;
  return fieldArray.some(val => selectedValues.includes(val));
};
