export class CarryOrder {
  private _id: string;
  public selected = false;
  public instrument: string = null;
  public side: string = null;
  public qty: number = null;
  public prompt1: string = null;
  public limitPrompt1: string = null;
  public prompt2: string = null;
  public limitPrompt2: string = null;
  public breakPeriod = false;
  public variation: string = null;
  public status: string = null;
  public submitted = false;

  constructor(id: string) {
    this._id = id;
  }

  getId(): string {
    return this._id;
  }
}
