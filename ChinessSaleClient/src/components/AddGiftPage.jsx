


import React, { useState } from 'react';
import { AddGift, GetCategoryById } from '../api/api';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

export const AddGiftPage = ({ onAddGift }) => {
    const [donorId, setDonorId] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const gift = { donorId, price, name, description, categoryId, image };
            console.log('Sending gift:', gift);
            const newGift = await AddGift(donorId, price, name, description, categoryId, image);
            const category = await GetCategoryById(newGift.categoryId);
            newGift.category = category.name;
            setDonorId('');
            setPrice('');
            setName('');
            setDescription('');
            setCategoryId('');
            setImage('');
            onAddGift(newGift); // Call the callback function to update the parent state
            alert('Gift added successfully!');
        } catch (error) {
            console.error('Failed to add gift', error);
            alert('Failed to add gift. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Add New Gift
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Donor ID"
                        variant="outlined"
                        value={donorId}
                        onChange={(e) => setDonorId(e.target.value)}
                        required
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        variant="outlined"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        multiline
                        minRows={4}
                        maxRows={8}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Category ID"
                        variant="outlined"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Image URL"
                        variant="outlined"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Add Gift
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

