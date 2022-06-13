import React, { useRef } from "react";
import sha256 from "crypto-js/sha256";
import { userKeys } from "./keygenerator";
import { areTxInfoComplete, isTxValid } from "./ValidateTransaction";
import { getTitle } from "./Helpers";



export const newTransaction = (from, to, amount) => {
    const transaction = {
        from: from,
        to: to,
        amount: amount,
    }
    return transaction
}

export const calculateTransactionHash = transaction => {
    const hash = sha256(transaction.from + transaction.to + transaction.amount).toString();
    transaction.hash = hash;
    return transaction;
}

export const signTransaction = (transaction, key) => {
    if (key.getPublic('hex') !== transaction.from) {
        document.querySelector("#signMessage").innerText = 'You cannot sign transactions for other wallets';
        document.querySelector("#signMessage").style.color = 'red';
        throw new Error('You cannot sign transactions for other wallets');
    }
    const sig = key.sign(transaction.hash, 'base64');
    const signature = sig.toDER('hex');
    transaction.signature = signature;
    document.querySelector("#signMessage").innerText = 'Transaction successfully signed';
    document.querySelector("#signMessage").style.color = 'green';
    return transaction;
}

function Transactions(props) {
    const fromField = useRef();
    const toField = useRef();
    const amountField = useRef();

    const addTransaction = async e => {
        e.preventDefault();
        const from = e.target[0].value;
        const to = e.target[1].value;
        const key = userKeys[e.target[2].value].keyPair;
        const amount = e.target[3].value;
        const transaction = newTransaction(from, to, amount);
        const txInfoOk = await areTxInfoComplete(transaction);
        const txHashed = await calculateTransactionHash(txInfoOk);
        const txSigned = await signTransaction(txHashed, key);
        // const txValid = await isTxValid(txSigned);
        props.setPendingTransactions(prev => [...prev, txSigned]);
        amountField.current.value = '';        
        }

    return (
        <>
            <div className="w-full max-w-xs mx-auto m-10">
                <form onChange={() => document.querySelector("#signMessage").innerText = ''} onSubmit={addTransaction} className="bg-indigo-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-2">
                    <div className="mb2"><h1 className="pb-3 text-xl font-bold text-indigo-900">New Transaction</h1>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="from">
                            From
                        </label>
                        <select ref={fromField} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="from" placeholder="User">
                            {userKeys.map((x, i) => <option key={i} value={x.public}>{'User ' + (i + 1)}</option>)}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="to">
                            To
                        </label>
                        <select ref={toField} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="to" placeholder="User">
                            {userKeys.map((x, i) => <option key={i} value={x.public}>{'User ' + (i + 1)}</option>)}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sign">
                            Sign
                        </label>
                        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sign" placeholder="Sign Transaction">
                            {userKeys.map((x, i) => <option key={i} value={i}>{'User ' + (i + 1)}</option>)}
                        </select>
                        <p id="signMessage" className="text-red-500 text-xs italic text-right m-1"></p>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                            Amount
                        </label>
                        <input onChange={() => document.querySelector("#amountMessage").innerText = ''} ref={amountField} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amount" type="text" placeholder="Amount" />
                        <p id="amountMessage" className="text-red-500 text-xs italic text-right m-1"></p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-indigo-500 hover:bg-indigo-700 text-white mt-5 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Send Amount
                        </button>
                        <p id="txInfo" onMouseEnter={() => getTitle(fromField.current.selectedOptions[0].value, toField.current.selectedOptions[0].value, amountField.current.value)} className="cursor-default inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800">
                            What the key?
                        </p>
                    </div>
                </form>
            </div>


            <div className="w-full max-w-xs mx-auto m-10 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-2">
                <h1 className="pb-3 text-xl font-bold text-indigo-900">Pending Transactions</h1>
                {props.pendingTransactions.map((t, i) => {
                    return (
                        <div key={i} className="bg-indigo-500 rounded text-white p-3">
                            <p>From: {t.from}, To: {t.to}, Amount: {t.amount} </p>

                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Transactions;