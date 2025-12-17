import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./NotesBox.css";

export default function NotesBox({ patientId }) {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all notes for patient
  const fetchNotes = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/notes/${patientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes(res.data);
    } catch (err) {
      console.log("Error fetching notes:", err);
    }
  }, [patientId, token]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Add new note
  const addNote = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(
        `http://localhost:8000/api/notes/${patientId}`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setText("");
      fetchNotes(); // refresh notes after adding
    } catch (err) {
      console.log("Error adding note:", err);
    }
  };

  return (
    <div className="notes-box">
      <h3>📋 Clinical Notes</h3>

      <div className="note-input-container">
        <textarea
          placeholder="Type clinical observations here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addNote} className="add-note-btn">
          Post Note ↵
        </button>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty-notes">
            No notes recorded yet.
          </div>
        ) : (
          notes.map((n) => (
            <div key={n._id} className="note-item">
              <p className="note-text">{n.text}</p>
              
              <div className="note-meta">
                <span className="author-name">
                  👨‍⚕️ {n.author?.name || "Medical Staff"}
                </span>
                <span>
                  {new Date(n.createdAt).toLocaleString([], { 
                    year: 'numeric', month: 'short', day: 'numeric', 
                    hour: '2-digit', minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}