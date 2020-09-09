//Memento Pattern by bjarneo https://github.com/bjarneo/memento-pattern-example

import Originator from './Originator';
import Memento from './Memento';

export default class Caretaker {
  index: number;
  states: Memento[];
  originator: Originator;

  constructor() {
    this.index = 0;
    this.states = [];
    this.originator = new Originator();
  }

  public set(state: string) {
    let currentStateText = this.originator.restore(this.states[this.index]);
    if (currentStateText == state) {
      return;
    }
    this.originator.set(state);
    this.states.push(this.originator.save());
    this.index = this.states.length - 1;
  }

  public setObjJson(state: any) {
    this.set(JSON.stringify(state || {}));
  }

  public undo(): string {
    console.log('undo');
    if (!this.states.length) {
      return;
    }

    if (this.index > 0) {
      this.index -= 1;
    }

    let state = this.states[this.index];
    return this.originator.restore(state);
  }

  public redo(): string {
    console.log('redo');
    if (!this.states.length) {
      return;
    }

    if (this.index < this.states.length - 1) {
      this.index += 1;
    }

    let state = this.states[this.index];
    return this.originator.restore(state);
  }

  public reset() {
    this.index = 0;
    this.states = [];
    this.originator.reset();
  }

  public count(): number {
    return this.states.length;
  }
}
