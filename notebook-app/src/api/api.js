import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistrationForm from "../components/RegistrationForm";

export const getAllNotes = async (token) => {
    const config = {
        method: 'get',
        url: 'http://localhost:8080/api/notes/userNotes', // Assuming this is your API endpoint
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    const response = await axios(config);
    return response.data;
};

export const createNote = async (note, token) => {
    const config = {
        method: 'post',
        url: 'http://localhost:8080/api/notes/save', // Assuming this is your API endpoint
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(note),
    };

    const response = await axios(config);
    return response.data;
};
export const updateNote = async (id, note) => {
    try {
        const token = localStorage.getItem('authToken'); // Retrieve token from local storage
        const config = {
            method: 'put',
            url: `http://localhost:8080/api/notes/${id}`, // Assuming this is your API endpoint
            data: note, // Pass the updated note data in the request body
            headers: {
                'Authorization': `Bearer ${token}`, // Set the Authorization header with the token
            },
        };

        const response = await axios(config); // Make the PUT request with the config
        return response.data; // Return the updated note data from the response
    } catch (error) {
        console.error('Error updating note:', error);
    }
};

export const deleteNote = async (id, token) => {
    const config = {
        method: 'delete',
        url: `http://localhost:8080/api/notes/${id}`, // Assuming this is your API endpoint
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    await axios(config);
};

export const register = async (userData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/register', userData);
        return response.data; // Return the ResponseEntity object
    } catch (error) {
        console.error('Error registering:', error);
        return null; // Handle error and return null
    }
};
export const  login = async (loginData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', loginData);
        return response.data; // Return the ResponseEntity object
    } catch (error) {
        console.error('Error logging in:', error);
        return null; // Handle error and return null
    }
};
