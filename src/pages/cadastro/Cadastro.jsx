// css
import styles from './Cadastro.module.css'

// hooks
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';



const Cadastro = () => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate('')

    const {createUser} = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null);

        
        try{
            if(displayName === 'admin'){
                setError('Nickname inválido!')
                return
            }
            if(password === confirmPassword){
                const user = {
                    displayName,
                    email,
                    password
                }
                createUser(user)
                
    
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                navigate('/')
            }else{
                setError('As senhas não estão iguais!')
                return
            }

        }catch(firebaseError){
            console.log('Erro ao cadastrar usuário', firebaseError.message)
            setError(firebaseError.message)
        }


        console.log(email)
        console.log(password)
    }


  return (
    <div className={styles.back}>
        <form onSubmit={handleSubmit}>
            <h2>Cadastre-se com seu email e senha!</h2>
            <label htmlFor='nickname'>Nickname:</label>
              <input maxLength={10} id='nickname' type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
            <label htmlFor='email'>Email:</label>
            <input id='email' type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <label htmlFor='password'>Senha:</label>
            <input maxLength={20} id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <label htmlFor='confirmPassword'>Confirme sua senha:</label>
            <input maxLength={20} id='confirmPassword' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <input type="submit" value="Cadastrar" />
            {error && <p className='error'>{error}</p>}
        </form>

    </div>
  )
}

export default Cadastro