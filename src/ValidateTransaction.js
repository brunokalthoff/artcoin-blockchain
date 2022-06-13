import { ec as EC } from 'elliptic';
import { calculateTransactionHash } from './Transactions';
const ecInstance = new EC('secp256k1');

export const isTxValid = transaction => {
    if (transaction.from === 'Blockchain') return transaction;
    if (!transaction.signature || transaction.signature.length === 0) throw new Error('No signature in this Transaction');
    const publicKey = ecInstance.keyFromPublic(transaction.from, 'hex');
    if (publicKey.verify(calculateTransactionHash(transaction), transaction.signature)) return transaction;
    throw new Error('Transaction not valid');
}

export const areTxValid = transactions => {
    if (transactions.every(x => isTxValid(x) === x)) return transactions;
    throw new Error('Transactions not valid');
}

export const areTxInfoComplete = transaction => {
    if (!transaction.amount) {
        document.querySelector("#amountMessage").innerText = 'Amount must be specified';
        throw new Error('Transaction amount must be specified');
    }
    return transaction;
}