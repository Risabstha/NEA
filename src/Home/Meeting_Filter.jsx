import React from 'react'

const Meeting_Filter = ()=>
{
    return ( 
        <>
            {/* Filtering meeting  */}
            <div className=" bg-gray-200 p-1 md:pt-[1vh]  md:mt-[1vh]">
            <h2 className="text-2xl text-center font-bold p-[1vh] md:pt-[5.5vh] md:pb-[3vh]">Meeting Schedule</h2>
                <div className='flex justify-center space-x-[5vw]  md:mt-[0vh]'>
                    <p>Yesterday</p>
                    <p>Today</p>
                    <p>Tommorrow</p>
                    <p>+2</p>
                </div>
            </div>
        </>
    );
        
}

export default Meeting_Filter;