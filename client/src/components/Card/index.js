// import { 
//   Container,
//   Wrapper,
//   Row,
//   Info,
//   TextWrapper,
//   TopLine,
//   Heading,
//   Subtitle,
//   BtnWrapper,
//   ImgContainer,
//   ImgWrapper,
//   Img
//  } from "./styled"
import {
  Container,
  TextWrapper,
  ImgWrapper,
  TopLine,
  HeadLine,
  Content,
  BtnWrapper,
  Img
} from "./styled"
import { Button } from '../Button.styled'

function index({item: {
  id,
  name,
  route,
  topline,
  headline,
  content,
  buttonLabel,
  img,
}}) {
  const lightBg = id % 2 !== 0;
  return (
    <>
      <Container id={name} lightBg={lightBg}>
        <TextWrapper lightBg={lightBg}>
          <TopLine>{topline}</TopLine>
          <HeadLine lightBg={lightBg}>{headline}</HeadLine>
          <Content lightBg={lightBg}>{content}</Content>
          <BtnWrapper>
            <Button 
              to={`${route}`}
              primary={!lightBg}
              >{buttonLabel}
            </Button>
          </BtnWrapper>
        </TextWrapper>
        <ImgWrapper>
          <Img src={require(`../../assets/images/${img}`)} />
        </ImgWrapper>
      </Container>
    </>
  )
}

export default index