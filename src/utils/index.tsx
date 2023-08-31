export const csvToJson = (csv: any):{}[] => {
  const lines = csv.split("\n").filter((line: any) => line);
  const headers = lines
    .shift()
    .split(",")
    .map((header: string) => header.trim());

  return lines.map((line: string) => {
    const items = line.split(",").map((item: string) => item.trim());

    return headers.reduce((acc: any, key: any, index: number) => {
      return {
        ...acc,
        [key]: items[index],
      };
    }, {});
  });
};
