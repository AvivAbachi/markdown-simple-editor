import Memento from './Memento';

export default class Originator {
  state: string;
  memento: Memento;

  constructor() {
    this.state = null;
    this.memento = null;
  }

  public set(state: string) {
    this.state = state;
  }
  public reset() {
    this.state = null;
    this.memento = null;
  }

  public save(): Memento {
    return new Memento(this.state);
  }

  public restore(memento: Memento): string {
    if (memento == null) return null;
    return memento.getState();
  }
}
