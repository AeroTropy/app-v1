export type Pool = {
	name: string;
	address: string;
};

export const POOLS: Pool[] = [
	{
		name: 'High Risk Pool',
		address: '0x1527b9f572C49EC1D9240D66a882A2AaACceC8f8',
	},
	{
		name: 'Medium Risk Pool',
		address: '0x265e2068955685c3676ea1c075257ab0bf5148b4',
	},
	{
		name: 'Low Risk Pool',
		address: '0x8a4dd22bcd307fca80db7eefb090e430badccf7f',
	},
];
