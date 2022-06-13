// chain
// add block to chain
// display blockchain

import React, { useState, useEffect } from "react";
import { createGenisisBlock, createBlock } from "./Block";
import { selectRandomUser } from "./Users";
import { mineBlock } from "./Mine";
import { newTransaction } from "./Transactions";
import Transactions from "./Transactions";
import Validate, { isChainValid } from "./ValidateChain";
import { startUpperCase } from "./Helpers";
import Balance from "./Balance";
import { areTxValid } from "./ValidateTransaction";


function Blockchain() {
    const [chain, setChain] = useState([createGenisisBlock()]);
    const [pendingTransactions, setPendingTransactions] = useState([]);

    useEffect(() => {
        if (pendingTransactions.length > 3) minePendingTransactions(selectRandomUser());
    }, [pendingTransactions]);


    const minePendingTransactions = async miningRewardAdress => {
        const validTxs = await areTxValid(pendingTransactions);
        const block = createBlock(validTxs);
        block.previousHash = chain[chain.length - 1].hash;
        const minedBlock = await mineBlock(block);
        setChain(prev => [...prev, minedBlock]);
        setPendingTransactions([newTransaction('Blockchain', miningRewardAdress, 100)]);
    }

    return (
        <>
            <div className="flex flex-wrap">
                <Transactions pendingTransactions={pendingTransactions} setPendingTransactions={setPendingTransactions} />
                <Validate chain={chain} setChain={setChain} />
                <Balance chain={chain} />
            </div>





            <div className="text-sm flex justify-start flex-wrap-reverse">


                {chain.map((blockObj, i) => {

                    return <div key={i} className="bg-indigo-100 w-full max-w-sm mx-auto m-10 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-2 break-words"> <h1 className="text-3xl font-bold">Block {i + 1}</h1>  {Object.entries(blockObj).map((arr, i) => {

                        if (arr[0] === 'transactions' && typeof arr[1] == 'object') {
                            return <div key={i} className="transactions lighter">Transactions: {arr[1].map((transObj, i) => {
                                return <div key={i} className="p-2">Transaction {i + 1} <br /> {Object.entries(transObj).map((valPair, i) => {
                                    return <p className="inline p-2">{startUpperCase(valPair[0]) + ': ' + valPair[1]}</p>
                                })} </div>
                            })} </div>  
                        } else {
                            if (arr[0] === 'hash' || arr[0] === 'transactions') {
                                return <div key={i} className="lighter">{startUpperCase(arr[0]) + ': ' + arr[1]}</div>
                            }

                            return <div key={i} className="darker">{startUpperCase(arr[0]) + ': ' + arr[1]}</div>


                        }
                    })} </div>

                }


                )}

            </div>







        </>
    );

}

export default Blockchain;
