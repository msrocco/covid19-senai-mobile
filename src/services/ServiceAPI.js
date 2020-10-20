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

const getTwitterData = (keyword, page) => {
  return http.get(`/v1/tweets/${keyword}?page=${page}`)
}

export default {
  getTotalPR,
  getTotalBrazil,
  getGrafico,
  getGraficoMortes,
  getGraficoInfectadosPorIdade,
  getGraficoInfectadosPorGenero,
  getTwitterData
};
