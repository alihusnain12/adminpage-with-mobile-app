"use client"
import NumberInputFields from '@/components/inputs';
import React, { useState } from 'react';
import Slider from 'react-slider';

const Page = () => {
  const [sliderValues, setSliderValues] = useState([0, 0, 0, 0]);

  const handleSliderChange = (index, value) => {
    let newValues = [...sliderValues];
    let difference = value - newValues[index];
    newValues[index] = value;

    // Adjust lower sliders if total exceeds 10
    for (let i = index + 1; i < newValues.length && difference > 0; i++) {
      if (newValues[i] - difference >= 0) {
        newValues[i] -= difference;
        difference = 0;
      } else {
        difference -= newValues[i];
        newValues[i] = 0;
      }
    }

    let total = newValues.reduce((acc, currentValue) => acc + currentValue, 0);
    if (total > 10) {
      for (let i = newValues.length - 1; i >= 0; i--) {
        if (newValues[i] > total - 10) {
          newValues[i] -= total - 10;
          break;
        }
        total -= newValues[i];
        newValues[i] = 0;
      }
    }

    setSliderValues(newValues);
  };

  return (
    <div>
    <div className=' flex items-center justify-center bg-gray-50 w-full'>
      <div className='bg-gradient-to-bl from-slate-500 to-purple-100 p-8 rounded-lg shadow-lg w-full '>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>Settings</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {['Check In', 'Post', 'Like', 'Comments'].map((label, index) => (
            <div key={index}>
              <label className='block text-black pb-1 text-sm'>{label}</label>
              <Slider
                className='w-full h-2 bg-gray-200 rounded-lg'
                thumbClassName='h-4 w-4 bg-blue-500 rounded-full -mt-1 cursor-pointer'
                trackClassName='h-full rounded-lg bg-white'
                value={sliderValues[index]}
                onChange={(value) => handleSliderChange(index, Math.round(value))}
                min={0}
                max={10}
                step={1}
                />
              <div className='text-sm text-gray-700 mt-1'>Value: {sliderValues[index]}</div>
            </div>
          ))}
        </div>
      </div>
          
          </div>
          <NumberInputFields/>

    </div>
  );
}

export default Page;
