export class DeviceType {
	constructor(
		public name: string,
		public id?: number,
		public updatedAt?: Date,
		public createdAt?: Date,
		public lastUpdatedBy?: string,
	) { }
}
