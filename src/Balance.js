import React, { useState } from "react";
import { userKeys } from "./keygenerator";

function Balance(props) {
    const [balance, setBalance] = useState(0);


    const checkBalance = e => {
        const account = e.target.value;
        setBalance(0);
        for (let i = 1; i < props.chain.length; i++) {
            props.chain[i].transactions.forEach(t => {
                if (t.from === account) {
                    console.log('taking', t.amount);
                    setBalance(prev=>prev - Number(t.amount));
                }
                if (t.to === account) {
                    console.log('substacting', t.amount);
                    setBalance(prev => prev + Number(t.amount));
                }
            })
        }
    }


    return (
        <div className="w-full max-w-xs mx-auto m-10">
            <form onChange={checkBalance} className="bg-indigo-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-2">
                <div className="mb-4"><h1 className="pb-3 text-xl font-bold text-indigo-900">Check Balance</h1>

                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="account">
                        Account
                    </label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="account" placeholder="Account">
                        {userKeys.map((x, i) => <option key={i} value={x.public}>{'User ' + (i + 1)}</option>)}
                    </select>
                </div>


                <div className="flex items-center justify-end">
   
                    <p className="inline-block font-bold text-4xl text-indigo-800">
                        {balance}
                    </p>
                </div>

            </form>
        </div>
    );
};


export default Balance