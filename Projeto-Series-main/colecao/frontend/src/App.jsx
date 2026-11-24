import { useEffect, useState } from "react";
 
import Formulario from "./components/Formulario";
import Lista from "./components/Lista";
import Resumo from "./components/Resumo";
 
import {
  buscarSeriesAPI,
  cadastrarSerieAPI,
  buscarResumoAPI,
} from "./api";
 
import "./App.css";
 
function App() {
  const [series, setSeries] = useState([]);
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [resumoAPI, setResumoAPI] = useState(null);
 
  const USAR_API = true;
 
  async function carregarDados() {
    try {
      const [listaSeries, dadosResumo] = await Promise.all([
        buscarSeriesAPI(),
        buscarResumoAPI(),
      ]);
      setSeries(listaSeries);
      setResumoAPI(dadosResumo);
    } catch (erro) {
      console.error("Erro ao carregar dados:", erro);
    }
  }
 
  useEffect(() => {
    if (!USAR_API) return;
    carregarDados();
  }, []);
 
  async function cadastrarSerie(novaSerie) {
    setCarregando(true);
    setErro("");
 
    try {
      if (USAR_API) {
        await cadastrarSerieAPI(novaSerie);
        await carregarDados();
        return true;
      }
 
      if (
        !novaSerie.titulo ||
        !novaSerie.plataforma ||
        !Number.isInteger(novaSerie.ano) ||
        novaSerie.ano < 1900 ||
        novaSerie.ano > 2026 ||
        !Number.isFinite(novaSerie.avaliacao) ||
        novaSerie.avaliacao < 0 ||
        novaSerie.avaliacao > 10
      ) {
        setErro("Verifique os dados preenchidos.");
        return false;
      }
 
      const serieComId = {
        ...novaSerie,
        id: Date.now(),
      };
 
      setSeries((listaAtual) => [
        ...listaAtual,
        serieComId,
      ]);
 
      return true;
    } catch (erro) {
      setErro(erro.message);
      return false;
    } finally {
      setCarregando(false);
    }
  }
 
  const total = series.length;
 
  const somaAvaliacoes = series.reduce(
    (soma, serie) => soma + Number(serie.avaliacao),
    0
  );
 
  const media = total > 0 ? somaAvaliacoes / total : 0;
 
  const melhor = series.reduce(
    (melhorAtual, serie) =>
      !melhorAtual || serie.avaliacao > melhorAtual.avaliacao
        ? serie
        : melhorAtual,
    null
  );
 
  const dadosResumoLocal = {
    total: total,
    media_avaliacao: media,
    melhor: melhor,
  };
 
  const dadosResumo =
    USAR_API && resumoAPI
      ? resumoAPI
      : dadosResumoLocal;
 
  return (
    <main className="aplicacao">
      <header className="cabecalho">
        <h1>Minha Coleção</h1>
        <p>Organize e acompanhe suas séries favoritas.</p>
      </header>
 
      <Resumo dados={dadosResumo} />
 
      <Formulario
        onCadastrar={cadastrarSerie}
        erro={erro}
        carregando={carregando}
      />
 
      <Lista
        series={series}
        busca={busca}
        setBusca={setBusca}
      />
    </main>
  );
}
 
export default App;