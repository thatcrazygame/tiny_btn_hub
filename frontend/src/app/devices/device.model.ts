export class Device {
  constructor(
    public name: string,
    public deviceTypeID: number,
    public id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,
  ) { }
}
