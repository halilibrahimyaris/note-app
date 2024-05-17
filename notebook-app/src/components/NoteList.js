import React, { useState } from 'react';
import '../NotList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal'; // Import the Modal component

export const NoteList = ({ notes, onDeleteNote, onUpdateNote }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentNote, setCurrentNote] = useState({});
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    const handleEditNote = (note) => {
        debugger;
        setCurrentNote(note);
        setShowModal(true); // Open the modal
        setIsEditing(true);
    };

    const handleUpdateNote = (id,updatedNote) => {
        onUpdateNote(id,updatedNote);
        setShowModal(false); // Close the modal
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setShowModal(false);
        setIsEditing(false);
    };

    return (

        <div className="note-list">
            <h2>Notlar</h2>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <div className="note-item">
                            {isEditing && currentNote.id === note.id ? (
                                <Modal
                                    isOpen={showModal}
                                    onClose={handleCancelEdit}
                                    title="Notu Düzenle"
                                >
                                    <div className="edit-form">
                                        <input
                                            type="text"
                                            placeholder="Başlık"
                                            defaultValue={currentNote.title}
                                            onChange={(e) =>
                                                setCurrentNote({ ...currentNote, title: e.target.value })
                                            }

                                        />
                                        <textarea
                                            placeholder="İçerik"
                                            defaultValue={currentNote.content}
                                            onChange={(e) =>
                                                setCurrentNote({ ...currentNote, content: e.target.value })
                                            }
                                        />
                                        <div className="edit-buttons">
                                            <button onClick={() => handleUpdateNote(currentNote.id,currentNote)}>
                                                Güncelle
                                            </button>
                                            <button onClick={handleCancelEdit}>İptal</button>
                                        </div>
                                    </div>
                                </Modal>
                            ) : (
                                <>
                                    <p>{note.title}</p>
                                    <p>{note.content}</p>
                                    <div className="action-buttons">
                                        <button onClick={() => handleEditNote(note)}>
                                            <FontAwesomeIcon icon={faPencilAlt} /> Düzenle
                                        </button>
                                        <button onClick={() => onDeleteNote(note.id)} >
                                            <FontAwesomeIcon icon={faTrashAlt} /> Sil
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;