
export const LOGIN_ACTION = "LOGIN_ACTION";
export const loginAction = (data) => {
  return {
    type : LOGIN_ACTION,
    playload : data
  };
};
