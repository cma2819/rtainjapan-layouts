// Packages
import React from 'react';
import styled from 'styled-components';

// Components
import {Checklist} from './components/checklist';
import {Schedule} from './components/schedule';

const Wrapper = styled.div`
	width: 100vw;
`;

const Container = styled.div`
	margin: 16px;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 20px;
`;

const Column = styled.div``;

const Bordered = styled.div`
	box-sizing: border-box;
	background: white;
	border: 1px solid black;
`;

export const App = () => (
	<Wrapper>
		<Container>
			<Column>
				<Bordered>
					<Schedule />
				</Bordered>
				<Bordered>
					<Checklist />
				</Bordered>
			</Column>
			<Column>Hoge</Column>
			<Column>Fuga</Column>
		</Container>
	</Wrapper>
);
