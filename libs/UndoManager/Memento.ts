export default class Memento {
  state: string;
  constructor(state: string) {
    this.state = state;
  }

  public getState(): string {
    return this.state;
  }
}
