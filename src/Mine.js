// calculate Hash
// mine block
import sha256 from "crypto-js/sha256";


const difficulty = 2;

export const calculateHash = (timestamp, transactions, previousHash, nonce) => {
    const hash = sha256(timestamp + JSON.stringify(transactions) + previousHash + nonce).toString();
    return hash;
}


export const mineBlock = block => {
    while (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join(0)) {
        block.nonce++;
        block.hash = calculateHash(block.timestamp, block.transactions, block.previousHash, block.nonce);
    }
}