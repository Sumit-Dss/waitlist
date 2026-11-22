import { useState } from "react";
import "./App.css";
import joinImg from "./assets/join.png";
import waitlistImg from "./assets/waitlist.png";

export default function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Indian mobile: optional +91/0 prefix, then 10 digits starting with 6-9
  const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

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
    } else if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
      setPhoneError("Enter a valid Indian mobile number");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!valid) return;
    try {
      await fetch("https://script.google.com/macros/s/AKfycbz3v4fs-5kzRXSHu2HGrMWbMXaoA_5Qzs5Wtn0xenDmUeTEHkPFHBmzXZ1G2dcDAjJs/exec", {
        method: "POST",
        mode: "no-cors", // Apps Script doesn't send CORS headers; write still goes through
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });
    } catch (_) {}
    setSubmitted(true);
  }

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Something big is coming</p>

        <div className="ransom-headline">
          <img src={joinImg} alt="join" />
          <img src={waitlistImg} alt="waitlist" />
        </div>

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
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setPhoneError(""); }}
            />
            {phoneError && <p className="field-error">{phoneError}</p>}
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
