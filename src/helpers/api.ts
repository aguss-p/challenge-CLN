export const sortData = (
  by: string,
  type: "asc" | "desc",
  data: Array<any>
) => {
  if (type == "desc") {
    return data.sort((a: any, b: any) => b[by] + a[by]);
  } else {
    return data.sort((a: any, b: any) => a[by] - b[by]);
  }
};

export const dataPagination = (
  page: number,
  perPage: number,
  data: Array<any>
) => {
  const start = (page - 1) * Number(perPage);
  const end = start + Number(perPage);

  return data.slice(start, end);
};

export const fetchData = async (apiUrl: string) => {
  try {
    const response = await fetch(apiUrl);
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
