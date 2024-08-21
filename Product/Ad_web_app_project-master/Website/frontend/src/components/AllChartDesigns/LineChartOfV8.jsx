import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import LineChartContext from '../../context/LineChartContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
  );

const options = {
    responsive: true,
    options: {
        transitions: {
          zoom: {
            animation: {
              duration: 1000,
              easing: 'easeOutCubic'
            }
          }
        },
       
      },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'CO2 emissions by country (https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021)',
      },
      subtitle: {
        display: true,
        text: 'Custom Chart Subtitle'
    },
    scales: {
        xAxes: 
        [{
          type: 'time',
        }],
        yAxes: 
        [
          {stacked: true}
        ]
      }      
,
      zoom: {
        zoom: {
          wheel: {
            enabled: true
          },
          mode: "xy",
          speed: 100
        },
        pan: {
          enabled: true,
          mode: "xy",
          speed: 100
        }
      },
      
    },
};



function LineChartOfV8() {

    let {allDataOfV8, fetchAllDataOfV8} = useContext(LineChartContext); 
    

    useEffect(() => {
        fetchAllDataOfV8();
    },[]);
    
//Get years data for visualization
let years = allDataOfV8.map((data) => data.time);


//Loop for the number of countries
for (let i = 0; i < allDataOfV8.length; i++)
{
var countriesNumber = allDataOfV8[i].countries.length
}

//Array to loop over data
let dataArray =[];

//Array to loop over random colors
let colorArray = [];
//Array to loop over names
let nameArray = [];
//Function for random colors, (PS.colors can repeat(fix this if possible?))
let randomColors = () => 
{
  let r = Math.floor(Math.random()*255)
  var g = Math.floor(Math.random()*255)
  var b = Math.floor(Math.random()*255)

return "rgb("+r+","+g+","+b+")";

}

// Function to filter duplicate values off arrays
let Filter = (arr) =>
{
 let result = arr.filter((element, i) => arr.indexOf(element) === i)

 return result;
};


//Iteration i loop from 0 to all countries 
for (let i = 0; i < countriesNumber; i++) 
{

 let datatoArray = allDataOfV8.map((value) => 
  ( 
    {
      x: value.time,
      y: value.countries[i],
    }
  ));
  //Get countrynames for visualization
   let countryNames = allDataOfV8.map((data) => data.countryNames[i]);
  
  //Pushing values from the loop to the outside array
  colorArray.push(randomColors());
  dataArray.push(datatoArray)
  nameArray.push(Filter(countryNames))
};

  //Data to the graph
  const data = {
        labels: years,
        datasets: dataArray.map((data,i) => (
            {
                label: nameArray[i],
                data:  dataArray[i],
                borderColor: colorArray[i],
                backgroundColor: colorArray[i],
            }
            
            ))
    };




  return (
    <div>
        <div className="p-10" style={{width: '90%', margin: "auto", border: "3px solid black", borderRadius: 4, marginBottom: 10, backgroundColor: "white"}}>
            <Line options={options}  data={data} />
            <h3 className='text-black font-bold text-2xl my-5 text-center'> Description </h3>
            <p style={{textAlign: "left", color: 'black', marginBottom: 5}}>  
            The chart shows the input of CO2 to the atmosphere by emissions from human activities, balanced by output (storage) in the carbon reservoirs on land or in the ocean. Thanks to the Global Carbon Budget, the research community can better understand and monitor the global carbon cycle, while the report prodives a highly valuable resource within a climate policy framework.

            The Global Carbon Budget is done by the researchers of the Global Carbon Project (GCP), including scientists from the ICOS community.
            </p>
            <p> <span style={{fontWeight: "bold"}}> Link to data source for description: </span> </p>
            <div><a href="https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D" className='underline text-sky-600 font-bold'>Link to Data (Click to get)</a></div>
           
        </div>
    </div>
  )
}

export default LineChartOfV8