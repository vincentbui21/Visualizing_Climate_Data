import React from 'react';
import LineChartContext from '../../context/LineChartContext';
import { useContext } from 'react';
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
          text: 'Global historical surface temperature anomalies from January 1850 onwards and the Northern Hemisphere 2,000-year temperature reconstruction',
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
  

function LineChartOfV2() {

    let {allDataOfV2, fetchAllDataOfV2} = useContext(LineChartContext); 
    

    useEffect(() => {
        fetchAllDataOfV2();
    },[]);
    
    let yearArray = allDataOfV2.map((data) => data.Time);
    let distinctYearArray = yearArray.filter((a, b) => yearArray.indexOf(a) === b);
   
    let southMonthlyArray = allDataOfV2.map((data) => ({
        x: data.Time,
        y: data.southern_monthly
    }));

    let southAnnualArray = allDataOfV2.map((data) => ({
        x: data.Time,
        y: data.southern_annual
    }));

    let northMonthlyArray = allDataOfV2.map((data) => ({
        x: data.Time,
        y: data.northern_monthly
    }));

    let northAnnualArray = allDataOfV2.map((data) => ({
        x: data.Time,
        y: data.northern_annual
    }));

    let globalMonthlyArray = allDataOfV2.map((data) => ({
        x: data.Time,
        y: data.global_monthly
    }));

    let globalAnnualArray = allDataOfV2.map((data) => ({
        x: data.Time,
        y: data.global_annual
    }));

    let northReconstruction = allDataOfV2.map((data) => ({
        x: data.Time,
        y: data.northern_reconstruction
    }));

    const data = {
        labels: distinctYearArray,
        datasets: [
            {
                label: "Global Annual",
                data: globalAnnualArray,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
            {
                label: "Global Monthly",
                data: globalMonthlyArray,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            },
            {
                label: "Southern Hemisphere Monthly",
                data: southMonthlyArray,
                borderColor: "rgba(247, 40, 145)",
                backgroundColor: "rgba(247, 40, 145, 0.5)"
            },
            {
                label: "Southern Hemisphere Annual",
                data: southAnnualArray,
                borderColor: "rgba(96, 248, 184)",
                backgroundColor: "rgba(96, 248, 184, 0.51)"
            },
            {
                label: "Northern Hemisphere Monthly",
                data: northMonthlyArray,
                borderColor: "rgba(0, 255, 255)",
                backgroundColor: "rgba(0, 255, 255, 0.51)"
            },
            {
                label: "Northern Hemisphere Annual",
                data: northAnnualArray,
                borderColor: "rgba(0, 87, 0)",
                backgroundColor: "rgba(0, 87, 0, 0.53)"
            },
            {
                label: "2000 Year Temperatures",
                data: northReconstruction,
                borderColor: "rgb(242, 13, 13)",
                backgroundColor: "rgb(242, 13, 13, 0.53)"
            }
        ]
    }


  return (
    <div>
    <div className="p-10" style={{width: '90%', margin: "auto", border: "3px solid black", borderRadius: 4, marginBottom: 10, backgroundColor: "white"}}>
        <Line options={options} data={data} />

        <h3 className='text-black font-bold text-2xl my-5 text-center'> Description</h3>
        <p className='text-left mb-5'> 
        The graph shows the temparature change average of the year in Kelvin (Temperature anomalies) in the Northen Hemisphere from the year 1 to onwards and the anomalities of the temperature on a global scale.
        Northern Hemisphere temperature reconstruction for the past 2,000 years is shown by combining low-resolution proxies with tree-ring data, using a wavelet transform technique to achieve timescale-dependent processing of the data.
        </p>

        <div style={{textAlign: "left"}}> <div style={{fontWeight: "bold"}}> Links to data source: </div>
        <a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/" className='underline text-sky-600 font-bold'> Northen Hemisphere</a> 
        <div><a href="https://www.ncei.noaa.gov/pub/data/paleo/contributions_by_author/moberg2005/nhtemp-moberg2005.txt" className='underline text-sky-600 font-bold'> 2000 Year Temperature </a> </div>
        <div className='description' style={{fontWeight: "bold"}}> Data measurements:</div>
        <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" className='underline text-sky-600 font-bold'>Data (Click to get)</a>
        </div>
    </div>
</div>
  )
}

export default LineChartOfV2