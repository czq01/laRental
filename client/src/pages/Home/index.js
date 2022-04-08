import Landing from '../../components/Landing'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import { content } from '../../components/Card/Content'
function Home() {
  return (
    <>
      <Navbar />
      <Landing />
      {content.map((item, index) => (
        <Card key={index} item={item}/>
      ))}
    </>
  )
}

export default Home