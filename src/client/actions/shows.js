

export const LOAD_SHOWS_ACTION = "LOAD_SHOWS_ACTION";
export const loadShowsAction = {
  type : LOAD_SHOWS_ACTION
};

export const LOADED_SHOWS_ACTION = "LOADED_SHOWS_ACTION";
export const loadedShowsAction = (shows) => {
  return {
    type : LOADED_SHOWS_ACTION,
    payload : shows
  };
};
