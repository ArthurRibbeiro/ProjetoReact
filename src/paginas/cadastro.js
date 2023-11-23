import "./cadastro.css"


import CadCurso from './cadastroCurso/cadastroCurso';
import CadProf from './cadastroProfessor/cadastroProfessor'
import CadPeriodo from './cadastroPeriodo/cadastroPeriodo'
import CadDesafio from './cadastroDesafio/cadastroDesafio'

function Cadastro(){
    return(
        <div className='cadBody'>
            <CadCurso />
        </div>
    )
}



export default Cadastro;