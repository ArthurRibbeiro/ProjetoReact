import React, { useState } from "react";

function CadPeriodo() {
    function carregar() {
        const periodos = localStorage.getItem('periodos');
        return periodos ? JSON.parse(periodos) : [[], 1];
    }

    const [exibirExcluir, setExibirExcluir] = useState(true);

    const aux = carregar();

    const [periodos, setPeriodos] = useState(aux[0]);

    const [idPeriodo, setIdPeriodo] = useState(aux[1]);
    const [numeroPeriodo, setNumeroPeriodo] = useState('');
    const [semestrePeriodo, setSemestrePeriodo] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [turno, setTurno] = useState('');
    const [curso, setCurso] = useState('');

    function limparFormulario() {
        setNumeroPeriodo('');
        setSemestrePeriodo('');
        setDataInicio('');
        setDataFim('');
        setTurno('');
        setCurso('');
    }

    function cadastrarPeriodo() {
        const novoPeriodo = {
            idPeriodo: idPeriodo,
            numeroPeriodo: numeroPeriodo,
            semestrePeriodo: semestrePeriodo,
            dataInicio: dataInicio,
            dataFim: dataFim,
            turno: turno,
            curso: curso,
        };

        const novosPeriodos = periodos.concat(novoPeriodo);

        localStorage.setItem("periodos", JSON.stringify([novosPeriodos, idPeriodo + 1]));
        setPeriodos(novosPeriodos);
        setIdPeriodo(idPeriodo + 1);
        limparFormulario();
    }

    function excluirPeriodo(evt) {
        const elemID = evt.currentTarget.closest('tr').firstChild.innerText;

        const novosPeriodos = periodos.filter(periodo => periodo.idPeriodo == elemID);
        
        setPeriodos(novosPeriodos);

        localStorage.setItem("periodos", JSON.stringify([novosPeriodos, idPeriodo]));
    }

    function editarPeriodo(evt) {
        const elemID = evt.currentTarget.closest('tr').firstChild.innerText;

        const periodo = periodos.find(periodo => periodo.idPeriodo == elemID);
        
        setIdPeriodo(periodo.idPeriodo);
        setNumeroPeriodo(periodo.numeroPeriodo);
        setSemestrePeriodo(periodo.semestrePeriodo);
        setDataInicio(periodo.dataInicio);
        setDataFim(periodo.dataFim);
        setTurno(periodo.turno);
        setCurso(periodo.curso);

        setExibirExcluir(false);

        document.querySelector('#btnCadastro').style.display = 'none';
        document.querySelector('#btnSalvar').style.display = 'block';
    }

    function salvarPeriodo() {
        const periodo = {
            idPeriodo: idPeriodo,
            numeroPeriodo: numeroPeriodo,
            semestrePeriodo: semestrePeriodo,
            dataInicio: dataInicio,
            dataFim: dataFim,
            turno: turno,
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

    return (
        <>
            <div className="formContainer">
                <div className="inputCombo">
                    <label>ID</label>
                    <input id="idPeriodo" readOnly value={idPeriodo}></input>
                </div>
                <div className="inputCombo">
                    <label>Número do Período</label>
                    <input id="numeroPeriodo" value={numeroPeriodo} onChange={evt => setNumeroPeriodo(evt.target.value)}></input>
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
                    <label>Turno</label>
                    <select id="turno" value={turno} onChange={evt => setTurno(evt.target.value)}>
                        <option value="matutino">Matutino</option>
                        <option value="vespertino">Vespertino</option>
                        <option value="noturno">Noturno</option>
                    </select>
                </div>
                <div className="inputCombo">
                    <label>Curso</label>
                    <input id="curso" value={curso} onChange={evt => setCurso(evt.target.value)}></input>
                </div>

                <button id='btnCadastro' className='btnCadastro' onClick={cadastrarPeriodo}>Cadastrar</button>
                <button id='btnSalvar' className='btnCadastro' onClick={salvarPeriodo} style={{ display: 'none' }}>Salvar</button>
            </div>

            <div className='dataSpace'>
                <tr>
                    <th>ID do Período</th>
                    <th>Número do Período</th>
                    <th>Semestre do Período</th>
                    <th>Data de Início</th>
                    <th>Data de Fim</th>
                    <th>Turno</th>
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
                        <td>{periodo.turno}</td>
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
