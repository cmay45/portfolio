export default function PrivacySecurity({ onBack, onContact }) {
  return (
    <main className="legalPage">
      <div className="wrap legalWrap">
        <button className="textButton" type="button" onClick={onBack}>← Back to site</button>

        <p className="eyebrow">Privacy & Security</p>
        <h1>Privacy & Security Notice</h1>
        <p className="muted">Last updated: July 2026</p>

        <section>
          <h2>No cookies or tracking</h2>
          <p>
            This website does not use cookies, advertising pixels, behavioral tracking, or cross-site analytics.
          </p>
        </section>

        <section>
          <h2>Information collected</h2>
          <p>
            If you submit the contact form, Signalcraft Analytics collects the information you choose to provide,
            which may include your name, email address, company name, and message.
          </p>
        </section>

        <section>
          <h2>Why this information is used</h2>
          <p>
            This information is used only to respond to your inquiry, evaluate whether Signalcraft Analytics may be a
            fit for your needs, maintain basic business records, and protect the website from spam or abuse.
          </p>
        </section>

        <section>
          <h2>Contact form security</h2>
          <p>
            The contact form uses basic spam prevention techniques that do not require cookies, including a hidden
            honeypot field, timing checks, server-side validation, origin checks, and message filtering. The form is
            transmitted over HTTPS.
          </p>
        </section>

        <section>
          <h2>Sharing</h2>
          <p>
            Signalcraft Analytics does not sell personal information. Contact form submissions may be processed by
            service providers that support the operation of this website and email delivery, such as website hosting
            and transactional email providers.
          </p>
        </section>

        <section>
          <h2>Retention</h2>
          <p>
            Contact form submissions are retained only as long as reasonably necessary to respond to the inquiry,
            maintain business records, resolve disputes, or comply with legal obligations.
          </p>
        </section>

        <section>
          <h2>Your choices and rights</h2>
          <p>
            You may request access to, correction of, or deletion of personal information you provided through the
            contact form by emailing signalcraftanalytics@gmail.com.
          </p>
          <p>
            Depending on where you live, including California, Canada, the European Union, or the United Kingdom, you
            may have additional privacy rights under applicable law.
          </p>
        </section>

        <section>
          <h2>Security</h2>
          <p>
            Signalcraft Analytics uses reasonable technical and organizational safeguards appropriate for a small
            professional services website, including HTTPS, server-side validation, and limited data collection.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Signalcraft Analytics is operated by Charles May Analytics, LLC.
          </p>
          <button className="primaryBtn" type="button" onClick={onContact}>Contact Signalcraft</button>
        </section>
      </div>
    </main>
  );
}
