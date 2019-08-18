import { Arg } from './arg.model'

export class Command {
	constructor(
		public name: string,
		public args?: Arg[],
		public id?: number,
		public updatedAt?: Date,
		public createdAt?: Date,
		public lastUpdatedBy?: string,
	) { }
}
