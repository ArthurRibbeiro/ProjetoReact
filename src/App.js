import logo from './logo.svg';
import './App.css';
import Cabecalho from './componentes/cabecalho/cabecalho';

import Rodape from './componentes/rodape/rodape';

import Cadastro from './paginas/cadastro';


function App() {
  return (
    <div className="App">
      <Cabecalho />
      <Cadastro />
      <Rodape />
    </div>
  );
}

export default App;
