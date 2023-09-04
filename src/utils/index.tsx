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

export const replaceAllObjKeys = (
  obj: any,
  getNewKey: (arg0: string) => any
) => {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      replaceAllObjKeys(obj[i], getNewKey);
    }
  } else if (typeof obj === "object") {
    for (const key in obj) {
      const newKey = getNewKey(key);
      if (newKey) obj[newKey] = obj[key];
      if (key !== newKey) {
        delete obj[key];
      }
      replaceAllObjKeys(obj[newKey], getNewKey);
    }
  }

  return obj;
};

export const createChildrenPath = (obj: {}[], prefixPath='') => {
  let payload:any = {}
  obj.forEach((o:any)=>{
    //if leaf node only enter the name not overall
    o.children.length ? payload[o['id']] = `${prefixPath}${o['name']} - Overall`: payload[o['id']] = `${prefixPath}${o['name']}`;
    if(o.children.length) payload = {...payload, ...createChildrenPath(o.children, `${prefixPath}${o['name']} - `)}
  })
  return payload;
};