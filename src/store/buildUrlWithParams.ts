const buildUrlWithParams = <T extends object>(url: string, params: T): string => {
  const queryParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key as keyof T];

    if (Array.isArray(value)) {
      value.forEach((item) => {
        queryParams.append(`${key}[]`, item);
      });
    } else if(value !== undefined && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  return `${url}?${queryParams.toString()}`;
};

export default buildUrlWithParams;
