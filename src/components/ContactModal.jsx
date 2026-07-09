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

        <p className="eyebrow">Schedule a discovery call</p>

        <h2 id="contact-title">Request a Signalcraft Diagnostic Call.</h2>

        <p className="contactIntro">
          Use this form to request a discovery call. The first conversation is focused on the decision you need to make,
          where the current data or AI system is breaking down, and whether a Signalcraft diagnostic is the right next step.
        </p>

        {status === "sent" ? (
          <div className="contactSuccess">
            <h3>Request sent.</h3>
            <p>Thanks — I’ll review this and follow up about scheduling a discovery call if it looks like a fit.</p>

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
              What kind of help are you looking for?
              <select name="helpType" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option value="Schedule a discovery call">Schedule a discovery call</option>
                <option value="Data/analytics diagnostic">Data/analytics diagnostic</option>
                <option value="AI readiness or workflow review">AI readiness or workflow review</option>
                <option value="Dashboard/reporting trust issue">Dashboard/reporting trust issue</option>
                <option value="Modeling, forecasting, or anomaly detection">Modeling, forecasting, or anomaly detection</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </label>

            <label>
              Decision problem
              <textarea
                name="message"
                required
                rows={6}
                maxLength={4000}
                placeholder="What decision are you trying to make, and where is the current data, reporting, or AI workflow breaking down?"
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
              {status === "submitting" ? "Sending…" : "Request discovery call"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
