import axios from "axios";

export default {
    getFacturations: function() {
        return axios.get('api/FitnetManager/rest/billingMode', {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Basic " + process.env.FITNET_AUTHORIZATION
                }
            })
            .then(response => {
                return response;
            })
            .catch(e => {
                console.log(e);
            })
    }
}