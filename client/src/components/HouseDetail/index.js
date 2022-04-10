import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { Container, DetailClose, DetailWrapper } from './styled'

function HouseDetail({ toggleShowDetail, showDetail, scrollY }) {

  const detailRef = useRef();

  const animation = useSpring({
    config: {
      duration: 150
    },
    opacity: showDetail ? 1 : 0,
    transform: showDetail ? `translateY(0%)` : `translateY(-100%)`
  })

  const closeDetail = e => {
    if (detailRef.current === e.target) {
      toggleShowDetail();
    }
  }

  return (
    <>
      {showDetail ?
        <Container onClick={closeDetail} ref={detailRef} scrollY={window.outerHeight}>
          <animated.div style={animation} >
            <DetailWrapper>
              <DetailClose onClick={toggleShowDetail} />
            </DetailWrapper>
          </animated.div>
        </Container>
        : null}
    </>
  )
}

export default HouseDetail