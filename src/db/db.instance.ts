class DbInstance {
  private items: any[];
  private idCounter: number;

  constructor(items = []) {
    this.items = items;
    this.idCounter = 0;
  }

  private getIndex(id: number): number {
    return this.items.findIndex((item) => item.id === id);
  }

  public getAll<T>(): T[] {
    return this.items;
  }

  public create<T>(payload: Partial<T>) {
    const id = this.idCounter;
    this.idCounter += 1;

    const newItem = {
      id,
      ...payload,
    };
    this.items.push(newItem);
    return newItem as T ;
  }

  public getById<T>(id: number): T | null {
    const item = this.items[this.getIndex(id)];

    return item || null;
  }

  public deleteById(id: number): boolean {
    const index = this.getIndex(id);
    if (index > -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  public editById<T>(id: number, payload: Partial<T>) {
    const index = this.getIndex(id);
    if (index > -1) {
      const updatedItem = {
        ...this.items[index],
        ...payload,
      };
      this.items[index] = updatedItem;

      return updatedItem as T;
    }

    return null;
  }
}

export default DbInstance;
