import http from "../http-common";

const getTotalPR = () => {
    return http.get("/v1/total/pr/");
};

const getTotalBrazil = () => {
    return http.get("/v1/total/brazil/");
};

export default {
    getTotalPR,
    getTotalBrazil,
};