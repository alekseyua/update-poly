
export const deepSerche = (id, array) => {
    let result;
    const rParseArr = (id, array) => {
      array.forEach((element) => {
        if (element.children.length) {
          element.children.forEach((elChild) => {
            if (elChild.id === id) result = elChild.title;
          });
        }
        if (element.id === id) result = element.title;
      });
    };
    rParseArr(id, array);
    return result;
  };
  