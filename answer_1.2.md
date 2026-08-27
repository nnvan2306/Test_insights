const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

- name không nên để trống mà cần có giá trị nhưng không đưuocj qúa dài.
- Thường thì email được dùng để định danh nên cần required và không đưuocj trùng nhau. 
- age để lưu tuổi nên để number vì có thể cần query hoặc handle tính toán sẽ thuận tiện hơn không cần phải mất thêm bước parse từ string sang number.
- Sử dụng timestamps: true Mongoose sẽ tự tạo createdAt và updatedAt với kiểu Date như vậy sẽ dễ query, sort hoặc filter theo thời gian