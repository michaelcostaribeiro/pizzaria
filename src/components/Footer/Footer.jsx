// css
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <ul>
        <li><a href="https://www.linkedin.com/in/michael-costa-ribeiro/" target='_blank'><i className="fa-brands fa-linkedin"></i></a></li>
        <li><a href="https://github.com/michaelcostaribeiro/" target='_blank'><i className="fa-brands fa-github"></i></a></li>
      </ul>
      <p>© Copyright <span>Michael Costa Ribeiro.</span></p>
    </div>
  )
}

export default Footer