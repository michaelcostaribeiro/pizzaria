// css
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <ul>
        <li><i class="fa-brands fa-linkedin"></i></li>
        <li><i class="fa-brands fa-github"></i></li>
      </ul>
      <p>Todos os meus projetos e seus detalhes estão aqui.</p>
      <p>© Copyright <span>Michael Costa Ribeiro.</span> Todos os direitos reservados.</p>
    </div>
  )
}

export default Footer