import { 
  Container,
  Card,

} from "./styled"

function HouseCard({toggleShowDetail}) {
  return (
    <>
      <Container>
        <Card onClick={toggleShowDetail}>
          <h1> {"<"} 100m</h1>
          <h2> <span>$2200</span> / month</h2>
          <p>1423 South New Hampshire Ave, Los Angeles</p>
        </Card>
      </Container>
    </>
  )
}

export default HouseCard