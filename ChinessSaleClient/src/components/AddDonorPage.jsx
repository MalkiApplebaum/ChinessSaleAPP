import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { AddDonor } from '../api/DonorApi';

export const AddDonorPage = ({ onAddDonor }) => {
    const [password, setpassword] = useState('');
    const [name, setname] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');

    const handleSubmit = async (e) => {
       
        e.preventDefault();
        try {
            const donor = {  password, name, phone,email };
            console.log('Sending donor:', donor);
            const newDonor = await AddDonor( password, name, phone,email);
            setpassword('');
            setname('');
            setphone('');
            setemail('');
            onAddDonor(newDonor); // Call the callback function to update the parent state
            alert('Donor added successfully!');
        } catch (error) {
            console.error('Failed to add donor', error);
            alert('Failed to add donor. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Add New Donor
                </Typography>
                <form onSubmit={handleSubmit}>
                <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        required
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        multiline
                        minRows={1}
                        maxRows={2}
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="phone"
                        variant="outlined"
                        type="number"
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                        required
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Add Donor
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

