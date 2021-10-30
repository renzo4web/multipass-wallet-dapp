export const formatError = (string) => {

  if (!string) {
    return "Error";
  }
  const idx = string.split("").findIndex(char => char === "'");

  return string.substring(idx);

};