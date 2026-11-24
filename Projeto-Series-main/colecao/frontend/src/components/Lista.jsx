function Lista({ series, busca, setBusca }) {
  const seriesFiltradas = series.filter((serie) =>
    serie.titulo.toLowerCase().includes(busca.toLowerCase())
  );
 
  return (
    <section className="lista">
      <h2>Minha coleção</h2>
 
      <input
        type="text"
        placeholder="Buscar série pelo título..."
        value={busca}
        onChange={(evento) => setBusca(evento.target.value)}
      />
 
      <div className="itens-lista">
        {seriesFiltradas.length > 0 ? (
          seriesFiltradas.map((serie) => (
            <article className="item-serie" key={serie.id}>
              <h3>{serie.titulo}</h3>
              <p>Plataforma: {serie.plataforma}</p>
              <p>Ano: {serie.ano}</p>
              <p>Avaliação: {serie.avaliacao}</p>
            </article>
          ))
        ) : (
          <p>
            {busca
              ? "Nenhum item encontrado"
              : "Nenhuma série cadastrada ainda."}
          </p>
        )}
      </div>
    </section>
  );
}
 
export default Lista;