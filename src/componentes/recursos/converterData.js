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

export default {formatarParaDiaMesAno, formatarParaAnoMesDia}