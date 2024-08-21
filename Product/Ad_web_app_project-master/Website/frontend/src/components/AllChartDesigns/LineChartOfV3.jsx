import React from 'react';
import { useContext } from 'react';
import LineChartContext from '../../context/LineChartContext';
import { useEffect } from 'react';
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
          text: 'Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958 (https://gml.noaa.gov/ccgg/trends/)',
        },
        subtitle: {
          display: true,
          text: 'Custom Chart Subtitle'
      },
      scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
            }
          }],
        }      
  ,
        zoom: {
          zoom: {
            wheel: {
              enabled: true // SET SCROOL ZOOM TO TRUE
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
  

function LineChartOfV3() {

    let {allDataOfV3, fetchAllDataOfV3} = useContext(LineChartContext);
    

    let yearArray = allDataOfV3.map((data) => data.Time);
    let distinctYearArray = yearArray.filter((a, b) => yearArray.indexOf(a) === b);

    let monthlyAverageArray = allDataOfV3.map((data) => ({
        x: data.Time,
        y: data.co2_monthly_avg
    }));

    let annualAverageArray = allDataOfV3.map((data) => ({
        x: data.Time,
        y: data.co2_annual_avg
    }));

   
   
    useEffect(() => {
        fetchAllDataOfV3();
    },[]);

    const data = {
        labels: distinctYearArray,
        datasets: [
            {
                label: "Mauna Loa CO2 monthly mean data",
                data: monthlyAverageArray,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
            {
                label: "Mauna Loa CO2 annual mean data",
                data: annualAverageArray,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            },
        ]
    }

    
  return (
    <div>
    <div className="p-10" style={{width: '90%', margin: "auto", border: "3px solid black", borderRadius: 4, marginBottom: 10, backgroundColor: "white"}}>
        <Line options={options} data={data} />

        <h3 className='text-black font-bold text-2xl my-5 text-center'> Description</h3>
        <p className='text-left mb-5'> 
        We have confidence that the CO2 measurements made at the Mauna Loa Observatory reflect truth about our global atmosphere. The main reasons for that confidence are: 
        </p>
       
            <p className='text-left mb-3'> - The Observatory near the summit of Mauna Loa, at an altitude of 3400 m, is well situated to measure air masses that are representative of very large areas. </p>
            <p className='text-left mb-3'> - All of the measurements are rigorously and very frequently calibrated.  </p>
            <p className='text-left mb-3'> - Ongoing comparisons of independent measurements at the same site allow an estimate of the accuracy, which is generally better than 0.2 ppm. </p>
        

        <p> <span style={{fontWeight: "bold"}}> Link to data source for description: </span> </p>
        <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" className='underline text-sky-600 font-bold'> Link to C02 measurements datasets (Click to get) </a> 
        
    </div>
</div>
  )
}

export default LineChartOfV3
  