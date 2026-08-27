- Hiện tại đầu tiên đang await Note.find({}) sẽ query lấy tất cả 500000 documents lên sau đó notes.filter như vậy lại phải lặp qua 500000 documents thêm lần nữa để lọc

- Rewrite:
app.get('/api/notes/search', async (req, res) => {
  const q = req.query.q;
  const results = await Note.find({
    title: { $regex: q }
  });
  res.json(results);
});