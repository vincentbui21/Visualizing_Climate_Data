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
          text: 'Vostok Ice Core CO2 measurements, 417160 - 2342 years (https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2)',
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
  

function LineChartOfV5() {

    let {allDataOfV5, fetchAllDataOfV5} = useContext(LineChartContext);

    useEffect(() => {
        fetchAllDataOfV5();
    },[]);

    let yearLabels = allDataOfV5.map((value) => value.meanAgeOfAir);

    let mapDataValue = allDataOfV5.map((value) => ({
        x: value.meanAgeOfAir,
        y: value.carbondioxideConcen
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
            
            <p style={{textAlign: "left", color: 'black', marginBottom: 5}}>There is a close correlation between Antarctic temperature and atmospheric concentrations of CO2 (Barnola et al. 1987). The extension of the Vostok CO2 record shows that the main trends of CO2 are similar for each glacial cycle. Major transitions from the lowest to the highest values are associated with glacial-interglacial transitions. During these transitions, the atmospheric concentrations of CO2 rises from 180 to 280-300 ppmv (Petit et al. 1999). The extension of the Vostok CO2 record shows the present-day levels of CO2 are unprecedented during the past 420 kyr. Pre-industrial Holocene levels (~280 ppmv) are found during all interglacials, with the highest values (~300 ppmv) found approximately 323 kyr BP. When the Vostok ice core data were compared with other ice core data (Delmas et al. 1980; Neftel et al. 1982) for the past 30,000 - 40,000 years, good agreement was found between the records: all show low CO2 values [~200 parts per million by volume (ppmv)] during the Last Glacial Maximum and increased atmospheric CO2 concentrations associated with the glacial-Holocene transition. According to Barnola et al. (1991) and Petit et al. (1999) these measurements indicate that, at the beginning of the deglaciations, the CO2 increase either was in phase or lagged by less than ~1000 years with respect to the Antarctic temperature, whereas it clearly lagged behind the temperature at the onset of the glaciations.</p>
            <p> <span style={{fontWeight: "bold"}}> Link to data source for description: </span> </p>
            <div><a href="https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html" className='underline text-sky-600 font-bold'>Link to Data (Click to get)</a></div>
          
        </div>
    </div>
  )
}

export default LineChartOfV5