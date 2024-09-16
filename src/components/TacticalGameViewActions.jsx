import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const TacticalGameViewActions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { gameId } = useParams();
    const game = location.state?.game;

    const deleteGame = async () => {
        console.log("delete game " + gameId);
        const response = await fetch("http://localhost:3001/v1/tactical-games/" + gameId, {
            method: "DELETE",
        });
        const deleteResponse = await response;
        if (deleteResponse.status == 204) {
            navigate("/tactical");
        } else {
            //TODO display error
            console.log("delete data: " + data);
        }
    };

    const handleEditClick = () => {
    }

    const handleDeleteClick = () => {
        deleteGame();
    }

    const handleAddNewCharacter = () => {
        navigate("/tactical/characters/creation");
    }

    return (
        <div class="tactical-game-view-actions">
            <Stack spacing={2} direction="row" sx={{
                justifyContent: "flex-end",
                alignItems: "flex-start",
            }}>
                <Button variant="outlined" onClick={handleEditClick}>Edit</Button>
                <Button variant="outlined" onClick={handleAddNewCharacter}>New Character</Button>
                <Button variant="outlined">Close</Button>
                <Button variant="outlined">Start game</Button>
                <IconButton variant="outlined" onClick={handleDeleteClick}>
                    <DeleteIcon />
                </IconButton>
            </Stack>
        </div>
    );
}

export default TacticalGameViewActions;