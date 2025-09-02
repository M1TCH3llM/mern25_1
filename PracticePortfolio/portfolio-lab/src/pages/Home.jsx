export default function Home() {
  return (
    <div>
      <h1>Welcome </h1>
      <p>This portfolio is a hands-on lab for core React patterns.</p>
      <ol>
        <li>Controlled vs Uncontrolled components</li>
        <li>Sharing data between parent and child (props/objects/classes)</li>
        <li>Sending data from child to parent (callback)</li>
        <li>Navigating via button and passing data to the destination</li>
        <li>State changes: <code>setState</code> vs <code>forceUpdate</code></li>
      </ol>
      <p>Use the nav above to explore each topic.</p>
    </div>
  )
}
