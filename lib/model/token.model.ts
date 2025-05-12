import { Web3Address } from '@/types/web3/web3.types';
import tokenAbi from '@/web3/abi/token.abi.json';
import { Abi, parseUnits } from 'viem';

/**
 * Model for handling token operations
 */
export class TokenModel {
	/**
	 * The token address
	 */
	private address: Web3Address;

	/**
	 * The token decimals
	 */
	private decimals: number;

	/**
	 * The token id
	 */
	private tokenId: Web3Address;

	/**
	 * Create a new TokenModel instance
	 * @param address The token address
	 * @param decimals The token decimals
	 */
	constructor(address: Web3Address, decimals: number, tokenId: Web3Address) {
		this.address = address;
		this.decimals = decimals;
		this.tokenId = tokenId;
	}

	/**
	 * Convert human-readable amount to wei based on token decimals
	 * @param amount The amount in human-readable format (e.g., "10.5")
	 * @returns The amount in wei as bigint
	 */
	convertToWei(amount: string): bigint {
		try {
			return parseUnits(amount, this.decimals);
		} catch (error) {
			console.error('Error converting amount to wei:', error);
			throw new Error(
				`Failed to convert ${amount} to wei with ${this.decimals} decimals`
			);
		}
	}

	/**
	 * Get the parameters for an approve transaction
	 * @param spender The address of the contract that will spend the tokens
	 * @param amount The amount to approve in human-readable format (e.g., "10.5")
	 * @returns Parameters for useWriteContract
	 */
	getApproveParams({
		amount,
		spender,
	}: {
		amount: string;
		spender: Web3Address;
	}) {
		// Convert the amount from human-readable format to wei
		const amountInWei = this.convertToWei(amount);

		return {
			address: this.address,
			abi: tokenAbi as Abi,
			functionName: 'approve',
			args: [spender, amountInWei],
		};
	}

	/**
	 * Get the token address
	 * @returns The token address
	 */
	getAddress(): Web3Address {
		return this.address;
	}

	/**
	 * Get the token decimals
	 * @returns The token decimals
	 */
	getDecimals(): number {
		return this.decimals;
	}

	getTokenId(): Web3Address {
		return this.tokenId;
	}
}
