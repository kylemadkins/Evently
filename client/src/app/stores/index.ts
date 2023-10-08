import { createContext, useContext } from "react";

import EventStore from "./EventStore";

type Store = {
  eventStore: EventStore;
};

export const store: Store = {
  eventStore: new EventStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
