import { useState } from "react";
 
function Formulario({ onCadastrar, erro, carregando }) {
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [ano, setAno] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
 
  async function enviarFormulario(evento) {
    evento.preventDefault();
 
    const novaSerie = {
      titulo: titulo.trim(),
      plataforma: plataforma.trim(),
      ano: Number(ano),
      avaliacao: Number(avaliacao),
    };
 
    const sucesso = await onCadastrar(novaSerie);
 
    if (sucesso) {
      setTitulo("");
      setPlataforma("");
      setAno("");
      setAvaliacao("");
    }
  }
 
  return (
    <section className="formulario">
      <h2>Cadastrar nova série</h2>
 
      <form onSubmit={enviarFormulario}>
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          placeholder="Ex.: Stranger Things"
          required
        />
 
        <label htmlFor="plataforma">Plataforma</label>
        <input
          id="plataforma"
          type="text"
          value={plataforma}
          onChange={(evento) => setPlataforma(evento.target.value)}
          placeholder="Ex.: Netflix"
          required
        />
 
        <label htmlFor="ano">Ano</label>
        <input
          id="ano"
          type="number"
          value={ano}
          onChange={(evento) => setAno(evento.target.value)}
          placeholder="Ex.: 2022"
          min="1900"
          max="2026"
          step="1"
          required
        />
 
        <label htmlFor="avaliacao">Avaliação</label>
        <input
          id="avaliacao"
          type="number"
          value={avaliacao}
          onChange={(evento) => setAvaliacao(evento.target.value)}
          placeholder="Ex.: 9.5"
          min="0"
          max="10"
          step="0.1"
          required
        />
 
        {erro && <p className="mensagem-erro">{erro}</p>}
 
        <button type="submit" disabled={carregando}>
          {carregando ? "Cadastrando..." : "Cadastrar série"}
        </button>
      </form>
    </section>
  );
}
 
export default Formulario;