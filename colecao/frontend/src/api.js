
const API_URL = "http://127.0.0.1:8000/api/series/";
export async function cadastrarSerieAPI(novaSerie) {
  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novaSerie),
});
  if (resposta.status === 400) {
    throw new Error(
      "Ano ou avaliação fora dos limites permitidos."
    );
}
  if (!resposta.ok) {
    throw new Error("Não foi possível cadastrar a série.");
}
  return await resposta.json();
}
export async function buscarResumoAPI() {
  const resposta = await fetch(API_URL + "resumo/");

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar o resumo.");
  }

  return await resposta.json();
}//pessoal do back pfvr verifica isso, e a mensagem de erro conecetada a parte de vcs, um beijo colegas
