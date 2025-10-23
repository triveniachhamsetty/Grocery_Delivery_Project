import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const {products} = useAppContext();
  return (
    <div className='mt-9'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <div className='flex flex-row flex-nowrap gap-3 mt-3'>
        {products.filter((product)=> product.inStock).slice(0,5).map((product, index)=>(
        <ProductCard key={index} product={product}/>
        ))}

      </div>
    </div>
  )
}

export default BestSeller