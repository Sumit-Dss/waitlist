import { useState } from "react";
import "./App.css";
import joinImg from "./assets/join.png";
import waitlistImg from "./assets/waitlist.png";
import coinspiracyImg from "./assets/coinspiracy.png";

// outside component — not recreated on every render
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxWaCah5mx6y_-kNomU-sB3Qg97W9F5K_l42sbaOIMvglE2ohq7umeJXnvEi0nYMw/exec";
const phoneRegex = /^[6-9]\d{9}$/;

export default function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  async function handleJoin(e) {
    e.preventDefault();
    let valid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }

    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      valid = false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError("Enter a valid 10-digit Indian mobile number");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!valid) return;
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone }),
      });
    } catch (_) {}
    setSubmitted(true);
  }

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Something big is coming</p>
        <div className="ransom-headline">
          <img src={coinspiracyImg} alt="coinspiracy" className="img-coinspiracy" />
          <img src={joinImg} alt="join" className="img-join" />
          <img src={waitlistImg} alt="waitlist" className="img-waitlist" />
        </div>
      </header>

      <section className="tagline-section">
        <p className="tagline">One game. Multiple twists. Countless ways to win.</p>
        <p className="introducing">Introducing <strong>COINSPIRACY</strong>.</p>
        <p className="tagline">Think you can play the game? 😈</p>
      </section>

      {submitted ? (
        <div className="success-box">🎉 You&apos;re on the list! We&apos;ll be in touch.</div>
      ) : (
        <form className="waitlist-form" onSubmit={handleJoin}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => { setName(e.target.value); setNameError(""); }}
          />
          {nameError && <p className="field-error">{nameError}</p>}
          <input
            type="tel"
              placeholder="9xxxxxxxx"
            maxLength={10}
            value={phone}
            onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setPhoneError(""); }}
          />
          {phoneError && <p className="field-error">{phoneError}</p>}
          <button type="submit">Join now</button>
        </form>
      )}

      <footer className="description">
        <p>Imagine walking into a game where your decisions can make you rich, one wrong move can cost you everything, and trust isn't always what it seems. 👀</p>
        <ul>
          <li>🪙 Build your fortune, one decision at a time.</li>
          <li>🤝 Make alliances, but choose your moves carefully.</li>
          <li>🎭 Take risks, read the room, and know when to play your cards.</li>
          <li>🔥 Expect unexpected twists that can change the game in seconds.</li>
        </ul>
        <p>No boring rounds. No predictable outcomes. Just strategy, competition, and a whole lot of suspense.</p>
        <p className="footer-copy">© 2026 · No spam, ever.</p>
      </footer>
    </div>
  );
}
