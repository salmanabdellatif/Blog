import React from 'react'
import ArticleCard from '../../../components/ArticleCard'
import { FaArrowRight } from 'react-icons/fa'

const Articles = () => {
  return (
    <section className='flex flex-col container mx-auto px-5 py-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10'>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
      <button className='mx-auto flex justify-center items-center gap-x-3 px-6 py-3 font-bold text-primary border-2 border-primary rounded-lg'>
        <span>More articles</span>
        <FaArrowRight className='w-3 h-3' />
      </button>
    </section>
  )
}

export default Articles
