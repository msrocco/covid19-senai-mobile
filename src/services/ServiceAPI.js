import http from '../http-common';

const getTotalPR = () => {
  return http.get('/v1/total/pr/');
};

const getTotalBrazil = () => {
  return http.get('/v1/total/brazil/');
};

const getGrafico = (filtro) => {
  return http.get(`/v1/casos/${filtro}`);
};

const getGraficoMortes = (filtro) => {
  return http.get(`/v1/obitos/${filtro}`);
};

const getGraficoInfectadosPorIdade = () => {
  return http.get(`/v1/infectadosPorIdade/`);
};

const getGraficoInfectadosPorGenero = () => {
  return http.get(`/v1/infectadosPorGenero/`);
};

const getGraficoPrevisao = (tag, model, limit) => {
  return http.get(
    `/v1/predicao/casos/?tag=${tag}&model=${model}&limit=${limit}`
  );
};

const getTwitterData = (keyword, page) => {
  return http.get(`/v1/tweets/tabela/${keyword}?page=${page}`);
};

const getGraficoAnalise = (keyword) => {
  return http.get(`/v1/tweets/grafico/analise/${keyword}`);
};

const getGraficoEvolucaoTemporal = (keyword) => {
  return http.get(`/v1/tweets/grafico/evolucaoTemporal/${keyword}`);
};

export default {
  getTotalPR,
  getTotalBrazil,
  getGrafico,
  getGraficoMortes,
  getGraficoInfectadosPorIdade,
  getGraficoInfectadosPorGenero,
  getTwitterData,
  getGraficoPrevisao,
  getGraficoAnalise,
  getGraficoEvolucaoTemporal,
};
