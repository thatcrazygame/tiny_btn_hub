import { BtnAction } from './btnaction.model'

export class Btn {
  constructor(
    public name: string,
    public btn_actions: BtnAction[],
    public counter?: number,
    public id?: number,
    public updatedAt?: Date,
    public createdAt?: Date,
    public lastUpdatedBy?: string,
  ) { }
}
