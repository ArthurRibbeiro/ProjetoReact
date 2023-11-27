

import { useState } from "react";

function CadDesafio(){

    function carrega(){
        const desafios = localStorage.getItem('desafios')
        return desafios ? JSON.parse(desafios) : [[], 1];
}

const [exibirExcluir, setExibirExcluir] = useState(true)

    const aux = carrega()
    const [desafios, setDesafios] = useState(aux[0]);
    
    
    
    const [idDesafio, setIdDesafio] = useState(aux[1])
    const [nomeDesafio, setNomeDesafio] = useState('')
    const [periodo, setPeriodo] = useState('')
    const [professor, setProfessor] = useState('')
    const [dtInicioDesafio, setDtInicioDesafio] = useState('')
    const [dtFimDesafio, setDtFimDesafio] = useState('')
    const [diaSemana, setDiaSemana] = useState('')
    const [horario, setHorario] = useState('')
    const [sala, setSala] = useState('')

    function limpaForm(){
        setNomeDesafio('')
        setPeriodo('')
        setProfessor('') 
        setDtInicioDesafio('')
        setDtFimDesafio('')
        setDiaSemana('')
        setHorario('')
        setSala('')
    }

    
    function cadastrar() {
        const novoDesafio = {
            idDesafio: idDesafio,
            nomeDesafio: nomeDesafio,
            periodo: periodo,
            professor: professor,
            dtInicioDesafio: dtInicioDesafio,
            dtFimDesafio: dtFimDesafio,
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
        setPeriodo(i.periodo)
        setProfessor(i.professor) 
        setDtInicioDesafio(i.dtInicioDesafio)
        setDtFimDesafio(i.dtFimDesafio)
        setDiaSemana(i.diaSemana)
        setHorario(i.horario)
        setSala(i.sala)


        setExibirExcluir(false)
        
        document.querySelector('#btnCadastro').style.display = 'none'
        document.querySelector('#btnSalvar').style.display = 'block'
       
        
    }
    
    function salvar(){

        const desafio = {
            idDesafio: idDesafio,
            nomeDesafio: nomeDesafio,
            periodo: periodo,
            professor: professor,
            dtInicioDesafio: dtInicioDesafio,
            dtFimDesafio: dtFimDesafio,
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

        localStorage.setItem("desafio", JSON.stringify([copiaDesafios, aux[1] ]));
        setIdDesafio(aux[1])
        limpaForm()

        setExibirExcluir(true)

        document.querySelector('#btnSalvar').style.display = 'none'
        document.querySelector('#btnCadastro').style.display = 'block'


    }
    
    return(
            <>
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
                    <input id="periodos" value={periodo} onChange={evt => setPeriodo(evt.target.value)} ></input>
                </div>
                <div className="inputCombo">
                    <label>Professor</label>
                    <input id="professor" value={professor} onChange={evt => setProfessor(evt.target.value)} ></input>
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
                    <input id="diaSemana" value={diaSemana} onChange={evt => setDiaSemana(evt.target.value)} ></input>
                </div>
                <div className="inputCombo">
                    <label>Horário</label>
                    <input id="horario" value={horario} onChange={evt => setHorario(evt.target.value)} ></input>
                </div>
                <div className="inputCombo">
                    <label>Sala</label>
                    <input id="sala" value={sala} onChange={evt => setSala(evt.target.value)} ></input>
                </div>
                

            <button id='btnCadastro' className ='btnCadastro' onClick={cadastrar}>Cadastrar</button>
            <button id='btnSalvar' className ='btnCadastro' onClick={salvar} style={{display: 'none'}}>Salvar</button>
            </div>

            
            <div className='dataSpace'>
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
                            <td>{i.periodo}</td>
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

