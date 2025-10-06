import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (searchQuery = "") => {
    const response = await fetch(
      `http://localhost:4000/api/notes?search=${searchQuery}`
    );
    const data = await response.json();
    return data;
  }
);

export const addNoteAsync = createAsyncThunk(
  "notes/addNoteAsync",
  async (note) => {
    const response = await fetch("http://localhost:4000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    const data = await response.json();
    return data;
  }
);

export const updateNoteAsync = createAsyncThunk(
  "notes/updateNoteAsync",
  async ({ id, updated }) => {
    const response = await fetch(`http://localhost:4000/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const data = await response.json();
    return { id, updated: data };
  }
);

export const deleteNoteAsync = createAsyncThunk(
  "notes/deleteNoteAsync",
  async (id) => {
    await fetch(`http://localhost:4000/api/notes/${id}`, { method: "DELETE" });
    return id;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => action.payload)
      .addCase(addNoteAsync.fulfilled, (state, action) => state.unshift(action.payload))
      .addCase(updateNoteAsync.fulfilled, (state, action) => {
        const { id, updated } = action.payload;
        return state.map((note) => (note.id === id ? { ...note, ...updated } : note));
      })
      .addCase(deleteNoteAsync.fulfilled, (state, action) =>
        state.filter((note) => note.id !== action.payload)
      );
  },
});

export default notesSlice.reducer;
