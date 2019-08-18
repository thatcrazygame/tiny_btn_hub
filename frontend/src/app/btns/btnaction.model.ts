import { ArgValue } from './argvalue.model'

export class BtnAction {
  constructor(
    public btn_id: number,
    public action_id: number,
    public group_id: number,
    public command_id: number,
    public argvalues: ArgValue[],
  ) { }
}
