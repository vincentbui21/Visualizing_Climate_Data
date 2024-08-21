import { createContext } from "react";
import { useState } from "react";



const ChartContext = createContext({
    charts: [],
    addChart: (id) => {},
    deleteChart: (id) => {},
    setBackArray: () => {},
    layouts: []
});

export const ChartProvider = ({children}) => { 

    let [charts, setCharts] = useState([]);
    let [layouts, setLayouts] = useState([
        {
            "id": 1,
            "layout": "Layout 1",
            "description": "First layout"
        },

    ]);

    let addChart = (id) => {
        setCharts((prevCharts) => {
            return [...prevCharts, id]
        });
    };

    let deleteChart = (id) => {
        setCharts((prevCharts) => {
            return prevCharts.filter((chartId) => chartId !== id);
        })
    };

    let setBackArray = () => {
        setCharts([]);
    };


    return (<ChartContext.Provider value={{
        charts: charts,
        layouts: layouts,
        addChart: addChart,
        deleteChart: deleteChart,
        setBackArray: setBackArray
    }}>
        {children}
    </ChartContext.Provider>)
};

export default ChartContext;