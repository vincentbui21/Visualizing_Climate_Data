import React from 'react';
import LineChartOfV8 from '../../AllChartDesigns/LineChartOfV8';
import DoughnutChartOfV9 from '../../AllChartDesigns/DoughnutChartOfV9';
import EachChart from '../../SingleItem/EachChart';

let arrayScreen = [];

arrayScreen.push({id: "v8", item: <LineChartOfV8 />});
arrayScreen.push({id: "v9", item: <DoughnutChartOfV9 />});



function SecondPage() {

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

export default SecondPage