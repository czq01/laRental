import { 
  Container,
  Card,

} from "./styled"

function HouseCard({toggleShowDetail, 
  house:{distance,price,location: {formattedAddr}}}) {
  return (
    <>
      <Container>
        <Card onClick={toggleShowDetail}>
          <h1> {(distance < 1) ? `${distance * 1000}m` : `${distance}km`}</h1>
          <h2> <span>{`$${price}`}</span> / month</h2>
          <p>{formattedAddr}</p>
        </Card>
      </Container>
    </>
  )
}

export default HouseCard