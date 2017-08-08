export class VerticalOrder {
  private _id: string;
  public date: Date = null;
  public endOfWeek = false;
  public mostLiquidDate = false;
  public threeMonthDate = false;
  public qty: number = null;
  public netQty: number = null;

  constructor(id: string) {
    this._id = id;
  }

  getId(): string {
    return this._id;
  }


}
