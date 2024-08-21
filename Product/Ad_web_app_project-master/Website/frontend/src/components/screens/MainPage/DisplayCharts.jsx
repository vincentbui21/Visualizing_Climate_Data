import React from 'react';
import EachChart from '../../SingleItem/EachChart';
import LineChartOfV2 from '../../AllChartDesigns/LineChartOfV2';
import LineChartOfV3 from '../../AllChartDesigns/LineChartOfV3';
import LineChartOfV4 from '../../AllChartDesigns/LineChartOfV4';
import LineChartOfV5 from '../../AllChartDesigns/LineChartOfV5';
import LineChartOfV6 from '../../AllChartDesigns/LineChartOfV6';
import LineChartOfV7 from '../../AllChartDesigns/LineChartOfV7';



//Array of charts
let arrayScreen = [];
arrayScreen.push({id: "v1v2", item: <LineChartOfV2 />})
arrayScreen.push({id: "v3", item: <LineChartOfV3 />});
arrayScreen.push({id: "v4", item: <LineChartOfV4 />});
arrayScreen.push({id: "v5", item: <LineChartOfV5 />});
arrayScreen.push({id: "v6", item: <LineChartOfV6 />});
arrayScreen.push({id: "v7", item: <LineChartOfV7 />});


//Page to display charts of Atmospheric C02 & temperatures
function DisplayCharts({}) {

  
  return (
    <div className="bg-stone-300 p-5">
        {arrayScreen.map((item) => (
          // <>
          //   <h1 className='text-black text-center text-3xl my-5'> Visualization type: <span> {item.id} </span> </h1>
          //   {item.item}
          // </>
          <EachChart key={item.id} id={item.id} singleItem={item.item}/>
        ))}
    </div>
  )
}

export default DisplayCharts