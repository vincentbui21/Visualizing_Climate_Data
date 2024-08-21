import LineChartOfV2 from "../components/AllChartDesigns/LineChartOfV2";
import LineChartOfV3 from "../components/AllChartDesigns/LineChartOfV3";
import LineChartOfV4 from "../components/AllChartDesigns/LineChartOfV4";
import LineChartOfV5 from "../components/AllChartDesigns/LineChartOfV5";
import LineChartOfV6 from "../components/AllChartDesigns/LineChartOfV6";
import LineChartOfV7 from "../components/AllChartDesigns/LineChartOfV7";
import LineChartOfV8 from "../components/AllChartDesigns/LineChartOfV8";
import DoughnutChartOfV9 from "../components/AllChartDesigns/DoughnutChartOfV9";
import { useState } from "react";
import { createContext } from "react";

let arrayScreen = [];
arrayScreen.push({id: "v1v2", item: <LineChartOfV2 />});
arrayScreen.push({id: "v3", item: <LineChartOfV3 />});
arrayScreen.push({id: "v4", item: <LineChartOfV4 />});
arrayScreen.push({id: "v5", item: <LineChartOfV5 />});
arrayScreen.push({id: "v6", item: <LineChartOfV6 />});
arrayScreen.push({id: "v7", item: <LineChartOfV7 />});
arrayScreen.push({id: "v8", item: <LineChartOfV8 />});
arrayScreen.push({id: "v9", item: <DoughnutChartOfV9 />});

const TotalChartsContext = createContext({
    arrayCharts: []
});

export const TotalChartsProvider = ({children}) => {

    let [arrayCharts] = useState(arrayScreen);

    return (<TotalChartsContext.Provider value={{
        arrayCharts: arrayCharts
    }}>
        {children}
    </TotalChartsContext.Provider>)
}

export default TotalChartsContext;