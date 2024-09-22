const buildIdForTag = <T>(myObject: T): string => {
    const sortKeys = (obj: any): any => {
      if (obj === null || typeof obj !== 'object') {
        return obj; 
      }
      if (Array.isArray(obj)) {
        return obj.map(sortKeys); 
      }
      return Object.keys(obj)
        .sort() // Sort the keys
        .reduce((sortedObj, key) => {
          sortedObj[key] = sortKeys(obj[key]); 
          return sortedObj;
        }, {} as any);
    };
  
    return JSON.stringify(sortKeys(myObject)); 
  };

  export default buildIdForTag;