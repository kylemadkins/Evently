import axios from "axios";

import { Event as IEvent } from "../types/Event";

axios.defaults.baseURL = "http://localhost:5000/api";

const Events = {
  list: () => axios.get<IEvent[]>("/events"),
};

export const api = {
  Events,
};
