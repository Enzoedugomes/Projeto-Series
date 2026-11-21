
function Lista ({ series, busca, setBusca }) { //Criando função Lista, props nas chaves //oi amg essa parte eu soh mudei pq tava faltando uma chave mas de resto tudo certo
  const seriesFiltradas = series.filter((serie) => //filtrando séries com array
    serie.titulo.toLowerCase().includes(busca.toLowerCase()) //toLowerCase para transformar texto em letras mínusculas
  );

  return (//return padrão, sessão, e classe "lista"; 
    <section className="lista"> 
      <h2>Minha coleção</h2> 

      <input //recebe dados
        type="text" //tipo de dado
        placeholder="Buscar série pelo título..." //texto na barra de busca
        value={busca} //barra de busca
        onChange={(evento) => setBusca(evento.target.value)} //atualização de pesquisa
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
