import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NoteForm from "../components/NoteForm";
import { updateNoteAsync } from "../store/notesSlice";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const note = useSelector((state) =>
    state.notes.find((n) => n.id === id)
  );

  if (!note) return <p className="text-center mt-10 text-gray-500">Note not found!</p>;

  const handleSubmit = (data) => {
    dispatch(updateNoteAsync({ id: note.id, updated: data }));
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Note</h1>
      <NoteForm initial={note} onSubmit={handleSubmit} />
    </div>
  );
}
