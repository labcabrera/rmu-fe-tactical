import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import DropZone from '../../shared/DropZone';

import { API_TACTICAL_URL } from "../../../constants/environment";

const CharacterEquipment = ({ game, character, setCharacter }) => {

    const [availableItems, setAvailableItems] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const [imagesMainHand, setImagesMainHand] = useState([]);
    const [imagesOffHand, setImagesOffHand] = useState([]);
    const [imagesBody, setImagesBody] = useState([]);

    const handleDropToSelected = (index) => {
        console.log("TacticalCharacterEquipment.handleDropToSelected " + index);
        try {
            const image = availableItems[index];
            setSelectedImages([...selectedImages, image]);
            setAvailableItems(availableItems.filter((_, i) => i !== index));
        } catch (error) {
            console.error("TacticalCharacterEquipment.handleDropToSelected error " + error);
        }
    };

    const handleDropToAvailable = (index) => {
        console.log("TacticalCharacterEquipment.handleDropToAvailable " + index);
        try {
            const image = selectedImages[index];
            setAvailableItems([...availableItems, image]);
            setSelectedImages(selectedImages.filter((_, i) => i !== index));
        } catch (error) {
            console.error("TacticalCharacterEquipment.handleDropToAvailable error " + error);
        }
    };

    const handleDropToMainHand = async (item) => { await equipItem(item.image.id, 'mainHand'); }
    const handleDropToOffHand = async (item) => { await equipItem(item.image.id, 'offHand'); }
    const handleDropToBody = async (item) => { await equipItem(item.image.id, 'body'); }

    const equipItem = async (itemId, slot) => {
        const request = {
            itemId: itemId,
            slot: slot
        };
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            };
            const response = await fetch(`${API_TACTICAL_URL}/characters/${character.id}/equipment`, requestOptions);
            if (response.status == 200) {
                const responseBody = await response.json();
                setCharacter(responseBody);
            } else {
                //Error
            }
        } catch (error) {
            console.error(`TacticalCharacterEquipment.error: ${error}`);
        }
    }

    const handleDropToDelete = async (item) => {
        console.log(`TacticalCharacterEquipment.handleDropToDelete ${JSON.stringify(item, null, 2)}`);
        try {
            const response = await fetch(`${API_TACTICAL_URL}/characters/${character.id}/items/${item.image.id}`, { method: 'DELETE' });
            if (response.status == 200) {
                const responseBody = await response.json();
                setAvailableItems(availableItems.filter(e => e.id != item.image.id));
                setCharacter(responseBody);
            } else {
                console.error(`TacticalCharacterEquipment.handleDropToDelete  error ${response.status}`);
            }
        } catch (error) {
            console.error(`TacticalCharacterEquipment.handleDropToDelete  error ${error}`);
        }
    }

    const handleDropToUnequip = async (item) => {
        equipItem(item.image.id, null);
    };

    const mapImage = (item) => {
        return {
            id: item.id,
            src: `/static/images/items/${item.itemTypeId}.png`,
            alt: item.id
        };
    };

    const loadAvailableImageItems = (tacticalCharacter) => {
        var images = tacticalCharacter.items.map(mapImage);
        if (tacticalCharacter.equipment.mainHand) {
            setImagesMainHand(tacticalCharacter.items.filter(e => e.id == tacticalCharacter.equipment.mainHand).map(mapImage));
            images = images.filter(e => e.id != tacticalCharacter.equipment.mainHand);
        } else {
            setImagesMainHand([]);
        }
        if (tacticalCharacter.equipment.offHand) {
            setImagesOffHand(tacticalCharacter.items.filter(e => e.id == tacticalCharacter.equipment.offHand).map(mapImage));
            images = images.filter(e => e.id != tacticalCharacter.equipment.offHand);
        } else {
            setImagesOffHand([]);
        }
        if (tacticalCharacter.equipment.body) {
            setImagesBody(tacticalCharacter.items.filter(e => e.id == tacticalCharacter.equipment.body).map(mapImage));
            images = images.filter(e => e.id != tacticalCharacter.equipment.body);
        } else {
            setImagesBody([]);
        }
        setAvailableItems(images);
    };

    useEffect(() => {
        console.log(`TacticalCharacterEquipment useEffect ${character}`);
        if (!character || !character.items) {
            return;
        }
        loadAvailableImageItems(character);
    }, [character]);

    if (!character || !character.items) {
        return <p>Loading...</p>
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Grid container spacing={2}>

                <Grid item xs={2}>
                    <DropZone images={imagesMainHand} onDrop={handleDropToMainHand} title="Main hand" />
                </Grid>
                <Grid item xs={2}>
                    <DropZone images={imagesOffHand} onDrop={handleDropToOffHand} title="Off hand" />
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={2}>
                    <DropZone images={selectedImages} onDrop={handleDropToDelete} title="Delete" />
                </Grid>
                <Grid item xs={4}>

                </Grid>

                <Grid item xs={2}>
                    <DropZone images={imagesBody} onDrop={handleDropToBody} title="Body" />
                </Grid>
                <Grid item xs={2}>
                    <DropZone images={selectedImages} onDrop={handleDropToAvailable} title="Head" />
                </Grid>
                <Grid item xs={2}>
                    <DropZone images={selectedImages} onDrop={handleDropToAvailable} title="Arms" />
                </Grid>
                <Grid item xs={2}>
                    <DropZone images={selectedImages} onDrop={handleDropToAvailable} title="Legs" />
                </Grid>
                <Grid item xs={4}>
                </Grid>

                <Grid item xs={8}>
                    <DropZone images={availableItems} onDrop={handleDropToUnequip} title="Inventory" />
                </Grid>
                <Grid item xs={4}>
                </Grid>


                <Grid item xs={12}>
                    <Typography variant="subtitle2" component="div">Character weight: {character.info.weight} lbs</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" component="div">Equipment weight: {character.equipment.weight} lbs</Typography>
                </Grid>

            </Grid>
        </DndProvider>
    );
}

export default CharacterEquipment;