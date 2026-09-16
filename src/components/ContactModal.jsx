import { useEffect, useState } from "react";

export default function ContactModal({ open, onClose }) {
  const [loadedAt, setLoadedAt] = useState(Date.now());
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setLoadedAt(Date.now());
      setStatus("idle");
      setError("");
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      website: formData.get("website"),
      helpType: formData.get("helpType"),
      message: formData.get("message"),

      // Honeypot field. Real users should never fill this.
      referralCode: formData.get("referralCode"),

      // Privacy acknowledgment.
      consent: formData.get("consent") === "on",

      // Used by the API to reject instant bot submissions.
      loadedAt,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();

      let result = {};

      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(
          "The contact endpoint did not return JSON. Make sure you are running with `vercel dev`, not only `npm run dev`."
        );
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unable to send message.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Unable to send message.");
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div className="contactOverlay" role="presentation" onMouseDown={onClose}>
      <section
        className="contactModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="contactClose"
          type="button"
          onClick={onClose}
          aria-label="Close contact form"
        >
          ×
        </button>

        <p className="eyebrow">Start a Conversation</p>

        <h2 id="contact-title">What decision, forecast, or model does your team need to trust?</h2>

        <p className="contactIntro">
          Tell me about the decision, forecast, or model; where confidence is breaking down; and what the business is working around today. The first conversation is designed to determine whether a focused Signalcraft Decision Diagnostic is the right next step.
        </p>

        {status === "sent" ? (
          <div className="contactSuccess">
            <h3>Request sent.</h3>
            <p>Thanks — I’ll review this and follow up about scheduling a call.</p>

            <button className="primaryBtn" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contactForm">
            <label>
              Name
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={120}
              />
            </label>

            <label>
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={180}
              />
            </label>

            <label>
              Phone
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                maxLength={40}
              />
            </label>

            <label>
              Company <span>optional</span>
              <input
                name="company"
                type="text"
                autoComplete="organization"
                maxLength={160}
              />
            </label>

            <label>
              Website <span>optional</span>
              <input
                name="website"
                type="url"
                autoComplete="url"
                placeholder="https://example.com"
                maxLength={240}
              />
            </label>

            <label>
              Where is the decision breaking down?
              <select name="helpType" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option value="Forecasting or planning uncertainty">Forecasting or planning uncertainty</option>
                <option value="Predictive modeling or prioritization">Predictive modeling or prioritization</option>
                <option value="Cost, demand, capacity, or risk estimation">Cost, demand, capacity, or risk estimation</option>
                <option value="Anomaly detection or early warning">Anomaly detection or early warning</option>
                <option value="Measurement or causal analysis">Measurement or causal analysis</option>
                <option value="Analytical foundation or data trust">Analytical foundation or data trust</option>
                <option value="AI or automation decision support">AI or automation decision support</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </label>

            <label>
              What decision are you trying to improve?
              <textarea
                name="message"
                required
                rows={6}
                maxLength={4000}
              />
            </label>

            {/* Honeypot field. Keep visually hidden, not type="hidden". */}
            <label className="hpField" aria-hidden="true">
              Referral code
              <input
                name="referralCode"
                type="text"
                tabIndex="-1"
                autoComplete="off"
              />
            </label>

            <label className="privacyCheck">
              <input name="consent" type="checkbox" required />
              <span>
                I understand this form collects my name, email, phone number,
                optional company/website, selected help type, and message so Signalcraft Analytics can respond.
              </span>
            </label>

            {error ? <p className="formError">{error}</p> : null}

            <button
              className="primaryBtn"
              type="submit"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Assess the Fit"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
