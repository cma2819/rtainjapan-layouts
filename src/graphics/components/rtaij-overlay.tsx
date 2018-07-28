import React from 'react';
import styled, {css} from 'styled-components';

import logoR from '../images/logo-r/index.png';
import logoTainjapan from '../images/logo-tainjapan.png';
import background from '../images/background.png';
import backgroundBreak from '../images/background_break.png';

const Container = styled.div`
	position: absolute;
	width: 1920px;
	height: 1080px;
`;

const Top = styled.div`
	position: absolute;
	height: 150px;
	width: 100%;
	top: 0;
	background-color: rgba(2, 14, 21, 0.6);
	${({theme}) =>
		theme.isBreak &&
		css`
			background: none;
		`};
`;

const Bottom = styled.div`
	position: absolute;
	width: 100%;
	bottom: 0;
	background-color: rgba(2, 14, 21, 0.6);
`;

const LogoTainjapan = styled.img`
	position: absolute;
	top: 15px;
	left: 90px;
`;

const Sponsor = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	right: 0px;
	height: 100%;
	width: 210px;
	border-top-left-radius: 30px;
	background-color: white;
`;

const SponsorLogo = styled.img`
	display: block;
	margin: auto;
	opacity: 0;
	transition: opacity 0.33s linear;
`;

interface Props {
	isBreak?: boolean;
	bottomHeightPx: number;
}

export class RtaijOverlay extends React.Component<Props> {
	render() {
		return (
			<Container>
				<Top theme={{isBreak: this.props.isBreak}}>
					<img src={logoR} />
					<LogoTainjapan src={logoTainjapan} />
				</Top>
				<Bottom style={{height: this.props.bottomHeightPx + 'px'}}>
					<Sponsor>
						<SponsorLogo />
					</Sponsor>
				</Bottom>
				<img
					src={background}
					style={{display: this.props.isBreak ? 'none' : 'inline'}}
				/>
				<img
					src={backgroundBreak}
					style={{display: this.props.isBreak ? 'inline' : 'none'}}
				/>
			</Container>
		);
	}
}