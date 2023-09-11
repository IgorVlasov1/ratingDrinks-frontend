export const dateTransform = (a) => {
  if (a !== undefined) {
    let date = new Date(a);
    let formattedDate = date
      .toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
      .replace(/\./g, ":");
    return formattedDate;
  }
};
