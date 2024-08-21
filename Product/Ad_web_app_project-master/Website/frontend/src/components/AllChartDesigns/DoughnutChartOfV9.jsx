import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import ChartContext from '../../context/LineChartContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);




function DoughnutChartOfV9() {

  let [showHidden, setShowHidden] = useState(true);
  let [getNumber, setGetNumber] = useState();




  const options = {
    responsive: true,
    plugins: {
      legend: 
      {
        position: 'top',
      },
      
     
      title: {
        display: true,
        text: 'CO2 emissions by sectors (%)',
      },
      tooltip:
      { 
        callbacks: 
        {
        label: (context) => {
          return `${context.dataset.labels[context.dataIndex]}: ${context.dataset.data[context.dataIndex]}%`
        },
        afterFooter: () => {
          return "Click to show/hide sub-sectors"
        }

        },
      },
    },

      onClick: (evt, element) => {
        console.log(element)
        setShowHidden(!showHidden);
        setGetNumber(element[0].index);
      },
};
   

  //Get and fetch data from the database

    let {allDataOfV9, fetchAllDataOfV9} = useContext(ChartContext); 
    useEffect(() => {
        fetchAllDataOfV9();
    },[]);
   
    //Get main sectors from the database
     let mainSector = allDataOfV9.map((data) => data.sector);
    //Energy total greenhouse gas submissions
    let energyTotal = allDataOfV9.filter(x => x.sector === "Energy").map(x => x.Share_of_global_greenhouse_gas_emissions).reduce((acc, element) => acc += element, 0);
  
    // Industry total greenhouse gas submissions
    let industryTotal = allDataOfV9.filter(x => x.sector === "Industry ").map(x => x.Share_of_global_greenhouse_gas_emissions).reduce((acc, element) => acc += element, 0);
   
    //Agriculture, Forestry & Land Use total greenhouse gas submissions
    let agricultureTotal = parseFloat(allDataOfV9.filter(x => x.sector === "Agriculture, Forestry & Land Use").map(x => x.Share_of_global_greenhouse_gas_emissions).reduce((acc, element) => acc += element, 0).toFixed(1));
    
    //Waste total greenhouse gas submissions
    let wasteTotal = allDataOfV9.filter(x => x.sector === "Waste").map(x => x.Share_of_global_greenhouse_gas_emissions).reduce((acc, element) => acc += element, 0);
  // Function to filter duplicate values off arrays
    let Filter = (arr) =>
    {
     let result = arr.filter((element, i) => arr.indexOf(element) === i)

     return result;
    };
  // Function for randomized colors
    let randomColors = () => 
    {
      let r = Math.floor(Math.random()*255)
      var g = Math.floor(Math.random()*255)
      var b = Math.floor(Math.random()*255)
    
    return "rgb("+r+","+g+","+b+")";
    
    }
     // Get Array Values of C02 by each sector 
     const getValuesOfSubSector = (id) => {

      let getSectorName = "";

      switch (id) {
        case 0:
          getSectorName = "Energy";
          break;
        case 1: 
          getSectorName = "Industry ";
          break;
        case 2:
          getSectorName = "Agriculture, Forestry & Land Use";
          break;
        case 3:
          getSectorName = "Waste"
          break;
        default:
          break;
      }

      let arrayOfEachSectorName = allDataOfV9.filter(x => x.sector === getSectorName).map(x => x.sub_sector);
      let removeDuplicate = arrayOfEachSectorName.filter((a, b) => arrayOfEachSectorName.indexOf(a) === b);

      let arrayOfValues = [];

      removeDuplicate.forEach((name) => {

          let allValuesOfEachSector = allDataOfV9.filter(x => x.sector === getSectorName).filter(x => x.sub_sector === name).map(x => x.Share_of_global_greenhouse_gas_emissions).reduce((acc, element) => acc += element, 0).toFixed(1);

          arrayOfValues.push(parseFloat(allValuesOfEachSector));

      });

     
      return arrayOfValues;
  };

  //Get Array Values of each sub-sub sector

  const getValuesOfSubSubSector = (id) => {
    let getSectorName = "";

    switch (id) {
      case 0:
        getSectorName = "Energy";
        break;
      case 1: 
        getSectorName = "Industry ";
        break;
      case 2:
        getSectorName = "Agriculture, Forestry & Land Use";
        break;
      case 3:
        getSectorName = "Waste"
        break;
      default:
        break;
    };

    let arrayValues = allDataOfV9.filter(x => x.sector === getSectorName).map(x => x.Share_of_global_greenhouse_gas_emissions);
   
    return arrayValues;
  };

  //Get Array Labels by each sub-sub sector
  const getLabelsOfSubSubSector = (id) => {
    let getSectorName = "";
    switch (id) {
      case 0:
        getSectorName = "Energy";
        break;
      case 1: 
        getSectorName = "Industry ";
        break;
      case 2:
        getSectorName = "Agriculture, Forestry & Land Use";
        break;
      case 3:
        getSectorName = "Waste"
        break;
      default:
        break;
    };

    let arrayLabels = allDataOfV9.filter(x => x.sector === getSectorName).map(x => x.sub_sub_sector);
    return arrayLabels;

  };
  

   //Get Array Labels by each sub sector

   const getLabelsOfSubSector = (id) => {

    let getSectorName = "";
    switch (id) {
      case 0:
        getSectorName = "Energy";
        break;
      case 1: 
        getSectorName = "Industry ";
        break;
      case 2:
        getSectorName = "Agriculture, Forestry & Land Use";
        break;
      case 3:
        getSectorName = "Waste"
        break;
      default:
        break;
    }

    let arrayOfEachSectorName = allDataOfV9.filter(x => x.sector === getSectorName).map(x => x.sub_sector);
    let removeDuplicate = arrayOfEachSectorName.filter((a, b) => arrayOfEachSectorName.indexOf(a) === b);

  
    return removeDuplicate;
  };
  const getColor = (id) => 
  {
    let getSectorName = "";
    let color = []
    switch (id) {
      case 0:
        getSectorName = "Energy";
        for (let i = 0; i < 20; i++)
        {
         let r = 255 
         let g = 240 - 10 *i
         let b = 0 + 6*i
         let Color = `rgb(${r}, ${g}, ${b})`
         color.push(Color)
        }
        break;
      case 1: 
        getSectorName = "Industry ";
        for (let i = 0; i < 2; i++)
        {
         let r = 169
         let g = 169 - 10 *i
         let b = 169
         let Color = `rgb(${r}, ${g}, ${b})`
         color.push(Color)
        }
        break;
      case 2:
        getSectorName = "Agriculture, Forestry & Land Use";
        for (let i = 0; i < 10; i++)
        {
         let r = 0 + 5*i
         let g = 100 + 28 *i
         let b = 0 + 20*i
         let Color = `rgb(${r}, ${g}, ${b})`
         color.push(Color)
        }
        break;
      case 3:
        getSectorName = "Waste"
        for (let i = 0; i < 3; i++)
        {
         let r = 139 + 50*i
         let g = 69 + 50 *i
         let b = 19 + 50*i
         let Color = `rgb(${r}, ${g}, ${b})`
         color.push(Color)
        }
        break;
      default:
        break;
    }
    return color;
  }
// Sector data values
  let sectorData = [Math.round(energyTotal *10)/10,industryTotal, agricultureTotal, wasteTotal];
      const data = {
         labels: Filter(mainSector),
          datasets:
              [{
                  data: sectorData,
                  borderColor: "rgb(0, 0, 0)",
                  backgroundColor: ["rgb(255,255,0)","rgb(169,169,169)","rgb(0,100,0)","rgb(139,69,19)"],
                  labels: Filter(mainSector),
              },
              {
                data: getValuesOfSubSector(getNumber),
                borderColor: "rgba(0,0,0)",
                backgroundColor: getColor(getNumber),
                labels: getLabelsOfSubSector(getNumber),
                hidden: showHidden,
            },
            {
              data: getValuesOfSubSubSector(getNumber),
              borderColor: "rgba(0,0,0)",
              backgroundColor: getColor(getNumber),
              labels: getLabelsOfSubSubSector(getNumber),
              hidden: showHidden,
          },
          
            ]
            
      }
  return (
    <div>
        <div style={{width: '80%', margin: "auto", border: "3px solid black", borderRadius: 4, padding: 10, backgroundColor: "white", alignItems: "center", justifyContent: "center"}}>
            <Doughnut   options={options} data={data} />
            <h3 className='text-black font-bold text-2xl my-5 text-center'> Description </h3>
            <p style={{textAlign: "left", color: 'black', marginBottom: 5}}> 
            This doughmut chart shows the breakdown of global greenhouse gas emissions in 2016.

            t is clear from this breakdown that a range of sectors and processes contribute to global emissions. This means there is no single or simple solution to tackle climate change. Focusing on electricity, or transport, or food, or deforestation alone is insufficient.
            </p>
           
            <p> <span style={{fontWeight: "bold"}}> Link to data source for description: </span> </p>
            <a href="https://ourworldindata.org/uploads/2020/09/Global-GHG-Emissions-by-sector-based-on-WRI-2020.xlsx" className='underline text-sky-600 font-bold'> Link to measurement dataset (Click to get) </a> 
            

        </div>
    </div>
  )
}

export default DoughnutChartOfV9