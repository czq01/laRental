import React, {useState} from 'react'

import {
	Container,
	BgWrapper,
	VideoBg,
	Content,
	H1,
	P,
	BtnWrapper,
	ArrowForward,
	ArrowRight
} from './styled'
import Video from '../../assets/videos/landing.mp4'
import { Button } from '../Button.styled.js';
function Landing() {

	const [hover, setHover] = useState(false);

	const onHover = () => {
		setHover(!hover);
	}

	return (
		<>
			<Container>
				<BgWrapper>
					{/* <VideoBg autoPlay loop muted src={Video} type='video/mp4' /> */}
				</BgWrapper>
				<Content>
					<H1>LA House Renting Made Easy</H1>
					<P>
						Sign up for renting your ideal house
						in LA today and even find yourself a roommate.
					</P>
					<BtnWrapper>
						<Button 
							to='signup'
							onMouseEnter={onHover}
							onMouseLeave={onHover}
							primary='true'
							dark='true'
						>
							Get start {hover ? <ArrowRight /> : <ArrowForward />}
						</Button>
					</BtnWrapper>
				</Content>
			</Container>
		</>
	)
}

export default Landing