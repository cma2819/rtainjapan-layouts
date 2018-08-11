import React from 'react';
import styled, {css} from 'styled-components';
import sample from 'lodash/sample';
import delay from 'delay';

import logoR from '../images/logo/index.png';
import logoTainjapan from '../images/logo/tainjapan.png';
import twitchLogo from '../images/twitch.png';
import {Tweet} from './lib/tweet';

const LOGO_TRANSFORM_DURATION_SECONDS = 1;

const Container = styled.div`
	position: absolute;
	width: 1920px;
	height: 1080px;
	z-index: 0;
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

const LogoR = styled.img`
	position: absolute;
	z-index: 2;
`;

const LogoTaContainer = styled.div`
	position: absolute;
	z-index: 1;
	top: 15px;
	left: 90px;
	overflow: hidden;
`;

const LogoTainjapan = styled.img`
	transition: transform ${LOGO_TRANSFORM_DURATION_SECONDS}s;
	${(props: {translated: boolean}) =>
		props.translated &&
		css`
			transform: translate(-100%, 0);
		`};
`;

const Sponsor = styled.div`
	position: absolute;
	right: 0px;
	height: 100%;
	width: 210px;
	border-top-left-radius: 30px;
	background-color: white;
	box-sizing: border-box;
	padding: 15px;

	display: grid;
	justify-items: center;
	align-items: center;
`;

const SponsorLogo = styled.img`
	max-height: 100%;
	max-width: 100%;
`;

interface State {
	logoR: string;
	logoRestTransformed: boolean;
}
interface Props {
	isBreak?: boolean;
	bottomHeightPx: number;
	TweetProps?: {
		widthPx?: number;
		leftAttached?: boolean;
		rowDirection?: boolean;
		hideLogo?: boolean;
		maxHeightPx?: number;
	};
}
export class RtaijOverlay extends React.Component<Props, State> {
	public state = {logoR, logoRestTransformed: false};

	private logoRInterval = setInterval(async () => {
		const gifs = await import('../images/logo/*.gif');
		const randomGif: string | undefined = sample(
			Object.values(gifs.default)
		);
		if (!randomGif) {
			return;
		}
		this.setState({logoR: randomGif});
		await delay(5000);
		this.setState({logoR});
	}, 77 * 1000);

	public render() {
		return (
			<Container>
				<Top theme={{isBreak: this.props.isBreak}}>
					<LogoR src={this.state.logoR} />
					<LogoTaContainer>
						<LogoTainjapan
							translated={this.state.logoRestTransformed}
							src={logoTainjapan}
						/>
					</LogoTaContainer>
				</Top>
				<Bottom style={{height: this.props.bottomHeightPx + 'px'}}>
					<Sponsor>
						<SponsorLogo src={twitchLogo} />
					</Sponsor>
				</Bottom>
				<Tweet
					{...this.props.TweetProps}
					beforeShowingTweet={
						this.props.TweetProps && this.props.TweetProps.hideLogo
							? this.beforeShowingTweet
							: undefined
					}
					afterShowingTweet={
						this.props.TweetProps && this.props.TweetProps.hideLogo
							? this.afterShowingTweet
							: undefined
					}
				/>
			</Container>
		);
	}

	public componentWillUnmount() {
		clearInterval(this.logoRInterval);
	}

	private readonly beforeShowingTweet = async () => {
		this.setState({logoRestTransformed: true});
		await delay(LOGO_TRANSFORM_DURATION_SECONDS * 1000);
	};

	private readonly afterShowingTweet = async () => {
		this.setState({logoRestTransformed: false});
		await delay(LOGO_TRANSFORM_DURATION_SECONDS * 1000);
	};
}
