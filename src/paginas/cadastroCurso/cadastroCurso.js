

import {useState} from 'react';
import data from '../../componentes/recursos/data';
import PopUp from '../../componentes/popup/popup';


function CadCurso(){    
    
    function carrega(){
            const cursos = localStorage.getItem('cursos')
            return cursos ? JSON.parse(cursos) : [[], 1];
    }
    const [exibirExcluir, setExibirExcluir] = useState(true)

    const [isAlertaAtivo, setIsAlertaAtivo] = useState(false);
    const alternarAlerta = () => {
        setIsAlertaAtivo(!isAlertaAtivo);
      };

    const aux = carrega()
    const [cursos, setCursos] = useState(aux[0]);
    
    const [idCurso, setIdCurso] = useState(aux[1])
    const [nomeCurso, setNomeCurso] = useState('')
    const [dtInicioCurso, setDtInicioCurso] = useState(data.hoje())
    const [nomeCoordCurso, setNomeCoordCurso] = useState('')

    function limpaForm(){
        setNomeCurso('')
        setDtInicioCurso(data.hoje())
        setNomeCoordCurso('')
    }

    function cadastrar() {

        if (nomeCurso == '' || nomeCoordCurso == ''){
            
            alternarAlerta()

        }else{
            
            const novoCurso = {
                idCurso : idCurso,
                nomeCurso: nomeCurso,
                dtInicioCurso: data.formatarParaDiaMesAno(dtInicioCurso),
                nomeCoordCurso: nomeCoordCurso,
            } 
    
            const newCursos = [ ...cursos, novoCurso]
    
            localStorage.setItem("cursos", JSON.stringify([newCursos, idCurso + 1]));
            setCursos(newCursos)
            setIdCurso (idCurso + 1)
            limpaForm()
        }

    }

    function excluir(evt){
        const elemID = evt.target.parentElement.parentElement.firstChild.innerText
        let index = 0
        const copiaCursos = [...cursos]
        copiaCursos.map(i => {
            if (i.idCurso == elemID) {
                copiaCursos.splice(index, 1);
            }else{
                index ++
            }
            setCursos (copiaCursos)
            localStorage.setItem("cursos", JSON.stringify([copiaCursos, idCurso]));
            
        })
    }
    
    function editar(evt){
        
        const elemID = evt.target.parentElement.parentElement.firstChild.innerText
        let index = 0
        const copiaCursos = [...cursos]
        copiaCursos.map(i => {
            if (i.idCurso == elemID) {
                setIdCurso(i.idCurso)
                setNomeCurso(i.nomeCurso)
                setDtInicioCurso(data.formatarParaAnoMesDia(i.dtInicioCurso))
                setNomeCoordCurso(i.nomeCoordCurso)
            }else{
                index ++
            }

            setExibirExcluir(false)
            
            document.querySelector('#btnCadastro').style.display = 'none'
            document.querySelector('#btnSalvar').style.display = 'block'
            
        })
    }
    
    function salvar(){

        if (nomeCurso == '' || nomeCoordCurso == ''){
            
            alternarAlerta()

        }else{
            const curso = {
                idCurso : idCurso,
                nomeCurso: nomeCurso,
                dtInicioCurso: data.formatarParaDiaMesAno(dtInicioCurso),
                nomeCoordCurso: nomeCoordCurso,
            } 
            
            let index = 0
            const copiaCursos = [...cursos]
            copiaCursos.map(i => {
                if (i.idCurso == curso.idCurso) {
                    copiaCursos[copiaCursos.indexOf(i)] = curso
                }else{
                    index ++
                }})
    
            setCursos(copiaCursos)
    
            localStorage.setItem("cursos", JSON.stringify([copiaCursos, aux[1] ]));
            setIdCurso(aux[1])
            limpaForm()
    
            setExibirExcluir(true)
    
    
            document.querySelector('#btnSalvar').style.display = 'none'
            document.querySelector('#btnCadastro').style.display = 'block'
        }
    }
    
    return(
        <>
        {isAlertaAtivo &&  <PopUp interruptor={alternarAlerta}/>}
        <div className="formContainer">
            
            <div className="inputCombo">
                <label>ID</label>
                <input id="idCurso" readOnly  value={idCurso}></input>
            </div>
        
            <div className="inputCombo">
                <label>Nome do curso</label>
                <input id="nomeCurso" value={nomeCurso} onChange={evt => setNomeCurso(evt.target.value)}></input>
            </div>
            <div className="inputCombo">
                <label>Data de início</label>
                <input type='date' min='2023-01-01' max='2024-01-01' id="dtInicioCurso"
                value={dtInicioCurso} onChange={evt => setDtInicioCurso(evt.target.value)}
                ></input>
            </div>
            <div className="inputCombo">
                <label>Nome do Coordenador do curso</label>
                <input id="nomeCoordCurso"  value={nomeCoordCurso} onChange={evt => setNomeCoordCurso(evt.target.value)}></input>
            </div>


            <button id='btnCadastro' className ='btnCadastro' onClick={cadastrar}>Cadastrar</button>
            <button id='btnSalvar' className ='btnCadastro' onClick={salvar} style={{display: 'none'}}>Salvar</button>

        </div>
            <div className='dataSpace'>

            <h2 className='titulo'> Cadastro de Curso</h2>

                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Data inicio</th>
                    <th>Coordenador</th>
                    <th className='thHidden'>hidden</th>
                    <th className='thHidden'>hidden</th>
                </tr>
        

                {cursos.map(i => {
                    return(
                        <tr>
                        <td>{i.idCurso}</td>
                        <td>{i.nomeCurso}</td>
                        <td>{i.dtInicioCurso}</td>
                        <td>{i.nomeCoordCurso}</td>
                        <td><button onClick={editar}>Editar</button></td>
                        <td>{exibirExcluir && (<button onClick={excluir}>Excluir</button>)}</td>
                        </tr>
                    )
                })}

        </div>

        </>
    )
}


 
export default CadCurso;

