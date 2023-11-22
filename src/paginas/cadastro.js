import "./cadastro.css"


import CadCurso from './cadastroCurso/cadastroCurso';
import CadProf from './cadastroProfessor/cadastroProfessor'
import CadPeriodo from './cadastroPeriodo/cadastroPeriodo'
import CadDesafio from './cadastroDesafio/cadastroDesafio'

function Cadastro(){
    return(
        <div className='cadBody'>
            <div className="formContainer">
                <CadCurso.Form />

            </div>
            <div className='dataContainer'>
                <CadCurso.Tabela />
            </div>
        </div>
    )
}



export default Cadastro;