import poolAbi from '@/web3/abi/pool.abi.json';
import { Abi, parseEther } from 'viem';
import { Web3Address } from '@/types/web3/web3.types';
import { TokenModel } from './token.model';

/**
 * Model for handling pool operations
 */
export class PoolManagerModel {
	private poolAddress: Web3Address;

	/**
	 * Create a new PoolManagerModel instance
	 * @param poolAddress The address of the pool contract
	 */
	constructor(poolAddress: Web3Address) {
		this.poolAddress = poolAddress;
	}

	/**
	 * Get the parameters for a deposit transaction
	 * @param token The TokenModel instance
	 * @param amount The amount to deposit in human-readable format (e.g., "10.5")
	 * @param receiver The address that will receive the shares
	 * @returns Parameters for useWriteContract
	 */
	getDepositParams({
		token,
		amount,
		receiver,
	}: {
		token: TokenModel;
		amount: string;
		receiver: Web3Address;
	}) {
		// Convert the amount from human-readable format to wei
		const amountInWei = token.convertToWei(amount);
		return {
			address: this.poolAddress,
			abi: poolAbi as Abi,
			functionName: 'deposit',
			args: [token.getTokenId(), amountInWei, receiver],
			value: parseEther('0'),
		};
	}

	/**
	 * Get the parameters for a withdraw transaction
	 * @param token The TokenModel instance
	 * @param amount The amount to withdraw in human-readable format (e.g., "10.5")
	 * @param receiver The address that will receive the assets
	 * @param owner The address that owns the shares (usually the connected wallet)
	 * @returns Parameters for useWriteContract
	 */
	getWithdrawParams({
		token,
		amount,
		receiver,
		owner,
	}: {
		token: TokenModel;
		amount: string;
		receiver: Web3Address;
		owner: Web3Address;
	}) {
		// Convert the amount from human-readable format to wei
		const assetsInWei = token.convertToWei(amount);
		return {
			address: this.poolAddress,
			abi: poolAbi as Abi,
			functionName: 'withdraw',
			args: [token.getTokenId(), assetsInWei, receiver, owner],
		};
	}
}
