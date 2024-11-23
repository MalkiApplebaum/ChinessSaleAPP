import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddDonorModal from "./AddDonorModal";
import EditDonorModal from "./EditDonorModal";
import { deleteDonor, updateDonor, GetPresentByDonorId } from "../api/DonorApi";
import NavigationBarManager from "./NavigationBarManager";
import { getAllDonors } from '../api/api';


const AllDonors = () => {
    const [donors, setDonors] = useState([]);
    const [layout, setLayout] = useState("grid");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [gifts, setGifts] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("");

    useEffect(() => {
        getAllDonorsData();
    }, []);

    const getAllDonorsData = async () => {
        try {
            const donorsData = await getAllDonors("/api/Donor");
            setDonors(donorsData);
            const allGifts = await Promise.all(donorsData.map((donor) => GetPresentByDonorId(donor.id)));
            setGifts(allGifts.flat());
        } catch (error) {
            console.error("Error fetching donors:", error);
        }
    };

    const addNewDonorToState = (newDonor) => {
        setDonors([...donors, newDonor]);
    };

    const deletedonor = async (donorId) => {
        await deleteDonor(donorId);
        setDonors(donors.filter((donor) => donor.id !== donorId));
    };

    const editDonor = (donor) => {
        setSelectedDonor(donor);
        setIsEditModalOpen(true);
    };

    const onEditDonor = async (updatedonor) => {
        await updateDonor(updatedonor);
        setDonors(donors.map((donor) => (donor.id === updatedonor.id ? updatedonor : donor)));
        setIsEditModalOpen(false);
    };

    const openDialog = async (donor) => {
        setSelectedDonor(donor);
        try {
            const donorsGift = await GetPresentByDonorId(donor.id);
            setGifts(donorsGift);
            setIsDialogOpen(true);
        } catch (error) {
            console.error("Error fetching gifts:", error);
        }
    };

    const searchOptions = [
        { label: "שם תורם", value: "name" },
        { label: "אימייל תורם", value: "email" },
        { label: "מתנה", value: "gift" },
    ];

    const handleSearchTypeChange = (e) => {
        setSearchType(e.value);
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredDonors = donors.filter((donor) => {
        if (searchType === "name") {
            return donor.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (searchType === "email") {
            return donor.email.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (searchType === "gift") {
            const donorGifts = gifts.filter((gift) => gift.donorId === donor.id);
            return donorGifts.some((gift) => gift.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return true;
    });

    const itemTemplate = (donor) => (
        <div className="donor-card">
             <img 
                className="donor-image" 
                src="/pic/profil.png" 
                alt="Donor Placeholder" 
            />
            <div className="donor-details">
                <h3>{donor.name}</h3>
                <p><i className="pi pi-envelope"></i> {donor.email}</p>
                <p><i className="pi pi-phone"></i> {donor.phone}</p>
                <div className="action-buttons">
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => editDonor(donor)} />
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deletedonor(donor.id)} />
                    <Button icon="pi pi-gift" className="p-button-rounded p-button-help" onClick={() => openDialog(donor)} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="all-donors">
            <style>
                {`
                    .all-donors {
                        padding: 1rem;
                        max-width: 1200px;
                        margin: auto;
                    }

                    .search-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 1rem;
                        flex-wrap: wrap;
                    }

                    .donor-card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        border: 1px solid #e0e0e0;
                        padding: 1rem;
                        border-radius: 8px;
                        text-align: center;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }

                    .donor-image {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        margin-bottom: 1rem;
                    }

                    .donor-details h3 {
                        margin: 0.5rem 0;
                        font-size: 1.25rem;
                    }

                    .donor-details p {
                        margin: 0.25rem 0;
                        font-size: 0.9rem;
                        color: #555;
                    }

                    .action-buttons {
                        display: flex;
                        gap: 0.5rem;
                        margin-top: 1rem;
                    }

                    @media (max-width: 768px) {
                        .donor-card {
                            flex-direction: column;
                            padding: 0.5rem;
                        }

                        .search-header {
                            flex-direction: column;
                            align-items: stretch;
                        }
                    }
                        .custom-search-input {
                        width: 100%;
                        max-width: 400px;
                        padding: 12px 20px;
                        font-size: 1rem;
                        border: 2px solid #ccc;
                        border-radius: 25px;
                        outline: none;
                        transition: border-color 0.3s, box-shadow 0.3s;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }

                    .custom-search-input:focus {
                        border-color: #007ad9;
                        box-shadow: 0 0 8px rgba(0, 122, 217, 0.5);
                    }

                `}
            </style>
            <NavigationBarManager />
            <div className="search-header">
                <Dropdown value={searchType} options={searchOptions} onChange={handleSearchTypeChange} placeholder="חיפוש לפי" />
                <input 
                type="text" 
                className="custom-search-input" 
                value={searchTerm} 
                onChange={handleSearchTermChange} 
                placeholder="הכנס ערך לחיפוש..." 
            />  
                  <Button label="הוספת תורם" onClick={() => setIsAddModalOpen(true)} />                  
            </div>
            <DataView value={filteredDonors} itemTemplate={itemTemplate} layout={layout} paginator rows={6} />
            <AddDonorModal visible={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={addNewDonorToState} />
            <EditDonorModal visible={isEditModalOpen} donor={selectedDonor} onClose={() => setIsEditModalOpen(false)} onEdit={onEditDonor} />
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle> מתנות שתרם- {selectedDonor && selectedDonor.name}</DialogTitle>
                <DialogContent>
                    {gifts.map((gift) => (
                        <div key={gift.id}>{gift.name}</div>
                    ))}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AllDonors;
