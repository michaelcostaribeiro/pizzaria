// hooks
import { useState } from 'react'

// css
import styles from './Menu.module.css'

// components
import MenuList from '../../components/MenuList/MenuList'

const Menu = () => {
    const [tamanhoPizza, setTamanhoPizza] = useState(null)


    return (
        <div className={styles.Menu + " flex1"}>
            {!tamanhoPizza &&
                <>
                    <h1>Você deseja uma pizza grande ou brotinho?</h1>
                    <button onClick={() => setTamanhoPizza('grande')}>Pizza grande</button>
                    <button onClick={() => setTamanhoPizza('brotinho')}>Pizza brotinho</button>
                </>
            }

            {tamanhoPizza && <MenuList tamanho={tamanhoPizza} setTamanho={setTamanhoPizza} />}
        </div>
    )
}

export default Menu