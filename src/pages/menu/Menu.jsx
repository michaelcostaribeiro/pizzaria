// hooks
import { useState } from 'react'

// css
import styles from './Menu.module.css'

// components
import MenuList from '../../components/MenuList/MenuList'

const Menu = () => {
    const [tamanhoPizza, setTamanhoPizza] = useState(null)


    return (
        <div className={'container flex1'}>
            <div className={styles.Menu + " focus"}>
                {!tamanhoPizza &&
                    <>
                    <h1 className={styles.MenuTitle }>Você deseja uma pizza grande ou brotinho?</h1>
                        <button onClick={() => setTamanhoPizza('grande')}>Pizza grande</button>
                        <button onClick={() => setTamanhoPizza('brotinho')}>Pizza brotinho</button>
                    </>
                }
                {tamanhoPizza && <MenuList tamanho={tamanhoPizza} setTamanho={setTamanhoPizza} />}
            </div>
        </div>
    )
}

export default Menu