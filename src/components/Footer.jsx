
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <>
      <section className="cta-section">
        <div>
          <div className="eyebrow">✳ YOUR NEXT CHAPTER AWAITS</div>

          <h2>
            Make campus
            <br />
            the <span>main event.</span>
          </h2>

          <p>
            There's a whole world happening right outside your lecture hall.
          </p>
        </div>

        <a className="cta-button" href="#events">
          Find your next event <ArrowUpRight size={18} />
        </a>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#">
          <span className="brand-icon">
            <Sparkles size={17} />
          </span>

          <span className="brand-text">
            campus<span>plus</span>
            <small>YOUR CAMPUS, YOUR COMMUNITY</small>
          </span>
        </a>

        <p>Made for the moments between the lectures.</p>

        <span className="footer-copy">© 2026 CAMPUSPLUS</span>
      </footer>
    </>
  );
}
