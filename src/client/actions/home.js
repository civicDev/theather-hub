
export const LOAD_EVENTS_ACTION = "LOAD_EVENTS_ACTION";
export const loadEventsAction = {
  type : LOAD_EVENTS_ACTION
};

export const LOADED_EVENTS_ACTION = "LOADED_EVENTS_ACTION";
export const loadedEventsAction = (events) => {
  return {
    type : LOADED_EVENTS_ACTION,
    payload : events
  };
};
