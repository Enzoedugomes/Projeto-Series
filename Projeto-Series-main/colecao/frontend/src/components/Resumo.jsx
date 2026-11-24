function Resumo({ dados }) {
  const nomeMelhor =
    typeof dados.melhor === "object" && dados.melhor !== null
      ? dados.melhor.titulo
      : dados.melhor;
 
  return (
    <section>
      <h2>Resumo da Coleção</h2>
      <p>Total de séries: {dados.total}</p>
      <p>Média de avaliação: {dados.media_avaliacao.toFixed(2)}</p>
      <p>Melhor série: {nomeMelhor || "Nenhuma série"}</p>
    </section>
  );
}
 
export default Resumo;