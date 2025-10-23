import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import useAppContext from '../context/AppContext'
import toast from 'react-hot-toast'

//Input Field Component
const InputField = ({type, placeholder, name, onChange, address})=>(
  <input type={type} placeholder={placeholder} onChange={onChange} name={name} value={address[name]}
  required
   />
)

const AddAddress = () => {

  const {axios, user, navigate} = useAppContext()

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setAddress((preAddress)=>({
      ...preAddress,
      [name]: value,

    }))
  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post('/api/address/add', {address})
      if(data.success){
        toast.success(data.message)
        navigate('/cart')
      }else{
        toast.success(data.message)
      }

    }catch(error){
      toast.success(error.message)

    }
  }

  useEffect(()=>{
    if(!user){
      navigate('/cart')
    }

  },[])
  return (
    <div className='mt-16 pb-16'>
      <p className='text-2x1 md:text-3x1 text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
            <div className='grid grid-cols-2 gap-4'>
              <InputField onChange={handleChange} address={address} name='firstName' type='text' placeholder='First Name' />
              <InputField onChange={handleChange} address={address} name='lastName' type='text' placeholder='Last Name' />
            </div>
            <InputField onChange={handleChange} address={address} name='email' type='email' placeholder="Email address" />
            <InputField onChange={handleChange} address={address} name='street' type='text' placeholder="street" />
            <div className='grid grid-cols-2 gap-4'>
              <InputField onChange={handleChange} address={address} name='city' type='text' placeholder="City" />
              <InputField onChange={handleChange} address={address} name='state' type='text' placeholder="State" />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <InputField onChange={handleChange} address={address} name='zipcode' type='text' placeholder="Zip Code" />
              <InputField onChange={handleChange} address={address} name='country' type='text' placeholder="Country" />
            </div>
            <InputField onChange={handleChange} address={address} name='phone' type='text' placeholder="Phone" />
            <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>
              Save address
            </button>


          </form>

        </div>
        <img className='md:mr-10 mb:10 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />

      </div>

    </div>
  )
}

export default AddAddress