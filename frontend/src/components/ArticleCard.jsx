import React from 'react'
import images from '../constants/images'
import { FiCheck } from 'react-icons/fi'

const ArticleCard = ({ className }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${className}`}>
      <img
        src={images.Post1Image}
        alt='title'
        className='w-full object-cover object-center h-auto'
      />
      <div className='p-5'>
        <h2 className='font-roboto font-bold text-xl text-dark-soft md:text-2xl'>
          Future of Work
        </h2>
        <p className='text-dark-soft mt-3 text-sm md:text-lg'>
          Majority of peole will work in jobs that don’t exist today.
        </p>
        <div className='flex flex-nowrap justify-between items-center mt-6'>
          <div className='flex items-center gap-x-2 md:gap-x-2.5 '>
            <img
              src={images.PostProfile}
              alt='profile-avatar'
              className='w-9 h-9 md:w-10 md:h-10'
            />
            <div className='flex flex-col'>
              <h4 className='italic font-bold text-dark-soft text-sm md:text-base'>
                Johanna Murray
              </h4>
              <div className='flex items-center gap-x-2'>
                <span className='bg-[#36B37E] bg-opacity-20 w-fit rounded-full'>
                  <FiCheck className='text-[#36B37E] p-0.5' />
                </span>
                <span className='italic text-dark-light text-xs md:text-sm'>
                  Verified writer
                </span>
              </div>
            </div>
          </div>
          <span className='italic text-dark-light font-bold text-sm md:text-base'>
            02 May
          </span>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
