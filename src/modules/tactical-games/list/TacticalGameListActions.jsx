import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

const TacticalGameListActions = () => {
  const navigate = useNavigate();

  const createNewGame = async () => {
    navigate('/tactical/games/create');
  };

  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/tactical">
              Tactical
            </Link>
            <span>Games</span>
          </Breadcrumbs>
        </Box>
        <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end', alignItems: 'flex-start' }}>
          <IconButton variant="outlined" onClick={createNewGame}>
            <AddIcon />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};

export default TacticalGameListActions;
