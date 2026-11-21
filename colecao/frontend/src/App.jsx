
import { useEffect, useState } from "react";

import Formulario from "./components/Formulario";
import Lista from "./components/Lista";
import Resumo from "./components/Resumo";

import {
  cadastrarSerieAPI,
  buscarResumoAPI,
} from "./api";

import "./App.css";

function App() {
  // Séries fictícias para testar sem o backend
  const [series, setSeries] = useState([
    {
      id: 1,
      titulo: "Dark",
      plataforma: "Netflix",
      ano: 2017,
      avaliacao: 9.5,
    },
    {
      id: 2,
      titulo: "Breaking Bad",
      plataforma: "Netflix",
      ano: 2008,
      avaliacao: 9.8,
    },
  ]);

  // Estados da pesquisa e do formulário
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Estado para armazenar o resumo recebido do Django
  const [resumoAPI, setResumoAPI] = useState(null);

  // Manter false enquanto o backend não estiver pronto
  const USAR_API = false;

  // Buscar o resumo quando a aplicação iniciar
  useEffect(() => {
    if (!USAR_API) return;

    async function carregarResumo() {
      try {
        const dados = await buscarResumoAPI();
        setResumoAPI(dados);
      } catch (erro) {
        console.error("Erro ao carregar resumo:", erro);
      }
    }

    carregarResumo();
  }, []);

  // Cadastra uma nova série na lista
  async function cadastrarSerie(novaSerie) {
    setCarregando(true);
    setErro("");

    try {
      // Envio para o Django quando a API estiver disponível
      if (USAR_API) {
        await cadastrarSerieAPI(novaSerie);

        const dados = await buscarResumoAPI();
        setResumoAPI(dados);

        return true;
      }

      // Validação temporária enquanto não temos Django
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
      // Exibe os erros recebidos da API
      setErro(erro.message);
      return false;
    } finally {
      setCarregando(false);
    }
  }

  // Calcula o resumo das séries
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

  // Usa o resumo do Django quando estiver disponível
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

      {/* Componente de resumo */}
      <Resumo dados={dadosResumo} />

      {/* Componente de cadastro */}
      <Formulario
        onCadastrar={cadastrarSerie}
        erro={erro}
        carregando={carregando}
      />

      {/* Componente de listagem e pesquisa */}
      <Lista
        series={series}
        busca={busca}
        setBusca={setBusca}
      />
    </main>
  );
}

export default App;
