import { useState } from "react";
import PopUp from "../../componentes/popup/popup";

function CadProfessor() {
    function carregar() {
        const professores = localStorage.getItem('professores');
        return professores ? JSON.parse(professores) : [[], 1];
    }

    const [exibirExcluir, setExibirExcluir] = useState(true)

    const [isAlertaAtivo, setIsAlertaAtivo] = useState(false);
    const alternarAlerta = () => {
        setIsAlertaAtivo(!isAlertaAtivo);
      };

    const aux = carregar();

    const [professores, setProfessores] = useState(aux[0]);

    const [idProfessor, setIdProfessor] = useState(aux[1]);
    const [nomeProfessor, setNomeProfessor] = useState('');
    const [matricula, setMatricula] = useState('');
    const [telefoneCelular, setTelefoneCelular] = useState('');


    function limparFormulario() {
        setNomeProfessor('');
        setMatricula('');
        setTelefoneCelular('');
    }

    function cadastrarProfessor() {

        
        if (nomeProfessor == '' ||
        matricula == '' ||
        telefoneCelular == ''){
            alternarAlerta()
        }else{
            const novoProfessor = {
                idProfessor: idProfessor,
                nomeProfessor: nomeProfessor,
                matricula: matricula,
                telefoneCelular: telefoneCelular,
            };
    
            const novosProfessores = [...professores, novoProfessor];
    
            localStorage.setItem("professores", JSON.stringify([novosProfessores, idProfessor + 1]));
            setProfessores(novosProfessores);
            setIdProfessor(idProfessor + 1);
            limparFormulario();

        }


    }

    function excluirProfessor(evt) {
        const elemID = evt.target.parentElement.parentElement.firstChild.innerText;

        const novosProfessores = professores.filter(professor => professor.idProfessor != elemID);
        
        setProfessores(novosProfessores);

        localStorage.setItem("professores", JSON.stringify([novosProfessores, idProfessor]));
    }

    function editarProfessor(evt) {
        const elemID = evt.target.parentElement.parentElement.firstChild.innerText;

        const professor = professores.find(professor => professor.idProfessor == elemID);
        
        setIdProfessor(professor.idProfessor);
        setNomeProfessor(professor.nomeProfessor);
        setMatricula(professor.matricula);
        setTelefoneCelular(professor.telefoneCelular);

        setExibirExcluir(false)

        document.querySelector('#btnCadastro').style.display = 'none';
        document.querySelector('#btnSalvar').style.display = 'block';
    }

    function salvarProfessor() {

        if (nomeProfessor == '' ||
        matricula == '' ||
        telefoneCelular == ''){
            alternarAlerta()
        }else{
            const professor = {
                idProfessor: idProfessor,
                nomeProfessor: nomeProfessor,
                matricula: matricula,
                telefoneCelular: telefoneCelular,
            };
    
            const novosProfessores = professores.map(p => (p.idProfessor === professor.idProfessor ? professor : p));
            setProfessores(novosProfessores);
    
            localStorage.setItem("professores", JSON.stringify([novosProfessores, aux[1]]));
            setIdProfessor(aux[1]);
            limparFormulario();
    
            setExibirExcluir(true)
    
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
                    <input id="idProfessor" readOnly value={idProfessor}></input>
                </div>
                <div className="inputCombo">
                    <label>Nome do Professor</label>
                    <input id="nomeProfessor" value={nomeProfessor} onChange={evt => setNomeProfessor(evt.target.value)}></input>
                </div>
                <div className="inputCombo">
                    <label>Matrícula</label>
                    <input id="matricula" value={matricula} onChange={evt => setMatricula(evt.target.value)}></input>
                </div>
                <div className="inputCombo">
                    <label>Telefone Celular</label>
                    <input type="number" id="telefoneCelular" value={telefoneCelular} onChange={evt => setTelefoneCelular(evt.target.value)}></input>
                </div>
                <button id='btnCadastro' className='btnCadastro' onClick={cadastrarProfessor}>Cadastrar</button>
                <button id='btnSalvar' className='btnCadastro' onClick={salvarProfessor} style={{ display: 'none' }}>Salvar</button>
            </div>

            <div className='dataSpace'>
            <h2 className='titulo'> Cadastro de Professor</h2>
                <tr>
                    <th>ID do Professor</th>
                    <th>Nome do Professor</th>
                    <th>Matrícula</th>
                    <th>Telefone Celular</th>
                    <th className='thHidden'>hidden</th>
                    <th className='thHidden'>hidden</th>
                </tr>
                {professores.map(professor => (
                    <tr key={professor.idProfessor}>
                        <td>{professor.idProfessor}</td>
                        <td>{professor.nomeProfessor}</td>
                        <td>{professor.matricula}</td>
                        <td>{professor.telefoneCelular}</td>
                        <td><button onClick={editarProfessor}>Editar</button></td>
                        <td>{exibirExcluir && (<button onClick={excluirProfessor}>Excluir</button>)}</td>
                    </tr>
                ))}
            </div>
        </>
    );
}

export default CadProfessor;