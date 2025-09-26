import { createUserWithEmailAndPassword, signOut, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";

export const useAuthentication = () =>{
    const [error, setError] = useState('')

    const createUser = async(userInfo) => {
        try{
            const {user} = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);

            await updateProfile(user, {
                displayName: userInfo.displayName
            })
    
        }catch(firebaseError){
            console.log('Erro ao cadastrar usuário', firebaseError.message)
            setError(firebaseError.message)
        }
    }

    const logout = async () => await signOut(auth)
    const login = async (userInfo) => await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);

    return {
        login,
        logout,
        error,
        createUser
    }
}

export default useAuthentication;