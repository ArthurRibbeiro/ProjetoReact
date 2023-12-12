function formatarParaDiaMesAno(inputDate) {
  const dateParts = inputDate.split("-");
  const formattedDate = dateParts.reverse().join("-");
  return formattedDate;
}

// Função para converter de dd-mm-yyyy para yyyy-mm-dd
function formatarParaAnoMesDia(inputDate) {
  const dateParts = inputDate.split("-");
  const formattedDate = dateParts.reverse().join("-");
  return formattedDate;
}

function hoje(){
  const timeElapsed = Date.now();
  const hoje = new Date(timeElapsed).toLocaleDateString().replace('/', '-').replace('/', '-');
  return formatarParaAnoMesDia(hoje);

}

function estaEntre(dataInformada, dataInicio, dataFim) {
  const dataInformadaObj = new Date(dataInformada);
  const dataInicioObj = new Date(dataInicio);
  const dataFimObj = new Date(dataFim);

  // Verifica se a data está entre as duas datas (inclusive)
  return dataInformadaObj >= dataInicioObj && dataInformadaObj <= dataFimObj;
}

export default {hoje, formatarParaDiaMesAno, formatarParaAnoMesDia, estaEntre}