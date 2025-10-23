import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className='relative mt-24'>
      <img src={assets.bottom_banner_image} alt="banner" className='w-full hidden md:block'/>
      <img src={assets.bottom_banner_image_sm} alt="banner" className='w-full
      md:hidden'/>
      <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-4 md:pt-0 md
      :pr-6'>
        <div className='bg-white/50 p-3 rounded-md max-w-[90%] md:max-w-[400px]'>
          <h1 className='text-0 font-semibold text-primary mb-6 gap-4'>Why We Are Best?</h1>
          {features.map((feature, index)=>(
            <div key={index} className='flex items-start gap-2 mb-2'>
              <img src={feature.icon} alt={feature.title} className='w-4 md:w-5 mt-1' />
              <h3 className='text-sm md:text-xl font-semibold gap-5'>{feature.title}</h3>
              <p className='text-gray-600 text-xs md:text-sm'>{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default BottomBanner;