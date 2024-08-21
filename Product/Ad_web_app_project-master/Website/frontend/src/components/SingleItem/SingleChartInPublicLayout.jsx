import React from 'react'

function SingleChartInPublicLayout({chart, side}) {
  return (
    <div className={side === "oneside" ? "my-44 p-10" : "my-16 p-10"}>
    
    <div className='title '>
        <h3 className='text-black font-bold text-center mb-10 text-3xl'> Visualization type: {chart.id}</h3>
    </div>
    {chart.item}
   

    <div className='flex items-center justify-center w-full'>
        <textarea name="description" id="description" className="mt-10 bg-sky-100 w-full p-4 border-2 border-black focus:outline-0 rounded-lg shadow-xl text-black font-bold placeholder:text-black placeholder:font-bold" placeholder='Write your description...!' cols="30" rows="10" readOnly value={chart.description}></textarea>
    </div>
</div>
  )
}

export default SingleChartInPublicLayout