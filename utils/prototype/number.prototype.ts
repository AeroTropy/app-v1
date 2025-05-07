export function formatNumber(num: number): string {
	if (num >= 1000000000) {
		return (
			(num / 1000000000)
				.toFixed(num % 1000000000 === 0 ? 0 : 2)
				.replace(/\.0+$/, '') + 'B'
		);
	} else if (num >= 1000000) {
		return (
			(num / 1000000)
				.toFixed(num % 1000000 === 0 ? 0 : 2)
				.replace(/\.0+$/, '') + 'M'
		);
	} else if (num >= 1000) {
		return (
			(num / 1000)
				.toFixed(num % 1000 === 0 ? 0 : 1)
				.replace(/\.0+$/, '') + 'K'
		);
	} else {
		return num.toString();
	}
}

/**
 * Adds a Number prototype method to format numbers with B, M, K suffixes and commas
 */
declare global {
	interface Number {
		formatWithSuffix(): string;
	}
}

// Only add the prototype method if it doesn't already exist
if (!Number.prototype.formatWithSuffix) {
	Number.prototype.formatWithSuffix = function (): string {
		return formatNumber(this.valueOf());
	};
}
