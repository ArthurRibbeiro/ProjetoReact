import './cadastroProfessor.css'

function Form(){
    return(
            <>
                <div className="inputCombo">
                    <label>Nome</label>
                    <input id="nomeProf"></input>
                </div>
                <div className="inputCombo">
                    <label>Matrícula</label>
                    <input id="matriculaProf"></input>
                </div>
                <div className="inputCombo">
                    <label>Telefone</label>
                    <input id="telProf"></input>
                </div>

                <button id='btnCadastroProf'>Cadastrar</button>
            </>
    )
}

function Tabela(){
    return(
        <div className='dataContainer'>
            <tr>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Telefone</th>
                <th className='thHidden'>hidden</th>
                <th className='thHidden'>hidden</th>
            </tr>
        </div>
    )
}


 
export default {Form, Tabela};

