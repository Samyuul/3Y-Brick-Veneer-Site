import http from "../http-common";

const getStock = (id) => {
    return http.get(`/stock/${id}`);
}

const StockService = {
    getStock
};

export default StockService;