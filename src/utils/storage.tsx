export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string): any | null => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return value;
};
