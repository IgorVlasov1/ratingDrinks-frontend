export const JsonTransform = (arr, userid) => {
  try {
    let arr2 = arr;
    let parsedArray = arr2.map((el) => JSON.parse(el));
    let finder = parsedArray.find((e) => e.id == userid);
    if (finder == undefined) {
      return false;
    } else {
      return finder.vote;
    }
  } catch (e) {
    console.log(e);
  }
};
