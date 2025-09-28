// css
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <ul>
        <li><i className="fa-brands fa-linkedin"></i></li>
        <li><i className="fa-brands fa-github"></i></li>
      </ul>
      <p>© Copyright <span>Michael Costa Ribeiro.</span> Todos os direitos reservados.</p>
    </div>
  )
}

export default Footer