
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
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                    <li>Link 4</li>
                 </ul>

            </div>

        </div>
    )
}

export default Cabecalho