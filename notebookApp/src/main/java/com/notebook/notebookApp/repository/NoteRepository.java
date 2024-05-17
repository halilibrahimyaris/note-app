package com.notebook.notebookApp.repository;

import com.notebook.notebookApp.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findAllByOwner(String owner);
}
