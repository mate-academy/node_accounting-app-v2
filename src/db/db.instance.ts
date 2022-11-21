class DbInstance {
  private items: any[];
  private idCounter: number;

  constructor(items = []) {
    this.items = items;
    this.idCounter = 0;
  }

  private getItemIndex(id: number): number {
    const index = this.items.findIndex((item) => item.id === id);
    return index;
  }

  public getAll() {
    return this.items;
  }

  public createNew<T>(payload: T) {
    const id = this.idCounter;
    this.idCounter += 1;

    const newItem = {
      id,
      ...payload,
    };
    this.items.push(newItem);
    return newItem;
  }

  public getById<T>(id: number): T | null {
    const item = this.items[this.getItemIndex(id)];

    return item || null;
  }

  public deleteById(id: number) {
    const index = this.getItemIndex(id);
    if (index > -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  public editById<T>(id: number, payload: T) {
    const index = this.getItemIndex(id);
    if (index > -1) {
      const updatedItem = {
        ...this.items[index],
        ...payload,
      };
      this.items[index] = updatedItem;

      return updatedItem;
    }

    return null;
  }
}

export default DbInstance;
