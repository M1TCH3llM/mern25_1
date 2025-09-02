export default function SuccessStory({ title, text, author }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{text}</p>
      {author && <div className="muted">— {author}</div>}
    </article>
  );
}
