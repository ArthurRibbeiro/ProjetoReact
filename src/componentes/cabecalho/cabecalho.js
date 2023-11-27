
import { Link } from 'react-router-dom'
import logo from '../../assets/imagens/logo.png'
import './cabecalho.css'

function Cabecalho(){
    return(
        <div className="cabecalho">
            <div className="imgcontainer">
                <img src={logo} />
            </div>
            <div className="navbar">
                <ul>

                <a href="/calendario"><li>Calendário</li></a>


                <div class="dropdown">
                    <div class="dropbtn">Cadastro</div>
                    <div class="dropdown-content">
                        <a href="/cadastro/curso">Cursos</a>
                        <a href="/cadastro/periodo">Período</a>
                        <a href="/cadastro/professor">Professores</a>
                        <a href="/cadastro/sala">Salas</a>
                        <a href="/cadastro/desafio">Desafios</a>
                    </div>
                    </div>
                 </ul>

            </div>

        </div>
    )
}

export default Cabecalho