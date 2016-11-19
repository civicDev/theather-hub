
export const LOGIN_ACTION = "LOGIN_ACTION";
export const loginAction = (data) => {
  return {
    type : LOGIN_ACTION,
    payload : data
  };
};


export const SAVE_PROFILE_ACTION = "SAVE_PROFILE_ACTION";
export const saveProfileAction = (payload) => {
  return {
    type : SAVE_PROFILE_ACTION,
    payload : payload
  };
}

export const SAVED_PROFILE_ACTION = "SAVED_PROFILE_ACTION";
export const savedProfileAction = (payload) => {
  return {
    type : SAVED_PROFILE_ACTION,
    payload : payload
  };
};
