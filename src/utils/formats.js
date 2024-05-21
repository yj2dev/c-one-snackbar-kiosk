import dayjs from "dayjs";

export const nowDate = (date) => {
  const now = new Date();
  const past = new Date(date);

  const nowUTC = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  const pastUTC = new Date(past.getTime() + past.getTimezoneOffset() * 60000);

  const diffInSeconds = Math.floor((nowUTC - pastUTC) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    return `${diffInDays}일 전`;
  }
};

export const formatKR = (date) => {
  const inputDate = dayjs(date);
  return inputDate.format("YYYY년 MM월 DD일 HH시 mm분");
};

export const getGender = (char) => {
  let gender;
  if (char === "M") {
    gender = "남";
  } else if (char === "F") {
    gender = "여";
  }
  return gender;
};

export const getKRW = (price) => {
  if (!price) return;
  return price.toLocaleString("ko-KR");
};
