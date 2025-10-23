import React from 'react'
import { useAppContext } from '../context/appContext.jsx';
import { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard.jsx';

const AllProducts = () => {

  const {products, searchQuery} = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    if(searchQuery.length > 0){
      setFilteredProducts(products.filter( product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ))}else{
      setFilteredProducts(products);
    }
  },[searchQuery, products])



  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2x1 font-medium uppercase'>All Products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {filteredProducts.filter((product)=> product.inStock).map((product, index)=>(
          <ProductCard key={index} product={product}/>
        ))}

      </div>

    </div>
  )
}

export default AllProducts