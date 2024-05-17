package com.notebook.notebookApp.service;

import com.notebook.notebookApp.entity.Note;
import com.notebook.notebookApp.entity.User;
import com.notebook.notebookApp.repository.NoteRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class NoteService  {
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getAllNotes() {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return noteRepository.findAllByOwner(user.getUsername());
    }
    public Note createNote( Note note) {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        note.setOwner(user.getUsername());
        return noteRepository.save(note);
    }
    public Note updateNote(Long id, Note note) {
        Note existingNote = noteRepository.findById(id).orElseThrow(() -> new RuntimeException(" NoteNotFoundException"+ id));
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        note.setOwner(user.getUsername());
        existingNote.setTitle(note.getTitle());
        existingNote.setContent(note.getContent());
        return noteRepository.save(existingNote);
    }
    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }
}
