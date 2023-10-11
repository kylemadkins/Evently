import axios, { AxiosError, AxiosResponse } from "axios";

import { Event as IEvent } from "../types/Event";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.response.use(
  async (res) => {
    await sleep(500);
    return res;
  },
  (err: AxiosError) => {
    if (err.response) {
      const { status, config, data } = err.response as AxiosResponse;
      switch (status) {
        case 404:
          window.location.href = "/404";
          break;
        case 400:
          if (config.method === "get" && data.errors.hasOwnProperty("id")) {
            window.location.href = "/404";
          }
          break;
        default:
          break;
      }
    }
    return Promise.reject(err);
  },
);

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
