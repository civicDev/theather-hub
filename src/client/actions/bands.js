
export const LOAD_BANDS_ACTION = "LOAD_BANDS_ACTION";
export const loadBandsAction = {
  type : LOAD_BANDS_ACTION
};

export const LOADED_BANDS_ACTION = "LOADED_BANDS_ACTION";
export const loadedBandsAction = (bands) => {
  return {
    type : LOADED_BANDS_ACTION,
    payload : bands
  };
};
