export const dateCompare = (a) => {
  let date1 = new Date(a);
  let timeElapsed = Date.now();
  let today = new Date(timeElapsed);
  today = today.toISOString();
  let dateToday = new Date(today);
  console.log(dateToday);
  const _MS_PER_HOUR = 1000 * 60 * 60;
  const utc1 = Date.UTC(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate(),
    date1.getHours(),
    date1.getMinutes()
  );
  const utc2 = Date.UTC(
    dateToday.getFullYear(),
    dateToday.getMonth(),
    dateToday.getDate(),
    dateToday.getHours(),
    dateToday.getMinutes()
  );
  let compared = Math.floor((utc2 - utc1) / _MS_PER_HOUR);
  return compared <= 0;
};
// let date1 = "2023-03-30T18:42:36.604Z";
// const utc1 = new Date(date1);

// console.log(utc1);
// const isoStr = new Date().toISOString();
// console.log(isoStr);
// console.log(utc1 != isoStr);
