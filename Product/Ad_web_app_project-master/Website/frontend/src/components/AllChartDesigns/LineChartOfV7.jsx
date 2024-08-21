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
      zoomPlugin,
    );
  
 
  

function LineChartOfV7() {
  const options = {
    responsive: true,
    interaction: {mode: 'index', intersect:false},
    stacked:false,
    options: 
     {
        transitions: 
        {
          zoom: 
          {
            animation: 
            {
              duration: 1000,
              easing: 'easeOutCubic'
            }
          }
        },
      },
    plugins: 
   {
    tooltip:
    { 
      callbacks: 
      {
       label: (context) => 
       {
        if(context.dataset.label === "Events")
        {
          return context.dataset.labels[context.dataIndex]
        }
       else if(context.dataset.label === "Carbon dioxide (ppm)")
       {
        let dataValue = Object.values(context.dataset.data[context.dataIndex])
       return `${context.dataset.label}: ${dataValue[1]} ppm`
       }
      else if(context.dataset.label === "Surface temperature change(50%)")
      {
        let dataValue = Object.values(context.dataset.data[context.dataIndex])
        return `${context.dataset.label}: ${dataValue[1]} `
      }
       }
      }
    },

      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Evolution of global temperature over the past two million years (1 equals 1 thousand years) (https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf)',
      },
      subtitle: {
        display: true,
        text: 'Custom Chart Subtitle'
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true 
          },
          speed: 100
        },
        pan: {
          enabled: true,
          speed: 100
        }
      },
      
    },

    scales: {
      A: {
        type: 'linear',
        position: 'left',
         },
      B: {
        type: 'linear',
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
       }
    },
};

    let {allDataOfV7,  fetchAllDataOfV7} = useContext(LineChartContext);

    useEffect(() => {
        fetchAllDataOfV7();
    },[]);
    
    let yearLabels = allDataOfV7.map((value) => value.time);
    let eventLabels = allDataOfV7.map((value) => value.Event);

    let carbonValue = allDataOfV7.map((value) => ({
       x: value.time,
       y: value.carbon_dioxide,
    }));
    let surfTemp = allDataOfV7.map((value) => ({
      x: value.time,
      y: value.surface_temp,
  }));



//Make it so that it will show later
let Events = allDataOfV7.map((value) => 
({
    x: value.time,
    y: value.surface_temp,
}));



    const data = {
        labels: yearLabels,
        datasets: [
            {
                label: "Carbon dioxide (ppm)",
                data: carbonValue,
                borderColor: "rgb(139,0,0)",
                backgroundColor: 'rgba(139,0,0)',
                yAxisID:"A"
            },
            {
              label: "Surface temperature change(50%)",
              data: surfTemp,
              borderColor: "rgb(0,0,255)",
              backgroundColor: 'rgba(0,0,255)',
              yAxisID:"B"
          },
          {
            label: "Events",
            data: Events,
            borderColor: "rgb(192,192,192)",
            backgroundColor: 'rgba(192,192,192)',
            labels: eventLabels,
            showLine:false,
            pointRadius: 0,
            yAxisID:"B"
        },
        ]
    }


  return (
    <div>
    <div className="p-10" style={{width: '90%', margin: "auto", border: "3px solid black", borderRadius: 4, marginBottom: 10, backgroundColor: "white"}}>
        <Line options={options}  data={data} />

        <h3 className='text-black font-bold text-2xl my-5 text-center'> Description </h3>
        
            <p style={{textAlign: "left", color: 'black', marginBottom: 5}}>The graph shows a spatially weighted
proxy reconstruction of global temperature over the past 2 million
years estimated from a multi-proxy database of over 20,000 sea
surface temperature point reconstructions. Global temperature
gradually cooled until roughly 1.2 million years ago and cooling
then stalled until the present. </p>
<p> <span style={{fontWeight: "bold"}}> Link to data source for description: </span> </p>
<div><a href="http://carolynsnyder.com/publications.php" className='underline text-sky-600 font-bold'>Link to Data (Click to get)</a></div>
    </div>
</div>
  )
}

export default LineChartOfV7