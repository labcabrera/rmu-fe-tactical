import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const TacticalGameCreation = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: 'Game name',
        description: 'Game description',
        user: "lab.cabrera@gmail.com"
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        fetch("http://localhost:3001/v1/tactical-games", requestOptions)
            .then(response => response.json())
            .then(data => navigate("/tactical/view/" + data._id, { state: { game: data } }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required />
                <TextField
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal" />
                <Button type="submit" variant="contained" color="primary">
                    Create
                </Button>
            </form>
            <pre>
                {JSON.stringify(formData, null, 2)}
            </pre>
        </div>
    );
}

export default TacticalGameCreation;