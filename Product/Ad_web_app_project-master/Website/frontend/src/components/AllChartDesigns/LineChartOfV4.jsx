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
  interaction: {mode: 'nearest', axis:"x",intersect:false},
  stacked:false,
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
       else if(context.dataset.label === "CO2 Annual")
       {
        let dataValue = Object.values(context.dataset.data[context.dataIndex])
       return `${context.dataset.label}: ${dataValue[1]}`
       }
      else if(context.dataset.label === "DE08 CO2 Mixing Ratio")
      {
        let dataValue = Object.values(context.dataset.data[context.dataIndex])
        return `${context.dataset.label}: ${dataValue[1]} `
      }
      else if(context.dataset.label === "DE08-2 CO2 Mixing Ratio")
      {
        let dataValue = Object.values(context.dataset.data[context.dataIndex])
        return `${context.dataset.label}: ${dataValue[1]} `
      }
      else if(context.dataset.label === "DSS CO2 Mixing Ratio")
      {
        let dataValue = Object.values(context.dataset.data[context.dataIndex])
        return `${context.dataset.label}: ${dataValue[1]} `
      }
      else if(context.dataset.label === "Mauna Loa CO2 Annual")
      {
        let dataValue = Object.values(context.dataset.data[context.dataIndex])
        return `${context.dataset.label}: ${dataValue[1]} `
      }
      else if(context.dataset.label === "Mauna Loa CO2 Monthly")
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
        text: 'Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements (https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html)',
      },
    scales: {
      y: {
        type: 'linear',
        position: 'left',
         },
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



function LineChartOfV4() {

  let {allDataOfV3, fetchAllDataOfV3} = useContext(LineChartContext);
  let {allDataOfV4, fetchAllDataOfV4} = useContext(LineChartContext); 

    

    useEffect(() => {
      fetchAllDataOfV4();
      fetchAllDataOfV3();
    },[]);
   
    //Filter data for visualization
    let yearArray = allDataOfV4.map((data) => data.year);
   
   
    let co2_annually = allDataOfV4.map((data) => ({
        x: data.year,
        y: data.co2_annually
    }));
   
    let de08_mixing_ratio = allDataOfV4.map((data) => ({
        x: data.year,
        y: data.de08_co2_mixing_ratio
    }));

    let de08_2_mixing_ratio = allDataOfV4.map((data) => ({
        x: data.year,
        y: data.de08_2_co2_mixing_ratio
    }));

    let dss_mixing_ratio = allDataOfV4.map((data) => ({
        x: data.year,
        y: data.dss_co2_mixing_ratio,
    }));

    let Mauna_Loa_Annual = allDataOfV3.map((data) => ({
      x: data.Time,
      y: data.co2_annual_avg
  }));

  let Mauna_Loa_Monthly = allDataOfV3.map((data) => ({
    x: data.Time,
    y: data.co2_monthly_avg
}));
let Events = allDataOfV4.map((data) => ({
  x: data.year,
  y: data.co2_annually
}));

let eventLabels = allDataOfV4.map((value) => value.event);

    const data = {
        labels: yearArray,
        datasets: [
            {
                label: "CO2 Annual",
                data: co2_annually,
                borderColor: "rgb(238, 75, 43)",
                backgroundColor: 'rgba(238, 75, 43)',
                spanGaps:true
            },
            {
                label: "DE08 CO2 Mixing Ratio",
                data: de08_mixing_ratio,
                borderColor: "rgb(70,130,180)",
                backgroundColor: 'rgba(70,130,180)',
                spanGaps:true
            },
            {
                label: "DE08-2 CO2 Mixing Ratio",
                data: de08_2_mixing_ratio,
                borderColor: "rgb(138,43,226)",
                backgroundColor: 'rgba(138,43,226)',
                spanGaps:true
            },
            {
                label: "DSS CO2 Mixing Ratio",
                data: dss_mixing_ratio,
                borderColor: "rgb(0,0,139)",
                backgroundColor: 'rgba(0,0,139)',
                spanGaps:true
            },
            {
              label: "Mauna Loa CO2 Annual",
              data: Mauna_Loa_Annual,
              borderColor: "rgb(50, 2, 0)",
              backgroundColor: 'rgba(238, 75, 43)'
          },
          {
            label: "Mauna Loa CO2 Monthly",
            data: Mauna_Loa_Monthly,
            borderColor: "rgb(250, 250, 0)",
            backgroundColor: 'rgba(238, 75, 43)'
         },
         { 
            label: "Events",
            data: Events,
            borderColor: "rgb(192,192,192)",
            backgroundColor: 'rgba(192,192,192)',
            labels: eventLabels,
            showLine:false,
          }

        ]
    };

  return (
    <div>
        <div className="p-10" style={{width: '90%', margin: "auto", border: "3px solid black", borderRadius: 4, marginBottom: 10, backgroundColor: "white"}}>
            <Line options={options}  data={data} />
            <h3 className='text-black font-bold text-2xl my-5 text-center'> Description </h3>
            <p style={{textAlign: "left", color: 'black', marginBottom: 5}}> The CO2 records presented here are derived from three ice cores obtained at Law Dome, East Antarctica from 1987 to 1993. 
            The ice core air samples, ranging from about 50 to 150 ml standard temperature and pressure (STP), were measured for CO2 mixing ratio with a Carle 400 Series analytical gas chromatograph (GC).
            After separation on the GC columns, the CO2 was catalytically converted to methane before flame ionization detection. 
            As many as three separate analysis were made on each ice core sample. Each sample injection to the GC was bracketed by calibration gas injections. 
            CO2 mixing ratios were then found for each aliquot by multiplying the ratio of the sample peak area to calibration gas peak area (interpolated to the time of sample analysis) by the CO2 mixing ratio assigned to the calibration gas. 
            The precision of analysis of the Law Dome ice core air samples was 0.2 ppm. 
            For greater details on the experimental techniques used on the DE08, DE08-2, and DSS ice cores, please refer to Etheridge et al. (1996).
            </p>
            <span>The atmospheric CO2 reconstructions presented here offer records of atmospheric CO2 mixing ratios from 1006 A.D. to 1978 A.D.</span>
            <p> <span style={{fontWeight: "bold"}}> Link to data source for description: </span> </p>
            <div><a href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat" className='underline text-sky-600 font-bold'>Link to Data (Click to get)</a></div>
        
        </div>
    </div>
  )
}

export default LineChartOfV4