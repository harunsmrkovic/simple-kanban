export default function TaskForm() {
  return (
    <form>
      <label>
        <span>Title</span>
        <input name="title" />
      </label>
      <label>
        <span>Email</span>
        <input name="email" />
      </label>
      <label>
        <span>Description</span>
        <textarea name="email" />
      </label>
      <div>
        <button type="button">Cancel</button>
        <button type="submit">Save task</button>
      </div>
    </form>
  );
}
