// +import './cadastro.css'






function Form(){
    return(
            <>
                <div className="inputCombo">
                    <label>Nome do desafio</label>
                    <input id="nomeDesafio"></input>
                </div>
                <div className="inputCombo">
                    <label>Períodos</label>
                    <input id="periodos"></input>
                </div>
                <div className="inputCombo">
                    <label>Professor</label>
                    <input id="professor"></input>
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
                    <label>Dia da semana</label>
                    <input id="diaSemana"></input>
                </div>
                <div className="inputCombo">
                    <label>Horário</label>
                    <input id="horario"></input>
                </div>
                <div className="inputCombo">
                    <label>Sala</label>
                    <input id="sala"></input>
                </div>
                

                <button id='btnCadastroDesafio'>Cadastrar</button>
            </>
    )
}

function Tabela(){
    return(
        <div className='dataContainer'>
            <tr>
                <th>Nome do desafio</th>
                <th>Períodos</th>
                <th>Professor</th>
                <th>Data de Início</th>
                <th>Data de Fim</th>
                <th>Dia da semana</th>
                <th>Horário</th>
                <th>Sala</th>
                <th className='thHidden'>hidden</th>
                <th className='thHidden'>hidden</th>
            </tr>
        </div>
    )
}


 
export default {Form, Tabela};

