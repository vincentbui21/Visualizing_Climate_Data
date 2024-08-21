import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchSingleLayout } from '../../../store/actions/LayoutContentActions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllLayouts } from '../../../store/actions/LayoutContentActions';
import SingleChartInPublicLayout from '../../SingleItem/SingleChartInPublicLayout';
import TotalChartsContext from '../../../context/LayoutContext';
import { useContext } from 'react';

function PublicLayout() {
    //Set params to get single layout ID
    let params = useParams();
    let idForLink = params.idForLink;
    
    //Get total charts from context
    let {arrayCharts} = useContext(TotalChartsContext);

   
    //Set dispatch

    let dispatch = useDispatch();
    
    //Get state from redux for single layout

    let {layout, layouts, listOfCharts} = useSelector(state => state.layoutContent);

    //Set effect to fetch single layout

    useEffect(() => {
        dispatch(fetchSingleLayout(idForLink));
    },[idForLink]);

    let selectedCharts = arrayCharts.filter((chart) => {

        let getIds = listOfCharts.map((chart) => chart.chartId);

        return getIds.includes(chart.id);
    }).map((chart) => {
        let description = "";
        listOfCharts.forEach((singleChart) => {
            if (chart.id === singleChart.chartId) {
                description += singleChart.description;
            }
        });

        return {
            ...chart,
            description: description
        }
    });

     

  return (
   <div className='bg-slate-400 p-4'>
   <div className='container mx-auto'>
       {(layout.message || !layout.name) ? (
           
        <h1 className='my-20 text-center text-2xl font-bold text-pink-500 h-screen'> No layout can be found! </h1>)
        
        :

        (!layout.message || layout._id) 

        ?

        ((
            <div className=''>
                <div className='my-10'> 
                {(!layout.message) && (<h1 className='text-black text-3xl text-center font-bold'> Name of Layout: <span className='text-amber-500 underline'> {layout.name} </span> </h1>)}
                </div>
    
                <div className='my-36'>
                 {layout.layoutType === "oneside" && (
                     <div>
                      {selectedCharts.map((chart) => (
                         <SingleChartInPublicLayout chart={chart} side={"oneside"} />
                      ))}
                     </div>
                   )}
     
                 {layout.layoutType === "twoside" && (
                      <div className='grid grid-cols-2 w-full gap-8'>
                           {selectedCharts.map((chart) => (
                         <SingleChartInPublicLayout chart={chart} side={"twoside"} />
                      ))}
                     
                     </div>
                   )}
     
                 </div>
            </div>
           ))

           :
           
           ""


        
       }

      {/* {(!layout.message || layout._id) && (
            <div className=''>
        <div className='my-10'> 
        {(!layout.message) && (<h1 className='text-black text-3xl text-center font-bold'> Name of Layout: <span className='text-amber-500 underline'> {layout.name} </span> </h1>)}
        </div>

        <div className='my-36'>
         {layout.layoutType === "oneside" && (
                  <div>
                   {selectedCharts.map((chart) => (
                      <SingleChartInPublicLayout chart={chart} side={"oneside"} />
                   ))}
                  </div>
                )}
 
              {layout.layoutType === "twoside" && (
                   <div className='grid grid-cols-2 w-full gap-8'>
                        {selectedCharts.map((chart) => (
                      <SingleChartInPublicLayout chart={chart} side={"twoside"} />
                   ))}
                 
                  </div>
                )}
 
              </div>
         </div>
        )} */}
   </div>
   </div>                     
  )
}

export default PublicLayout