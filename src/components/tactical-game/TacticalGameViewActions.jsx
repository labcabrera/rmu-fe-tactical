import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import CloseButton from "../button/CloseButton";
import DeleteButton from "../button/DeleteButton";
import EditButton from "../button/EditButton";
import PlayButton from "../button/PlayButton";

import { API_TACTICAL_URL } from '../../constants/environment';

const TacticalGameViewActions = () => {

    const buttonSize = 80;
    const location = useLocation();
    const navigate = useNavigate();
    const tacticalGame = location.state?.tacticalGame;

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const deleteTacticalGame = async () => {
        const url = `${API_TACTICAL_URL}/tactical-games/${tacticalGame.id}`;
        try {
            const response = await fetch(url, { method: "DELETE" });
            const deleteResponse = await response;
            if (deleteResponse.status == 204) {
                navigate("/tactical");
            } else {
                //TODO display error
                console.log("delete data: " + data);
            }
        } catch (error) {
        }
    };

    const handleEditClick = () => {
        alert("TODO");
    };

    const handleOpenClick = async () => {
        console.log("handleOpenClick " + tacticalGame.status);
        if (tacticalGame.status === "created") {
            console.log("status is created");
            const startGameResponse = await fetch(`${API_TACTICAL_URL}/tactical-games/${tacticalGame.id}/rounds/start`, { method: 'POST' });
            if (startGameResponse.status == 200) {
                navigate(`/tactical/combat/${tacticalGame.id}`);
            } else {
                const startGameResponseError = await startGameResponse.json();
                console.log("creation error: " + startGameResponseError.message);
            }
        } else {
            navigate(`/tactical/combat/${tacticalGame.id}`, { state: { tacticalGame: tacticalGame } });
        }
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDialogDeleteClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDialogDelete = () => {
        deleteTacticalGame();
        setDeleteDialogOpen(false);
    };

    return (
        <div className="generic-action-bar">
            <Stack spacing={2} direction="row" sx={{
                justifyContent: "flex-end",
                alignItems: "flex-start",
            }}>
                <CloseButton size={buttonSize} />
                <PlayButton onClick={handleOpenClick} size={buttonSize} />
                <EditButton onClick={handleEditClick} size={buttonSize} />
                <DeleteButton onClick={handleDeleteClick} size={buttonSize} />

            </Stack>
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDialogDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Tactical game delete confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove '{tacticalGame.name}'? This action cannot be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogDeleteClose}>Cancel</Button>
                    <Button onClick={handleDialogDelete} autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TacticalGameViewActions;