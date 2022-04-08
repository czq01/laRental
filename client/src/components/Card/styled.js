import styled from 'styled-components'

export const Container = styled.div`
  background: ${({lightBg}) => (
    lightBg ? '#f9f9f9' : '#010606'
  )};
  height: 860px;
  width: 100%;
  display: flex;
  align-items: center;
  
  flex-direction: ${({lightBg}) => (
    lightBg ?  'row' : 'row-reverse'
  )};

  & > div {
    flex: 1;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }

`

export const TextWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding: 0 0 0 50px; */
  padding-left: ${({lightBg}) => (
    lightBg ?  '150px' : '-150px'
  )};
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 0 50px;
    justify-content: center;
  }
`

export const TopLine = styled.p`
  color: #01bf71;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 10px;
`

export const HeadLine = styled.h1`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  margin-bottom: 40px;
  color: ${({lightBg}) => (
    lightBg ?  '#010606' : '#f7f8fa'
  )};
`

export const Content = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({lightBg}) => (
    lightBg ? '#010606' : '#fff'
  )};
`

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`

export const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const Img = styled.img`
  width: 60%;
  margin: 0 0 10px 0;
  padding-right: 0;
`

// export const Container = styled.div`
//   color: #fff;
//   background: ${({lightBg}) => (
//     lightBg ? '#f9f9f9' : '#010606'
//   )};

//   @media screen and (max-width: 768px) {
//     padding: 100px 0;
//   }
// `

// export const Wrapper = styled.div`
//   display: grid;
//   z-index: 1;
//   height: 860px;
//   width: 100%;
//   max-width: 1100px;
//   margin-right: auto;
//   margin-left: auto;
//   padding: 0 24px;
//   justify-content: center;
// `

// export const Row = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: ${({lightBg}) => (
//     lightBg ?  'row' : 'row-reverse'
//   )};

  

// `

// export const Info = styled.div`
//   margin-bottom: 15px;
//   padding: 0 15px;
// `

// export const ImgContainer = styled.div`
//   margin-bottom: 15px;
//   padding: 0 15px;
// `

// export const TextWrapper = styled.div`
//   max-width: 540px;
//   padding-top: 0;
//   padding-bottom: 60px;
// `

// export const TopLine = styled.p`
//   color: #01bf71;
//   font-size: 16px;
//   line-height: 16px;
//   font-weight: 700;
//   letter-spacing: 1.4px;
//   text-transform: uppercase;
//   margin-bottom: 16px;
// `

// export const Heading = styled.h1`
//   margin-bottom: 24px;
//   font-size: 48px;
//   line-height: 1.1;
//   font-weight: 600;
//   color: ${({lightBg}) => (
//     lightBg ?  '#010606' : '#f7f8fa'
//   )};

//   @media screen and (max-width: 480px){
//     font-size: 32px;
//   }
// `
// export const Subtitle = styled.p`
//   max-width: 440px;
//   margin-bottom: 35px;
//   font-size: 18px;
//   line-height: 24px;
//   color: ${({lightBg}) => (
//     lightBg ? '#010606' : '#fff'
//   )};
// `

// export const BtnWrapper = styled.div`
//   display: flex;
//   justify-content: flex-start;
// `

// export const ImgWrapper = styled.div`
//   max-width: 555px;
//   height: 100%;
// `

// export const Img = styled.img`
//   width: 100%;
//   margin: 0 0 10px 0;
//   padding-right: 0;
// `
