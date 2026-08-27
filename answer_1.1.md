1. Thiếu async/await

- The line with the problem:
  + app.post('/api/notes', (req, res) => {
  + const note = Note.create({
    title: req.body.title,
    content: req.body.content,
    });

- Note.create() trả về một Promise nên nếu không await thì note lúc này vẫn là Promise chứ chưa phải note được tạo nên res không trả về dữ liệu note như mong muốn

2. Không có response trong catch

- The line with the problem:
  + catch (error) {
    console.log(error);
    }

- Nếu trong try bị lỗi thì sẽ lọt vào catch, trong catch chỉ log lỗi không gửi response cho client. client có thể bị request pending haowcj timeout

3. Thiếu validate req.body

- The line with the problem:
  + title: req.body.title,
  + content: req.body.content,

- Trong trường hợp nếu title hoặc content là required mà body không có mà vẫn tạo note sẽ dẫn đến lỗi.


* The fix:
app.post('/api/notes', async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: 'Title and content are required',
      });
    }

    const note = await Note.create({
      title,
      content,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create note',
    });
  }
});
