
import axios from '../../../node_modules/axios/index';

export const useAuthentication = () => {

    const signIn = async () => {
        return await axios.get('http://localhost:53000/authentication/sign_in');
    }

    const signOut = async () => {
        return await axios.get('http://localhost:53000/authentication/sign_out');
    }

    return { signIn, signOut };
}