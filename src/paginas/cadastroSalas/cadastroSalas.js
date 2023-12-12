import React, { useState } from "react";
import PopUp from "../../componentes/popup/popup";

function CadSala() {
    function carregar() {
        const salas = localStorage.getItem('salas');
        return salas ? JSON.parse(salas) : [[], 1];
    }

    const [exibirExcluir, setExibirExcluir] = useState(true);

    const [isAlertaAtivo, setIsAlertaAtivo] = useState(false);
    const alternarAlerta = () => {
        setIsAlertaAtivo(!isAlertaAtivo);
      };

    const aux = carregar();

    const [salas, setSalas] = useState(aux[0]);

    const [idSala, setIdSala] = useState(aux[1]);
    const [andar, setAndar] = useState('');
    const [numero, setNumero] = useState('');
    const [predio, setPredio] = useState('');
    const [numCadeiras, setNumCadeiras] = useState('');

    function limparFormulario() {
        setAndar('');
        setNumero('');
        setPredio('');
        setNumCadeiras('');
    }

    function cadastrarSala() {

        if (andar == "" ||
            numero == "" ||
            predio == "" ||
            numCadeiras == ""){
                alternarAlerta()
            }else{
                const novaSala = {
                    idSala: idSala,
                    andar: andar,
                    numero: numero,
                    predio: predio,
                    numCadeiras: numCadeiras,
                };
        
                const novasSalas = [...salas, novaSala];
        
                localStorage.setItem("salas", JSON.stringify([novasSalas, idSala + 1]));
                setSalas(novasSalas);
                setIdSala(idSala + 1);
                limparFormulario();

            }

    }

    function excluirSala(evt) {
        const elemID = evt.currentTarget.closest('tr').firstChild.innerText;

        const novasSalas = salas.filter(sala => sala.idSala != elemID);
        
        setSalas(novasSalas);

        localStorage.setItem("salas", JSON.stringify([novasSalas, idSala]));
    }

    function editarSala(evt) {
        const elemID = evt.currentTarget.closest('tr').firstChild.innerText;

        const sala = salas.find(sala => sala.idSala == elemID);
        
        setIdSala(sala.idSala);
        setAndar(sala.andar);
        setNumero(sala.numero);
        setPredio(sala.predio);
        setNumCadeiras(sala.numCadeiras);

        setExibirExcluir(false);

        document.querySelector('#btnCadastro').style.display = 'none';
        document.querySelector('#btnSalvar').style.display = 'block';
    }

    function salvarSala() {


        if (andar == "" ||
        numero == "" ||
        predio == "" ||
        numCadeiras == ""){
            alternarAlerta()
        }else{
            const sala = {
                idSala: idSala,
                andar: andar,
                numero: numero,
                predio: predio,
                numCadeiras: numCadeiras,
            };
    
            const novasSalas = salas.map(s => (s.idSala == sala.idSala ? sala : s));
            setSalas(novasSalas);
    
            localStorage.setItem("salas", JSON.stringify([novasSalas, aux[1]]));
            setIdSala(aux[1]);
            limparFormulario();
    
            setExibirExcluir(true);
    
            document.querySelector('#btnSalvar').style.display = 'none';
            document.querySelector('#btnCadastro').style.display = 'block';

        }
            
    }

    return (
        <>
        {isAlertaAtivo &&  <PopUp interruptor={alternarAlerta}/>}
            <div className="formContainer">
                <div className="inputCombo">
                    <label>ID</label>
                    <input id="idSala" readOnly value={idSala}></input>
                </div>
                <div className="inputCombo">
                    <label>Andar</label>
                    <input type="number" id="andar" value={andar} onChange={evt => setAndar(evt.target.value)}></input>
                </div>
                <div className="inputCombo">
                    <label>Número</label>
                    <input type="number" id="numero" value={numero} onChange={evt => setNumero(evt.target.value)}></input>
                </div>
                <div className="inputCombo">
                    <label>Prédio</label>
                    <input id="predio" value={predio} onChange={evt => setPredio(evt.target.value)}></input>
                </div>
                <div className="inputCombo">
                    <label>Número de Cadeiras</label>
                    <input type="number" id="numCadeiras" value={numCadeiras} onChange={evt => setNumCadeiras(evt.target.value)}></input>
                </div>

                <button id='btnCadastro' className='btnCadastro' onClick={cadastrarSala}>Cadastrar</button>
                <button id='btnSalvar' className='btnCadastro' onClick={salvarSala} style={{ display: 'none' }}>Salvar</button>
            </div>

            <div className='dataSpace'>
            <h2 className='titulo'> Cadastro de Salas</h2>
                <tr>
                    <th>ID da Sala</th>
                    <th>Andar</th>
                    <th>Número</th>
                    <th>Prédio</th>
                    <th>Número de Cadeiras</th>
                    <th className='thHidden'>hidden</th>
                    <th className='thHidden'>hidden</th>
                </tr>
                {salas.map(sala => (
                    <tr key={sala.idSala}>
                        <td>{sala.idSala}</td>
                        <td>{sala.andar}</td>
                        <td>{sala.numero}</td>
                        <td>{sala.predio}</td>
                        <td>{sala.numCadeiras}</td>
                        <td><button onClick={editarSala}>Editar</button></td>
                        <td>{exibirExcluir && (<button onClick={excluirSala}>Excluir</button>)}</td>
                    </tr>
                ))}
            </div>
        </>
    );
}

export default CadSala;
