export default function SuccessChild({ name, address, story }) {
  return (
    <section className="card">
      <h2>SuccessChild</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Address:</strong> {address}</p>

      <div>
        {story}
      </div>
    </section>
  );
}
