
const Format = {
  DateTime_toStr(date: Date): string {
    date = new Date(date);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = date.getDate();
    const hour = ("0" + date.getHours()).slice(-2);
    const min = ("0" + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hour}:${min}`;
  }
};

export default Format;
