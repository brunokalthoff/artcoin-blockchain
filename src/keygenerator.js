import { ec as EC } from 'elliptic';
import { users } from './Users';
const ec = new EC('secp256k1');

export const key = ec.genKeyPair();

export const showKey = key => {
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');
    console.log('public:', publicKey)
    console.log('private:', privateKey)
}

export const userKeys = users.map((x, i) => {
    const ecInstence = new EC('secp256k1');
    const keyPair = ecInstence.genKeyPair();
    return {
        keyPair: keyPair,
        public: keyPair.getPublic('hex'),
        private: keyPair.getPrivate('hex'),
    }
})