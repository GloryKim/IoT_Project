function getCurrentUTCDate() {
  const date = new Date(); //(10)우리는 tmp랑 hum 값만 취급했는데 여기에 date를 집어 넣고

  const year = date.getFullYear();
  const month = date.getMonth();
  const today = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds(); //(11)표준시차

  return new Date(Date.UTC(year, month, today, hours, minutes, seconds));
}

module.exports = { getCurrentUTCDate };
