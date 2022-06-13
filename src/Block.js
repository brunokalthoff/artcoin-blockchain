// make new block
// add block?

import { calculateHash } from "./Mine";


const newTimestamp = () => {
    let time = new Date();
    time = time.toUTCString();
    return time;
}

export const createBlock = (transactions, previousHash = '') => {
    const time = newTimestamp();
    const block = {
        timestamp: time,
        transactions: transactions,
        previousHash: previousHash,
        hash: calculateHash(time, transactions, previousHash),
        nonce: 0
    }
    return block;
}

export const createGenisisBlock = () => {
    const gen = createBlock("Genesis Block", "0");
    return gen;
}



    // const addBlock = newBlock => {
    //     newBlock.previousHash = getLatestBlock().hash;
    //     newBlock.hash = mineBlock(newBlock);
    //     setChain(prev => [...prev, newBlock]);
    //     isChainValid();
    // }


