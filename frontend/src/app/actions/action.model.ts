export class Action {
	constructor(
		public name: string,
		public id?: number,
		public updatedAt?: Date,
		public createdAt?: Date,
		public lastUpdatedBy?: string,
	) { }
}
