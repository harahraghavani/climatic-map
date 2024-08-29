export const convertObjToQueryString = (obj) => {
  return "?" + new URLSearchParams(obj).toString();
};
