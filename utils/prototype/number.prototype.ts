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
		toFixedDecimals(precision?: number): string;
	}
}

// Add formatDecimals method to Number prototype if it doesn't exist already
if (typeof Number.prototype.toFixedDecimals !== 'function') {
	Number.prototype.toFixedDecimals = function (precision = 3) {
		try {
			// Get the number value
			const value = this.valueOf();

			// Check if the number has decimal places
			if (Number.isInteger(value)) {
				// If it's an integer, format with exactly the specified decimal places
				return value.toFixed(precision);
			} else {
				// If it already has decimals, return it as is
				return value.toString();
			}
		} catch {
			// Return a default value in case of errors
			return '0.' + '0'.repeat(precision);
		}
	};
}

// Only add the prototype method if it doesn't already exist
if (!Number.prototype.formatWithSuffix) {
	Number.prototype.formatWithSuffix = function (): string {
		return formatNumber(this.valueOf());
	};
}
