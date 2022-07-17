import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { CurrBtcAtom, DailyBtcAtom } from '../state/atoms'
import BitcoinChart from '../components/chart/BitcoinChart'
import NewsCard from '../components/news/NewsCard'
import fetchBtcArticle from '../data/news/btc/fetchBtcArticle'
import dynamic from 'next/dynamic'

// dynamically import bitcoin chart to avoid 'screen is not defined' errors
const DynamicBtcChart = dynamic(() => import('../components/chart/BitcoinChart'), {ssr: false})

// bitcoin logo in header size
const btcIconSize = 42;

// type for news article that will be displayed
interface NewsArticle {
  title: string,
  authors: string[],
  image: string,
  date: string,
  url: string,
}

const Home: NextPage = () => {
  // articles that are returned from fetchNews()
  const [articles, setArticles] = useState<any>([]);

  // latest btc/usd price and daily percent change
  const currBtcPrice = useRecoilValue(CurrBtcAtom);
  const dailyBtc = useRecoilValue(DailyBtcAtom);

  const fetchNews = async () => {
    const fetched_articles = await fetchBtcArticle();

    setArticles(fetched_articles);
  }

  useEffect(() => {
    fetchNews();
  }, [])

  return (
    <>
      <Head>
        <title>PennyETH</title>
      </Head>
      <div className='lg:flex bg-black h-screen text-white'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className='lg:mt-10 lg:pl-8 text-6xl mt-8 mb-14 mx-8 lg:mb-8'>Welcome to your crypto portfolio.</h1>
          <div className='lg:mr-20 lg:pr-20'>
            <div className='text-xl lg:text-lg text-center lg:mb-8 lg:mr-20 lg:pr-20'>
              <img src='https://i.imgur.com/wbZ6UVD.png' height={btcIconSize} width={btcIconSize} alt='main-btc' className='inline mb-1' />
              <h2 className='inline mr-1 ml-2'>Bitcoin is</h2>
              {
                dailyBtc < 0 ? <h2 className='inline text-red'>down {dailyBtc}%</h2> : <h2 className='inline text-green-400'>up {dailyBtc}%</h2>
              }
              <h2 className='inline'> today.</h2>
            </div>
          </div>
          <div className='flex lg:mt-4'>
            <DynamicBtcChart />
            <div className='flex-row hidden lg:inline'>
              {articles.map((item: NewsArticle) => (
                <NewsCard key='' title={item.title} authors={item.authors} image={item.image} date={item.date} url={item.url} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Home