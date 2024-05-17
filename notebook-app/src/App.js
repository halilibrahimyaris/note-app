import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import { RegistrationForm } from './components/RegistrationForm';

import { LoginForm } from './components/LoginForm';

import { NoteList } from './components/NoteList';

import { AddNoteForm } from './components/AddNoteForm';

import { getAllNotes, createNote, updateNote, deleteNote ,register,login} from './api/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(''); // State for new note input
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  const handleShowLoginForm = () => {
    setShowRegistrationForm(false);
  };
  const handleRegistration = (userData) => {
    console.log(userData);
    register(userData).then((registerResponse) => {
      if (registerResponse && registerResponse === 'Registration successful') {
        // Assuming the token is present in the response
        localStorage.setItem('authToken', registerResponse.access_token);
        // Redirect user to login form after successful registration
        setShowRegistrationForm(false);
      } else {
        console.error('Registration failed:', registerResponse);
        displayErrorMessage('Registration failed. Please try again.');
      }
    });
  };

  const handleLogin = (loginData) => {
    console.log(loginData);
    login(loginData).then((loginResponse) => {
      if (loginResponse && loginResponse.access_token) {
        // Assuming the token is present in the response
        setIsLoggedIn(true);
        localStorage.setItem('authToken', loginResponse.access_token);
        // Perform any additional actions after successful login
      } else if (loginResponse) {
        console.error('Login failed:', loginResponse);
        displayErrorMessage('Invalid username or password.');
      } else {
        console.error('Login failed:', loginResponse);
        displayErrorMessage('An error occurred. Please try again later.');
      }
    });
  };

  const displayErrorMessage = (errorMessage) => {
    // Use a method to display the error message to the user
    // (e.g., using an alert, toast notification, or state management)
    alert(errorMessage); // Example using alert
  };
  useEffect(() => {
    if (setIsLoggedIn) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('authToken'); // Retrieve token
          const response = await getAllNotes(token); // Call getAllNotes with token
          debugger;
          setNotes(response);
        } catch (error) {
          console.error('Error fetching notes:', error);
        }
      };

      fetchData();
    }
  }, [setIsLoggedIn]);
  const handleAddNote = async (newNote) => {
    try {
      // Assuming you have the token stored in a variable called 'authToken'
      const token = localStorage.getItem('authToken');

      const response = await createNote(newNote, token); // Call createNote with note and token
      setNotes([...notes, response]); // Update state with response data
      setNewNote(''); // Clear new note input after adding
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };
  const handleUpdateNote = async (id, updatedNote) => {
    try {
      // Call the updateNote function from api.js
      const updatedNoteData = await updateNote(id, updatedNote);

      // Update local state (consider API response for validation)
      const updatedNotes = notes.map((note) => (note.id === id ? updatedNoteData : note));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };
  const handleDeleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem('authToken');
      await deleteNote(noteId, token); // Call deleteNote with token
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
      <div className="App">
        {isLoggedIn ? (
            <>
              <NoteList notes={notes} onDeleteNote={handleDeleteNote} onUpdateNote={handleUpdateNote} />
              <AddNoteForm onAddNote={handleAddNote} />
            </>
        ) : (
            <>
             {/* <RegistrationForm onRegistration={handleRegistration}/>
              <LoginForm onLogin={handleLogin}/>*/}
              <div className="form-toggle">
                <button onClick={handleShowLoginForm} className={!showRegistrationForm ? 'active' : ''}>
                  Giriş Yap
                </button>
                <button onClick={handleShowRegistrationForm} className={showRegistrationForm ? 'active' : ''}>
                  Kaydol
                </button>
              </div>
              {showRegistrationForm ? (
                  <RegistrationForm onRegistration={handleRegistration}/>
              ) : (
                  <LoginForm onLogin={handleLogin}/>
              )}
            </>
        )}
      </div>
  );
}

export default App;