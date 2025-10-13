import { createUserWithEmailAndPassword, signOut, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthentication = () => {
    const [error, setError] = useState('')

    const navigate = useNavigate('')

    const createUser = async (userInfo) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);

            await updateProfile(user, {
                displayName: userInfo.displayName
            })

            navigate('/')

        } catch (firebaseError) {
            console.log(firebaseError.message)
            setError(firebaseError.message)
            if (firebaseError.message.includes('invalid-email')) {
                setError('Email Inválido')
            } else if (firebaseError.message.includes('email-already-in-use')) {
                setError('O email ja está sendo usado')
            }
            else if (firebaseError.message.includes('weak-password')) {
                setError("A senha precisa ter pelo menos 6 digitos")
            } else if (firebaseError.message.includes('network-request-failed')) {
                setError('Erro de conexão')
            } else if (firebaseError.message.includes('too-many-requests')) {
                setError("Espere um pouco antes de tentar novamente")
            }

        }
    }

    const logout = async () => await signOut(auth)


    const login = async (userInfo) => {
        try {
            await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
            navigate('/')
        } catch (firebaseError) {
            console.log('erro: ' + firebaseError.message)
            if (firebaseError.message.includes('invalid-credential')) {
                setError('Credenciais inválidas')
            } else if (firebaseError.message.includes('too-many-requests')) {
                setError("Espere um pouco antes de tentar novamente!")
            } else if (firebaseError.message.includes('network-request-failed')) {
                setError('Erro de conexão')
            } else {
                setError('Um erro ocorreu!')
            }
        }
    }

    return {
        login,
        logout,
        error,
        createUser
    }
}

export default useAuthentication;