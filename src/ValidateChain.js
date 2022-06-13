// validate blockchain
// validate transaction
import React, { useState, useRef } from "react";
import { calculateHash } from "./Mine";

const validationValues = {
    valid: 'Blockchain is valid!',
    invalid: 'Blockchain is not valid!',
}

export const isChainValid = chain => {
    for (let i = 1; i < chain.length; i++) {
        const currentBlock = chain[i];
        const previousBlock = chain[i - 1];
        if (currentBlock.hash !== calculateHash(currentBlock.timestamp, currentBlock.transactions, currentBlock.previousHash, currentBlock.nonce)) {
            return false;
        }
        if (currentBlock.previousHash !== previousBlock.hash) {
            return false;
        }
        return true;
    }
}

function ValidateChain(props) {
    const blockIndex = useRef();
    const transactionIndex = useRef();
    const newAmount = useRef();
    const [chainIsValid, setChainIsValid] = useState(validationValues.valid);

    const tamper = e => {
        e.preventDefault();
        const blIndex = blockIndex.current.value;
        blockIndex.current.value = '';
        const transIndex = transactionIndex.current.value;
        transactionIndex.current.value = '';
        const nAmount = newAmount.current.value;
        newAmount.current.value = '';
        const copy = [...props.chain];
        copy[blIndex - 1].transactions[transIndex - 1].amount = nAmount;
        props.setChain(copy);
    }

    const checkChain = () => {
        if (isChainValid(props.chain)) return setChainIsValid(validationValues.valid);
        else return setChainIsValid(validationValues.invalid);
    }

    return (

        <div className="w-full max-w-xs mx-auto m-10">

            <form onSubmit={tamper} className="bg-indigo-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-2">
                <div className="mb-4"><h1 className="pb-3 text-xl font-bold text-indigo-900">Hack The Chain</h1>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="block">
                        Block
                    </label>
                    <input ref={blockIndex} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="block" type="text" placeholder="Block" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adress">
                        Transaction
                    </label>
                    <input ref={transactionIndex} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adress" type="text" placeholder="Transaction" />

                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                        Amount
                    </label>
                    <input ref={newAmount} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amount" type="text" placeholder="Amount" />

                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white mt-5 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Temper!
                    </button>
                    <p onClick={checkChain} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">
                        Check Validity
                    </p>

                </div>
                {chainIsValid === validationValues.valid ? <p className="text-green-500 text-xs italic text-right">{chainIsValid}</p> : <p className="text-red-500 text-xs italic text-right">{chainIsValid}</p>}

            </form>



        </div>

    );
}

export default ValidateChain;