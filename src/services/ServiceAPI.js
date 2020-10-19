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

const getGraficoMortes = () => {
  return http.get(`/v1/obitos/`);
};

const getGraficoInfectadosPorIdade = () => {
  return http.get(`/v1/infectadosPorIdade/`);
};

const getGraficoInfectadosPorGenero = () => {
  return http.get(`/v1/infectadosPorGenero/`);
};

const getTwitterData = (keyword) => {
  return http.get(`/v1/twitter/${keyword}`);
};

export default {
  getTotalPR,
  getTotalBrazil,
  getGrafico,
  getGraficoMortes,
  getGraficoInfectadosPorIdade,
  getGraficoInfectadosPorGenero,
  getTwitterData
};
