export const getGender = (char) => {
  let gender;
  if (char === "M") {
    gender = "남";
  } else if (char === "F") {
    gender = "여";
  }
  return gender;
};

export const getKRW = (amount) => {
  return amount.toLocaleString("ko-KR");
};
// export const getGenderV1 = (number) => {
//   const char = number?.charAt(0);
//   let gender = "남";
//
//   if (char === "0") {
//     gender = "남";
//   } else if (char === "5") {
//     gender = "여";
//   }
//
//   return gender;
// };
