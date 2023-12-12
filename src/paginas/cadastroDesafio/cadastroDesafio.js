

import { useEffect, useState } from "react";
import data from '../../componentes/recursos/data';
import './cadastroDesafio.css'
import PopUp from "../../componentes/popup/popup";

function CadDesafio(){

    function carrega(){
        const desafios = localStorage.getItem('desafios')
        return desafios ? JSON.parse(desafios) : [[], 1];
}

const [exibirExcluir, setExibirExcluir] = useState(true)


    const [isAlertaAtivo, setIsAlertaAtivo] = useState(false);

    const alternarAlerta = () => {
        setIsAlertaAtivo(!isAlertaAtivo);
      };




    const aux = carrega()
    const [desafios, setDesafios] = useState(aux[0]);

    const [opcoesPeriodos, setOpcoesPeriodos] = useState([]);
    const [opcoesProfessores, setOpcoesProfessores] = useState([]);
    const [opcoesSalas, setOpcoesSalas] = useState([]);
    
    
    
    const [idDesafio, setIdDesafio] = useState(aux[1])
    const [nomeDesafio, setNomeDesafio] = useState('')
    const [periodos, setPeriodos] = useState('')
    const [professor, setProfessor] = useState('')
    const [dtInicioDesafio, setDtInicioDesafio] = useState(data.hoje())
    const [dtFimDesafio, setDtFimDesafio] = useState(data.hoje())
    const [diaSemana, setDiaSemana] = useState('')
    const [horario, setHorario] = useState('')
    const [sala, setSala] = useState('')

    function limpaForm(){
        setNomeDesafio('')
        setPeriodos('')
        setProfessor('') 
        setDtInicioDesafio(data.hoje())
        setDtFimDesafio(data.hoje())
        setDiaSemana('')
        setHorario('')
        setSala('')
    }

    
    function cadastrar() {

        if (
            nomeDesafio == '' || 
            periodos == '' || 
            professor == '' ||  
            diaSemana == '' || 
            horario == '' || 
            sala == ''){
                alternarAlerta()
                
            }else{
                const novoDesafio = {
                    idDesafio: idDesafio,
                    nomeDesafio: nomeDesafio,
                    periodos: periodos.join(' | '),
                    professor: professor,
                    dtInicioDesafio: data.formatarParaDiaMesAno(dtInicioDesafio),
                    dtFimDesafio: data.formatarParaDiaMesAno(dtFimDesafio),
                    diaSemana: diaSemana,
                    horario: horario,
                    sala: sala,
                    
                } 
        
                const newDesafios = [ ...desafios, novoDesafio]
        
                localStorage.setItem("desafios", JSON.stringify([newDesafios, idDesafio + 1]));
                setDesafios(newDesafios)
                setIdDesafio (idDesafio + 1)
                limpaForm()
                
            }
    }
    
    function excluir(evt){
        const elemID = evt.target.parentElement.parentElement.firstChild.innerText
        const novosDesafios = desafios.filter(desafio => desafio.idDesafio != elemID);
        
            setDesafios (novosDesafios)
            localStorage.setItem("desafios", JSON.stringify([novosDesafios, idDesafio]));
            
        
    }
    
    function editar(evt){
        
        const elemID = evt.target.parentElement.parentElement.firstChild.innerText
        let index = 0
        const i = desafios.find(desafio => desafio.idDesafio == elemID)

        setIdDesafio(i.idDesafio)
        setNomeDesafio(i.nomeDesafio)
        setPeriodos(i.periodos.split(' | '))
        setProfessor(i.professor) 
        setDtInicioDesafio(data.formatarParaAnoMesDia(i.dtInicioDesafio))
        setDtFimDesafio(data.formatarParaAnoMesDia(i.dtFimDesafio))
        setDiaSemana(i.diaSemana)
        setHorario(i.horario)
        setSala(i.sala)


        setExibirExcluir(false)
        
        document.querySelector('#btnCadastro').style.display = 'none'
        document.querySelector('#btnSalvar').style.display = 'block'
       
        
    }
    
    function salvar(){

        if (
            nomeDesafio == '' || 
            periodos == '' || 
            professor == '' ||  
            diaSemana == '' || 
            horario == '' || 
            sala == ''){
                alternarAlerta()
                
            }else{
                const desafio = {
                    idDesafio: idDesafio,
                    nomeDesafio: nomeDesafio,
                    periodos: periodos.join(' | '),
                    professor: professor,
                    dtInicioDesafio: data.formatarParaDiaMesAno(dtInicioDesafio),
                    dtFimDesafio: data.formatarParaDiaMesAno(dtFimDesafio),
                    diaSemana: diaSemana,
                    horario: horario,
                    sala: sala,
                    
                } 
        
                const novosDesafios = desafios.map(d => (d.idDesafio === desafio.idDesafio ? desafio : d));
                
                let index = 0
                const copiaDesafios = [...desafios]
                copiaDesafios.map(i => {
                    if (i.idDesafio == desafio.idDesafio) {
                        copiaDesafios[copiaDesafios.indexOf(i)] = desafio
                    }else{
                        index ++
                    }})
        
                setDesafios(copiaDesafios)
        
                localStorage.setItem("desafios", JSON.stringify([copiaDesafios, aux[1] ]));
                setIdDesafio(aux[1])
                limpaForm()
        
                setExibirExcluir(true)
        
                document.querySelector('#btnSalvar').style.display = 'none'
                document.querySelector('#btnCadastro').style.display = 'block'

            }

    }

    const handlePeriodosChange = (evt) => {
        const { value, checked } = evt.target;
        console.log(checked);
        console.log(value);
    
        // Se o checkbox foi marcado, adiciona ao array; caso contrário, remove
        setPeriodos((prevPeriodos) =>
          checked ? [...prevPeriodos, value] : prevPeriodos.filter((periodos) => periodos !== value)
        );

        console.log(periodos);
        
      };

    useEffect(() => {    
        const listaPeriodos = JSON.parse(localStorage.getItem('periodos'))[0] || [];
        const listaProfessores = JSON.parse(localStorage.getItem('professores'))[0] || [];
        const listaSalas = JSON.parse(localStorage.getItem('salas'))[0] || [];
        setOpcoesPeriodos(listaPeriodos)
        setOpcoesProfessores(listaProfessores)
        setOpcoesSalas(listaSalas)
        

        
    },[])
    
    return(
            <>
            
            {isAlertaAtivo &&  <PopUp interruptor={alternarAlerta}/>}

            <div className="formContainer">

                <div className="inputCombo">
                    <label>ID</label>
                    <input id="IdDesafio"  value={idDesafio} onChange={evt => setIdDesafio(evt.target.value)} ></input>
                </div>
                <div className="inputCombo">
                    <label>Nome do desafio</label>
                    <input id="nomeDesafio" value={nomeDesafio} onChange={evt => setNomeDesafio(evt.target.value)} ></input>
                </div>
                <div className="inputCombo">
                    <label>Períodos</label>

                    <div className="periodosDropdownButton">

                        <span>Passe o mouse</span>
                        <span>selecione ao menos uma opção</span>
                    <div className="periodoCheckboxBody">
                        
                        {opcoesPeriodos.map((opcao, index) => {
                            return(
                            <div className="checkCombo">
                            <input
                            type="checkbox"
                            id={`${opcao.idPeriodo}, ${opcao.numeroPeriodo} periodo, ${opcao.curso}`}
                            value={`${opcao.idPeriodo}, ${opcao.numeroPeriodo} periodo, ${opcao.curso}`}
                            onChange={handlePeriodosChange}
                            checked={periodos.includes(`${opcao.idPeriodo}, ${opcao.numeroPeriodo} periodo, ${opcao.curso}`)}
                            />
                            <label htmlFor={`${opcao.idPeriodo}, ${opcao.numeroPeriodo} periodo, ${opcao.curso}`}>{opcao.idPeriodo}, {opcao.numeroPeriodo} periodo, {opcao.curso}</label>
                            </div>
                            )
                        })}
                    </div>

                    </div>
                </div>

                <div className="inputCombo">
                    <label>Professor</label>
                    <select  id="professor" value={professor} onChange={evt => setProfessor(evt.target.value)} >
                        <option value="">--- Selecione uma opção ---</option>
                        {opcoesProfessores.map((opcao, index) => {
                            return(
                            <option key={index} value={opcao.nomeProfessor}>
                                {opcao.nomeProfessor}
                            </option>

                            )
                        })}
                    </select>
                </div>
                <div className="inputCombo">
                    <label>Data de Início</label>
                    <input type="date" id="dtInicio" value={dtInicioDesafio} onChange={evt => setDtInicioDesafio(evt.target.value)} ></input>
                </div>
                <div className="inputCombo">
                    <label>Data de Fim</label>
                    <input type="date" id="dtFim" value={dtFimDesafio} onChange={evt => setDtFimDesafio(evt.target.value)} ></input>
                </div>
                <div className="inputCombo">
                    <label>Dia da semana</label>

                    <select  id="diaSemana" value={diaSemana} onChange={evt => setDiaSemana(evt.target.value)}>
                        <option value="">--- Selecione uma opção ---</option>
                        <option value="Segunda-feira">Segunda-feira</option>
                        <option value="Terça-feira">Terça-feira</option>
                        <option value="Quarta-feira">Quarta-feira</option>
                        <option value="Quinta-feira">Quinta-feira</option>
                        <option value="Sexta-feira">Sexta-feira</option>
                        <option value="Sábado">Sábado</option>
                        <option value="Domingo">Segunda-feira</option>
                    </select>
                </div>
                <div className="inputCombo">
                    <label>Horário</label>
                    <input type="time" id="horario" value={horario} onChange={evt => setHorario(evt.target.value)} ></input>
                </div>
                <div className="inputCombo">
                    <label>Sala</label>
                    <select id="sala" value={sala} onChange={evt => setSala(evt.target.value)} >
                        <option value="">--- Selecione uma opção ---</option>
                        {opcoesSalas.map((opcao, index) => {
                            console.log(opcao.idCurso);
                            return(
                            <option key={index} value={`${opcao.numero}, ${opcao.andar} andar, ${opcao.predio}`}>
                                {opcao.numero}, {opcao.andar} andar, {opcao.predio}
                            </option>

                            )
                        })}
                    </select>
                </div>
                

            <button id='btnCadastro' className ='btnCadastro' onClick={cadastrar}>Cadastrar</button>
            <button id='btnSalvar' className ='btnCadastro' onClick={salvar} style={{display: 'none'}}>Salvar</button>
            </div>

            
            <div className='dataSpace'>
            <h2 className='titulo'> Cadastro de Desafio</h2>
            <tr>
                <th>ID do desafio</th>
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

            {
                desafios.map(i =>{
                    return (
                        <tr>
                            <td>{i.idDesafio}</td>
                            <td>{i.nomeDesafio}</td>
                            <td>{i.periodos}</td>
                            <td>{i.professor}</td>
                            <td>{i.dtInicioDesafio}</td>
                            <td>{i.dtFimDesafio}</td>
                            <td>{i.diaSemana}</td>
                            <td>{i.horario}</td>
                            <td>{i.sala}</td>
                            
                        <td><button onClick={editar}>Editar</button></td>
                        <td>{exibirExcluir && (<button onClick={excluir}>Excluir</button>)}</td>
                        </tr>
                        
                    )
                })
            }

        </div>
            </>
    )
}



 
export default CadDesafio;

