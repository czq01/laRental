import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Header from "../../components/Header"
import Houses from '../../components/Houses'
import SearchFilter from '../../components/SearchFilter'
import SearchLoc from "../../components/SearchLoc"
import { BackgroundImg, BgFilter } from "./styled"

function Main() {

  // Make header not transparent after scrolled down
  const [headerTrans, setHeaderTrans] = useState(true);
  const changeHeader = () => {
    if (window.scrollY > 40) {
      setHeaderTrans(false)
    } else {
      setHeaderTrans(true)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', changeHeader)
  }, [])
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@700&display=swap" rel="stylesheet" />
      </Helmet>
      <BackgroundImg />
      <BgFilter />

      <Header headerTrans={headerTrans} />
      <Routes>
        <Route path='/search' element={<SearchLoc />} />
        <Route path='/filter' element={<SearchFilter />} />
        <Route path='/houses' element={<Houses />} />
      </Routes>
    </>
  )
}

export default Main