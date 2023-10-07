import axios from "axios";

import { Event as IEvent } from "../types/Event";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.response.use(async (res) => {
  try {
    await sleep(1000);
    return res;
  } catch (err) {
    return await Promise.reject(err);
  }
});

axios.defaults.baseURL = "http://localhost:5000/api";

const Events = {
  list: () => axios.get<IEvent[]>("/events"),
  details: (id: string) => axios.get<IEvent>(`/events/${id}`),
  create: (event: IEvent) => axios.post("/events", event),
  update: (event: IEvent) => axios.put(`/events/${event.id}`, event),
  delete: (id: string) => axios.delete(`/events/${id}`),
};

export const api = {
  Events,
};
