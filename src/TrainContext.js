import React, { createContext, useState } from "react";
import axios from "axios"
export const TrainContext = createContext();

const TrainContextProvider = props => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const runSearch = query => {
        axios.get(`https://huxley.apphb.com/departures/${query}/20?accessToken=7c41e1c0-4543-4fb9-a0eb-f890a4fedc11`)
            .then(resp => {
                setData(resp.data);
                setLoading(false);
            }).catch(error => {
                console.log("An error occurred while loading train data.", error);
            })
    };

    return (
        <TrainContext.Provider value={{data, loading, runSearch}}>
            {props.children}
        </TrainContext.Provider>
    );
};

export default TrainContextProvider;
