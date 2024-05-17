package com.notebook.notebookApp.controller;

import com.notebook.notebookApp.entity.Note;
import com.notebook.notebookApp.repository.NoteRepository;
import com.notebook.notebookApp.service.NoteService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/userNotes")
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/save")
    public Note createNote(@RequestBody Note note) {

        return noteService.createNote(note);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note note) {
        return noteService.updateNote(id,note);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
    }
}
