import React, { useState } from 'react';
import '../AddNoteForm.css';

export const AddNoteForm = ({ onAddNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newNote = {
            id: Date.now(), // Benzersiz bir ID oluşturmak için
            title,
            content,
        };
        onAddNote(newNote); // Yeni notu ekleme işlemini props aracılığıyla tetikleme
        setTitle(''); // Formu temizleme
        setContent('');
    };

    return (
        <form className={'add-note-form'} onSubmit={handleSubmit}>
            <h2>Yeni Not Oluştur</h2>
            <label>Başlık:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>İçerik:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <button type="submit">Oluştur</button>
        </form>
    );
}

export default AddNoteForm;