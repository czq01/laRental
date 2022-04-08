import {Routes, Route} from 'react-router-dom'

import Header from "../../components/Header"
import Houses from '../../components/Houses'
import SearchFilter from '../../components/SearchFilter'
import SearchLoc from "../../components/SearchLoc"
import { BackgroundImg, Container } from "./styled"

function Main() {
  return (
    <>
      <BackgroundImg></BackgroundImg>
      <Container>
        <Header />
        <Routes>
          <Route path='/search' element={ <SearchLoc />} />
          <Route path='/filter' element={ <SearchFilter />} />
          <Route path='/houses' element={ <Houses />} />
        </Routes>
      </Container>
    </>
  )
}

export default Main