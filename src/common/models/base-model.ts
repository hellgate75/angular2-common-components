import { uuid } from '../utils/uuid';

export class Cloneable {
  id: string;
  constructor(object: any) {
    this.id = object.id               || uuid();
  }
  clone(): Cloneable {
    return new Cloneable(this);
  }
}
export interface Reversible {
  reverse(object: any): void;
}
export class ItemChange {
  key: string;
  value: any;
}
export interface ICloneableConstructor<T extends Cloneable> {
  new(object: any): T;
}
export class CloneableCreator<T extends Cloneable> {
  constructor(private newInstance: ICloneableConstructor<T>) {
  }
  getNewInstance(object: any): T {
    return new this.newInstance(object);
  }
}
export class Factory {

  static newCloneable<T extends Cloneable>(object: any, creator: CloneableCreator<T>): T {
    return creator.getNewInstance(object);
  }
}
export class SortMeta {
  id: string;
  name: string;
  sort: number;
  default: boolean;
  cortocircuit: boolean;
}
export class FormField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  subType: string;
  mapType: string;
  linkedService: string;
  linkedId: string;
  linkedDesc: string;
}
export class FormMeta {
  service: string;
  fields: FormField[];
}
export class Metadata {
  sorting: SortMeta[];
  meta: FormMeta;
}
