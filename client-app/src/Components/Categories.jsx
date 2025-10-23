import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {

const {navigate} = useAppContext();

  return (
    <div className='mt-9'>
    <p className='text-2x1 md:text-3x1 font-medium'>Categories</p>
    <div className='flex gap-6 mt-4 overflow-x-auto'>

   {categories.map((category, index)=>(
    <div key={index} className='group cursor-pointer py-3 px-3 rounded-lg flex flex-col items-center w-28'
    style={{backgroundColor: category.bgColor}}
    onClick={()=>{
      navigate(`products/${category.path.toLowerCase()}`);
      scrollTo(0,0);
    }}
    >
    <img src={category.image} alt={category.text} className='w-16 h-16 object-contain transition-transform group-hover:scale-10'/>
      <p className='text-sm font-medium mt-2'>{category.text}</p>
    </div>
    ))}
    </div>
    </div>
  )
}

export default Categories