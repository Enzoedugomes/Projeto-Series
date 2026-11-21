function Resumo({ dados }) {
  return (
    <section>
      <h2>Resumo da Coleção</h2> 
      <p>Total de séries: {dados.total}</p>
      <p>Média de avaliação: {dados.media_avaliacao.toFixed(2)}</p> 
      <p>Melhor série: {dados.melhor ? dados.melhor.titulo : "Nenhuma série"}</p>
    </section>
  );
}

export default Resumo; //exporta.. e la em cima pega as informacoes do app.jsx para aparecer na telaS

