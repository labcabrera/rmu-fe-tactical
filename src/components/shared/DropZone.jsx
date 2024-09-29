import React from "react";
import { useDrop } from "react-dnd";

import { Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

import DraggableImage from './DraggableImage';

const DropZone = ({ images, onDrop, title }) => {

    const [, drop] = useDrop({
        accept: 'image',
        drop: (item) => {
            console.log("DraggableImage.useDrop " + JSON.stringify(item, null, 2));
            onDrop(item.index);
        },
    });

    if (!images || !onDrop || !title) {
        return <p>Loading...</p>
    }

    return (
        <Paper
            ref={drop}
            sx={{
                padding: "10px",
                minHeight: "100px"
            }}
            variant="outlined">
            <Typography variant="h8" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={2}>
                {images.map((image, index) => (
                    <Grid item key={image.id}>
                        <DraggableImage image={image} index={index} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default DropZone;