function Form(){
    return(
            <>
                <div className="inputCombo">
                    <label>Andar</label>
                    <input id="andar"></input>
                </div>
                <div className="inputCombo">
                    <label>Número</label>
                    <input id="numero"></input>
                </div>
                <div className="inputCombo">
                    <label>Prédio</label>
                    <input id="predio"></input>
                </div>
                <div className="inputCombo">
                    <label>Nº de cadeiras</label>
                    <input id="nCadeiras"></input>
                </div>

                <button id='btnCadastroSala'>Cadastrar</button>
            </>
    )
}

function Tabela(){
    return(
        <div className='dataContainer'>
            <tr>
                <th>Andar</th>
                <th>Número</th>
                <th>Prédio</th>
                <th>Nº ded cadeiras</th>
                <th className='thHidden'>hidden</th>
                <th className='thHidden'>hidden</th>
            </tr>
        </div>
    )
}


 
export default {Form, Tabela};

