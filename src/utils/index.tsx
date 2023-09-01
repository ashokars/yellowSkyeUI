export const csvToJson = (csv: any, customKey: string[] = []): {}[] => {
  const lines = csv.split("\n").filter((line: any) => line);
  const headers = lines
    .shift()
    .split(",")
    .map((header: string) => header.trim());

  return lines.map((line: string) => {
    const items = line.split(",").map((item: string) => item.trim());

    return headers.reduce((acc: any, key: any, index: number) => {
      return customKey[index]
        ? {
            ...acc,
            [customKey[index]]: items[index],
          }
        : {
            ...acc,
            [key]: items[index],
          };
    }, {});
  });
};
