import { AxiosPromise } from "axios";
import { UserProps } from "./User";

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: Function): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {}

  get get(): Function {
    return this.attributes.get;
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  get on(): Function {
    return this.events.on;
  }

  get trigger(): Function {
    return this.events.trigger;
  }

  fetch(): void {
    const id = this.get("id");

    if (!id) throw new Error("Cannot fetch without an id");

    this.sync.fetch(id).then((response) => this.set(response.data));
  }

  save(): void {
    const allData = this.attributes.getAll();
    this.sync
      .save(allData)
      .then(() => this.trigger("save"))
      .catch(() => this.trigger("error"));
  }
}
