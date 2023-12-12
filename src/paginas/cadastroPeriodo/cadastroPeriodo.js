import React, { useEffect, useState } from "react";
import data from "../../componentes/recursos/data";
import './cadastroPeriodo.css'
import PopUp from "../../componentes/popup/popup";

function CadPeriodo() {
    function carregar() {
        const periodos = localStorage.getItem('periodos');
        return periodos ? JSON.parse(periodos) : [[], 1];
    }

    const [exibirExcluir, setExibirExcluir] = useState(true);

    const [isAlertaAtivo, setIsAlertaAtivo] = useState(false);
    const alternarAlerta = () => {
        setIsAlertaAtivo(!isAlertaAtivo);
      };

    const aux = carregar();
    
    //opções exibidas no select
    const [opcoesCursos, setOpcoesCursos] = useState([]);

    const [periodos, setPeriodos] = useState(aux[0]);

    const [idPeriodo, setIdPeriodo] = useState(aux[1]);
    const [numeroPeriodo, setNumeroPeriodo] = useState('');
    const [semestrePeriodo, setSemestrePeriodo] = useState('');
    const [dataInicio, setDataInicio] = useState(data.hoje());
    const [dataFim, setDataFim] = useState(data.hoje());
    const [turnos, setTurnos] = useState('');
    const [curso, setCurso] = useState('');

    function limparFormulario() {
        setNumeroPeriodo('');
        setSemestrePeriodo('');
        setDataInicio(data.hoje());
        setDataFim(data.hoje());
        setTurnos('');
        setCurso('');
    }

    function cadastrarPeriodo() {

        if (
        numeroPeriodo == '' ||
        semestrePeriodo == '' ||
        turnos == '' ||
        curso == ''){
            alternarAlerta()

        }else{
            const novoPeriodo = {
                idPeriodo: idPeriodo,
                numeroPeriodo: numeroPeriodo,
                semestrePeriodo: semestrePeriodo,
                dataInicio: data.formatarParaDiaMesAno(dataInicio),
                dataFim: data.formatarParaDiaMesAno(dataFim),
                turnos: turnos.join(', '),
                curso: curso,
            };
            
            const novosPeriodos = periodos.concat(novoPeriodo);
    
            localStorage.setItem("periodos", JSON.stringify([novosPeriodos, idPeriodo + 1]));
            setPeriodos(novosPeriodos);
            setIdPeriodo(idPeriodo + 1);
            limparFormulario();
        }

    }

    function excluirPeriodo(evt) {
        const elemID = evt.currentTarget.closest('tr').firstChild.innerText;

        const novosPeriodos = periodos.filter(periodo => periodo.idPeriodo != elemID);
        
        setPeriodos(novosPeriodos);

        localStorage.setItem("periodos", JSON.stringify([novosPeriodos, idPeriodo]));
    }

    function editarPeriodo(evt) {
        const elemID = evt.currentTarget.closest('tr').firstChild.innerText;

        const periodo = periodos.find(periodo => periodo.idPeriodo == elemID);
        
        setIdPeriodo(periodo.idPeriodo);
        setNumeroPeriodo(periodo.numeroPeriodo);
        setSemestrePeriodo(periodo.semestrePeriodo);
        setDataInicio(data.formatarParaAnoMesDia(periodo.dataInicio));
        setDataFim(data.formatarParaAnoMesDia(periodo.dataFim));
        setTurnos(periodo.turnos.split(', '));
        setCurso(periodo.curso);

        setExibirExcluir(false);

        document.querySelector('#btnCadastro').style.display = 'none';
        document.querySelector('#btnSalvar').style.display = 'block';
    }

    function salvarPeriodo() {

        if (
            numeroPeriodo == '' ||
            semestrePeriodo == '' ||
            turnos == '' ||
            curso == ''){
                alternarAlerta()
                
            }else{
                const periodo = {
                    idPeriodo: idPeriodo,
                    numeroPeriodo: numeroPeriodo,
                    semestrePeriodo: semestrePeriodo,
                    dataInicio: data.formatarParaDiaMesAno(dataInicio),
                    dataFim: data.formatarParaDiaMesAno(dataFim),
                    turnos: turnos.join(', '),
                    curso: curso,
                };
        
                const novosPeriodos = periodos.map(p => (p.idPeriodo == periodo.idPeriodo ? periodo : p));
                setPeriodos(novosPeriodos);
        
                localStorage.setItem("periodos", JSON.stringify([novosPeriodos, aux[1]]));
                setIdPeriodo(aux[1]);
                limparFormulario();
        
                setExibirExcluir(true);
        
                document.querySelector('#btnSalvar').style.display = 'none';
                document.querySelector('#btnCadastro').style.display = 'block';

            }
    }

    const handleTurnoChange = (evt) => {
        const { value, checked } = evt.target;
        console.log(checked);
        console.log(value);
    
        // Se o checkbox foi marcado, adiciona ao array; caso contrário, remove
        setTurnos((prevTurnos) =>
          checked ? [...prevTurnos, value] : prevTurnos.filter((turno) => turno !== value)
        );

        console.log(turnos);
        
      };

    useEffect(() => {    
        const lista = JSON.parse(localStorage.getItem('cursos'))[0] || [];
        setOpcoesCursos(lista)      
        
    },[])

    return (
        <>
            {isAlertaAtivo &&  <PopUp interruptor={alternarAlerta}/>}
            
            <div className="formContainer">
                <div className="inputCombo">
                    <label>ID</label>
                    <input id="idPeriodo" readOnly value={idPeriodo}></input>
                </div>
                <div className="inputCombo">
                    <label>Número do Período</label>
                    <input id="numeroPeriodo" type="number" value={numeroPeriodo} onChange={evt => setNumeroPeriodo(evt.target.value)}></input>
                </div>
                <div className="inputCombo">
                    <label>Semestre do Período</label>
                    <input id="semestrePeriodo" value={semestrePeriodo} onChange={evt => setSemestrePeriodo(evt.target.value)}></input>
                </div>
                <div className="inputCombo">
                    <label>Data de Início</label>
                    <input type="date" id="dataInicio" value={dataInicio} onChange={evt => setDataInicio(evt.target.value)}></input>
                </div>
                <div className="inputCombo">
                    <label>Data de Fim</label>
                    <input type="date" id="dataFim" value={dataFim} onChange={evt => setDataFim(evt.target.value)}></input>
                </div>
                <div className="inputCombo">
                    <label>Turnos</label>
                    
                    <div className="checkboxBody">
                        <div>
                            <input
                            type="checkbox"
                            id="matutino"
                            value="matutino"
                            checked={turnos.includes('matutino')}
                            onChange={handleTurnoChange}
                            />
                            <label htmlFor="matutino">Matutino</label>
                        </div>

                        <div>
                            <input
                            type="checkbox"
                            id="vespertino"
                            value="vespertino"
                            checked={turnos.includes('vespertino')}
                            onChange={handleTurnoChange}
                            />
                            <label htmlFor="vespertino">Vespertino</label>
                        </div>
                        <div>
                            <input
                            type="checkbox"
                            id="noturno"
                            value="noturno"
                            checked={turnos.includes('noturno')}
                            onChange={handleTurnoChange}
                            />
                            <label htmlFor="noturno">Noturno</label>
                        </div>

                    </div>

                </div>
                <div className="inputCombo">
                    <label>Curso</label>
                    <select id="curso" value={curso} onChange={evt => setCurso(evt.target.value)} >
                        <option value="">--- Selecione uma opção ---</option>
                        {opcoesCursos.map((opcao, index) => {
                            return(
                            <option key={index} value={opcao.nomeCurso}>
                                {opcao.nomeCurso}
                            </option>

                            )
                        })}
                    </select>
                </div>

                <button id='btnCadastro' className='btnCadastro' onClick={cadastrarPeriodo}>Cadastrar</button>
                <button id='btnSalvar' className='btnCadastro' onClick={salvarPeriodo} style={{ display: 'none' }}>Salvar</button>
            </div>

            <div className='dataSpace'>
            <h2 className='titulo'> Cadastro de Período</h2>
                <tr>
                    <th>ID do Período</th>
                    <th>Número do Período</th>
                    <th>Semestre do Período</th>
                    <th>Data de Início</th>
                    <th>Data de Fim</th>
                    <th>Turnos</th>
                    <th>Curso</th>
                    <th className='thHidden'>hidden</th>
                    <th className='thHidden'>hidden</th>
                </tr>
                {periodos.map(periodo => (
                    <tr key={periodo.idPeriodo}>
                        <td>{periodo.idPeriodo}</td>
                        <td>{periodo.numeroPeriodo}</td>
                        <td>{periodo.semestrePeriodo}</td>
                        <td>{periodo.dataInicio}</td>
                        <td>{periodo.dataFim}</td>
                        <td>{periodo.turnos}</td>
                        <td>{periodo.curso}</td>
                        <td><button onClick={editarPeriodo}>Editar</button></td>
                        <td>{exibirExcluir && (<button onClick={excluirPeriodo}>Excluir</button>)}</td>
                    </tr>
                ))}
            </div>
        </>
    );
}

export default CadPeriodo;
