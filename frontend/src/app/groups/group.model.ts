import { Device } from '../devices/device.model'

export class Group {
	constructor(
		public name: string,
		public devices: Device[],
		public id?: number,
		public updatedAt?: Date,
		public createdAt?: Date,
		public lastUpdatedBy?: string,
	) { }
}
