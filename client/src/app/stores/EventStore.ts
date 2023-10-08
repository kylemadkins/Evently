import { makeAutoObservable, runInAction } from "mobx";

import { Event as IEvent } from "../types/Event";
import { api } from "../api";

export default class EventStore {
  events = new Map<string, IEvent>();
  loading = false;
  saving = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadEvents = async () => {
    this.setLoading(true);
    try {
      const res = await api.Events.list();
      res.data.forEach((event) => {
        this.setEvent(event);
      });
    } catch (err) {
      console.log(err);
    }
    this.setLoading(false);
  };

  loadEvent = async (id: string) => {
    let event = this.events.get(id);
    if (!event) {
      this.setLoading(true);
      try {
        const res = await api.Events.details(id);
        this.setEvent(res.data);
        event = res.data;
      } catch (err) {
        console.log(err);
      }
      this.setLoading(false);
    }
    return event;
  };

  get eventsByDate() {
    return [...this.events.values()].sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date),
    );
  }

  setEvent = (event: IEvent) => {
    event.date = event.date.split("T")[0];
    this.events.set(event.id, event);
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  createEvent = async (event: IEvent) => {
    this.saving = true;
    try {
      await api.Events.create(event);
      this.events.set(event.id, event);
    } catch (err) {
      console.log(err);
    }
    runInAction(() => (this.saving = false));
  };

  updateEvent = async (event: IEvent) => {
    this.saving = true;
    try {
      await api.Events.update(event);
      this.events.set(event.id, event);
    } catch (err) {
      console.log(err);
    }
    runInAction(() => (this.saving = false));
  };

  deleteEvent = async (id: string) => {
    this.saving = true;
    try {
      await api.Events.delete(id);
      this.events.delete(id);
    } catch (err) {
      console.log(err);
    }
    runInAction(() => (this.saving = false));
  };
}
