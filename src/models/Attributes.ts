import { HasId } from "./Model";

export class Attributes<T extends HasId> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => this.data[key];

  set(update: T): void {
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}
