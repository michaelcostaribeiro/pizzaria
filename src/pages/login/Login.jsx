// css
import styles from './Login.module.css'

// hooks
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { login, error: firebaseError } = useAuthentication()

    useEffect(()=>{
        setError(firebaseError)
    },[firebaseError])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userInfo = {
            email,
            password
        }

        await login(userInfo);
    }


    return (
        <div className={styles.formContainer + " container flex1 "}  >
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h2>Entre com seu login e senha!</h2>
                <label htmlFor='emailInput'>Login:</label>
                <input id='emailInput' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor='passwordInput'>Senha:</label>
                <input maxLength={20} id='passwordInput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Logar" />
                <Link to='/register' >Não possui conta? Clique aqui</Link>
                {error && <p className='error'>{error}</p>}
                <div className={styles.adminCredentials}>
                    <h3>admin:</h3>
                    <hr />
                    <p>admin@mail.com</p>
                    <p>123456789</p>
                </div>
            </form>
            <Link className='back' to='/' />
            
        </div>
    )
}

export default Login