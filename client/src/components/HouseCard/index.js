import { 
  Container,
  Card,

} from "./styled"

function HouseCard({handleOpenModal,
  house:{dist,price,location: {formattedAddr}}}) {
  return (
    <>
      <Container>
        <Card onClick={handleOpenModal}>
          <h1> {(dist < 1000) ? `${dist}m` : `${(dist / 1000).toFixed(1)}km`}</h1>
          <h2> <span>{`$${price}`}</span> / month</h2>
          <p>{formattedAddr}</p>
        </Card>
      </Container>
    </>
  )
}

export default HouseCard