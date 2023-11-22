import './cadastroPeriodo.css'

function Form(){
    return(
            <>
                <div className="inputCombo">
                    <label>Nº do período</label>
                    <input id="nPeriodo"></input>
                </div>
                <div className="inputCombo">
                    <label>Semestre</label>
                    <input id="semestre"></input>
                </div>
                <div className="inputCombo">
                    <label>Data de Início</label>
                    <input id="dtInicio"></input>
                </div>
                <div className="inputCombo">
                    <label>Data de Fim</label>
                    <input id="dtFim"></input>
                </div>
                <div className="inputCombo">
                    <label>Turno</label>
                    <input id="turno"></input>
                </div>
                <div className="inputCombo">
                    <label>Curso</label>
                    <input id="curso"></input>
                </div>

                <button id='btnCadastroPeriodo'>Cadastrar</button>
            </>
    )
}

function Tabela(){
    return(
        <div className='dataContainer'>
            <tr>
                <th>Nº do período</th>
                <th>Semestre</th>
                <th>Data de Início</th>
                <th>Data de Fim</th>
                <th>Turno</th>
                <th>Curso</th>
                <th className='thHidden'>hidden</th>
                <th className='thHidden'>hidden</th>
            </tr>
        </div>
    )
}


 
export default {Form, Tabela};

