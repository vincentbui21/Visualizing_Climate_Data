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
          text: 'Ice core 800k year composite study CO2 measurements (Data source:https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt)',
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
  

function LineChartOfV6() {

    let {allDataOfV6,  fetchAllDataOfV6} = useContext(LineChartContext);

    useEffect(() => {
        fetchAllDataOfV6();
    },[]);

    let yearLabels = allDataOfV6.map((value) => value.ageGasCal);

    let mapDataValue = allDataOfV6.map((value) => ({
        x: value.ageGasCal,
        y: value.carbondioxidePpm
    }));

    const data = {
        labels: yearLabels,
        datasets: [
            {
                label: "CO2 concentration (ppmv)",
                data: mapDataValue,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
        ]
    }


  return (
    <div>
    <div className="p-10" style={{width: '90%', margin: "auto", border: "3px solid black", borderRadius: 4, marginBottom: 10, backgroundColor: "white"}}>
        <Line options={options}  data={data} />

        <h3 className='text-black font-bold text-2xl my-5 text-center'> Description </h3>
        
            <p style={{textAlign: "left", color: 'black', marginBottom: 5}}> The European Project for Ice Coring in Antarctica Dome ice core from Dome C (EDC) has allowed for the reconstruction of atmospheric CO2 concentrations for the last 800,000 years. Here we revisit the oldest part of the EDC CO2 record using different air extraction methods and sections of the core. For our established cracker system, we found an analytical artifact, which increases over the deepest 200 m and reaches 10.1 +/- 2.4 ppm in the oldest/deepest part. The governing mechanism is not yet fully understood, but it is related to insufficient gas extraction in combination with ice relaxation during storage and ice structure. The corrected record presented here resolves partly - but not completely - the issue with a different correlation between CO2 and Antarctic temperatures found in this oldest part of the records. In addition, we provide here an update of 800,000 years atmospheric CO2 history including recent studies covering the last glacial cycle.
</p>
<p> <span style={{fontWeight: "bold"}}> Link to data source for description: </span> </p>
<div><a href="https://www.ncei.noaa.gov/access/paleo-search/study/17975" className='underline text-sky-600 font-bold'>Link to Data (Click to get)</a></div>

    </div>
</div>
  )
}

export default LineChartOfV6