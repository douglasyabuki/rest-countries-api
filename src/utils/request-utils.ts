export const getQueryParams = (url: string): Record<string, string> => {
  const queryString = new URL(url).searchParams;
  const params: Record<string, string> = {};

  queryString.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};
