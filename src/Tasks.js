import React, { useEffect, useState, useCallback } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import axios from "axios";
import CircleIcon from '@mui/icons-material/Circle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Icon from "./Icon";
// import { Box, Paper, Grid, Container, Button, Stack, Typography } from '@mui/material';

function Tasks() {
	const [tasks, setTasks] = useState([]);
	const [statuses, setStatuses] = useState([]);
	const [merged, setMerged] = useState({});
  const [loading, setLoading] = useState(true);
  const [override, setOverride] = useState(false);

	const getTasks = async () => {
		const { data } = await axios.get(`https://react-learning-server.onrender.com/tasks`);
		setTasks(data);
	};

	const getStatuses = async () => {
		const { data } = await axios.get(`https://react-learning-server.onrender.com/statuses`);
		setStatuses(data);
	};

	const mergeData = useCallback(() => {
		setLoading(true);
    let result = statuses?.map(item => ({
				...tasks?.find(({ id }) => item?.taskId === id),
				...item,
		}));

		setMerged(result)
		setLoading(false);
  }, [tasks, statuses]);
	
	const handleOverride = () => {
		setOverride(true);
	};

	useEffect(() => {
		getTasks();
		getStatuses();
	}, []);

	useEffect(() => {
		mergeData();
	}, [mergeData]);

	return (
			<Container fixed>
			{loading ? (
				<Grid xs={12}>
					<h1>loading ...</h1>
				</Grid>
			) : (
					<Box height="110vh" sx={{ flexGrow: 1 }}>
							<Grid container spacing={2}>
								<Grid xs={12}>
										<h1>Categories and Tasks</h1>
										<Button onClick={handleOverride} variant="contained">Override Statuses</Button>
								</Grid>
									<Grid xs={4}>
										<h3>HTML</h3>
										{merged?.map(merge => merge?.category === 'html' ? 
											<Paper sx={{ p: 2, margin: 1 }}>  
												<Stack direction="row" alignItems="center" gap={1}>
													<Icon status={merge?.status} override={override}/>
													<Typography variant="body2">{merge?.name}</Typography>
												</Stack>
										</Paper> : '')}
									</Grid>
									<Grid xs={4}>
										<h3>CSS</h3>
										{merged?.map(merge => merge?.category === 'css' ? 
											<Paper sx={{ p: 2, margin: 1 }}>  
												<Stack direction="row" alignItems="center" gap={1}>
													<Icon status={merge?.status} override={override}/>
													<Typography variant="body2">{merge?.name}</Typography>
												</Stack>
										</Paper> : '')}
									</Grid>
									<Grid xs={4}>
										<h3>JS</h3>
										{merged?.map(merge => merge?.category === 'js' ? 
											<Paper sx={{ p: 2, margin: 1 }}>  
												<Stack direction="row" alignItems="center" gap={1}>
													<Icon status={merge?.status} override={override}/>
													<Typography variant="body2">{merge?.name}</Typography>
												</Stack>
										</Paper> : '')}
									</Grid>
							</Grid>
					</Box>
				)}
			</Container>
	);
}

export default Tasks;
