export default function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl transition">
      <h2 className="font-bold text-lg text-gray-800 truncate">{note.title}</h2>
      <p className="mt-2 text-gray-600">{note.description}</p>
      <time className="text-xs text-gray-400 mt-3">{new Date(note.createdAt).toLocaleString()}</time>

      <div className="mt-4 flex gap-3">
        <button
          className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
