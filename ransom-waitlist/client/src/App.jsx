import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    Promise.all(
      ["join", "waitlist"].map((text) =>
        fetch("http://localhost:3001/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        })
          .then((r) => r.json())
          .then((d) => d.image)
      )
    )
      .then(setImages)
      .catch(() => {});
  }, []);

  function handleJoin(e) {
    e.preventDefault();
    if (name.trim() && phone.trim()) setSubmitted(true);
  }

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Something big is coming</p>

        {images.length === 2 && (
          <div className="ransom-headline">
            <img src={images[0]} alt="join" />
            <img src={images[1]} alt="waitlist" />
          </div>
        )}

        {submitted ? (
          <div className="success-box">🎉 You&apos;re on the list! We&apos;ll be in touch.</div>
        ) : (
          <form className="waitlist-form" onSubmit={handleJoin}>
            <input
              type="text"
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit">Join now</button>
          </form>
        )}
      </header>

      <footer>
        <p>© 2026 · No spam, ever.</p>
      </footer>
    </div>
  );
}
