export class Arg {
	constructor(
		public name: string,
        public type: string,
        public command_id: number,
        public required: boolean = false,
		public id?: number,
		public updatedAt?: Date,
		public createdAt?: Date,
		public lastUpdatedBy?: string,
	) { }
}
