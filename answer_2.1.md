1. useState thiếu initial value
- the line with the problem:
   + const [notes, setNotes] = useState();
   + notes.map

- Khi component render lần đầu nếu useState ban đầu không có initial value thì notes.map sẽ là undefine.map -> sẽ bị lỗi.


2. useEffect không nên dùng async trực tiếp.
- the line with the problem:
   + useEffect(async () => {

- useEffect không hỗ trợ trực tiếp async function.


3. handleDelete đang được gọi ngay khi render
- the line with the problem:
   + <button onClick={handleDelete(note._id)}>Delete</button>

- handleDelete đang được gọi ngay khi render chứ không phải đợi user click button mứoi gọi.


4. handleDelete chưa có async/await và chưa check res.
- the line with the problem:
   + function handleDelete(id) {
    fetch(`/api/notes/${id}`, { method: 'DELETE' });
    setNotes(notes.filter((n) => n.id !== id));
    }

- Theo hiện tại khi gọi handleDelete sẽ fetch rồi filter luôn để xoá note vừa click mà không quan tâm có xoá thnahf công trong db hay không. 


5. Khi map các item chưa có key.
- <li>
- React cần key để xác định từng item trong list khi rerender.

* fix:
function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      const res = await fetch('/api/notes');
      const data = await res.json();
      setNotes(data);
    }

    fetchNotes();
  }, []);

  async function handleDelete(id) {
    const res = await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setNotes((prevNotes) =>
        prevNotes.filter((n) => n._id !== id)
      );
    }
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note._id}>
          {note.title}
          <button onClick={() => handleDelete(note._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}