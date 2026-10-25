
import { Search, ArrowUpRight, MapPin, Sparkles } from "lucide-react";

export default function Hero({ query, setQuery }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="live-dot"></span>
          THE CAMPUS COMMUNITY, CONNECTED
        </div>

        <h1>
          Your next
          <br />
          great story <span>starts here.</span>
        </h1>

        <p className="hero-description">
          The best things happen when you show up.
          Find your people, your passions, your next thing.
        </p>

        <form
            className="hero-search"
            onSubmit={(e) => {
                e.preventDefault();
                document.getElementById("events")?.scrollIntoView({
                    behavior: "smooth"
                });
            }}
        >
          <Search size={19} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, clubs, interests..."
            aria-label="Search events"
          />
          <button type="submit">
            Explore <ArrowUpRight size={16} />
          </button>
        </form>

        <div className="hero-foot">
          <div className="avatar-stack">
            <span>R</span>
            <span>A</span>
            <span>M</span>
            <span>+</span>
          </div>
          <span><strong>1,200+</strong> students finding their thing</span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=85"
            alt="Students gathering at a campus event"
          />

          <div className="image-label">
            <span className="live-dot"></span>
            HAPPENING ON CAMPUS
          </div>

          <div className="floating-event">
            <div className="floating-date">
              <strong>02</strong>
              <span>NOV</span>
            </div>

            <div>
              <b>Neon Nights</b>
              <small><MapPin size={12} /> Open Air Theatre</small>
            </div>

            <ArrowUpRight className="floating-arrow" size={18} />
          </div>
        </div>

        <div className="hero-note">
          <Sparkles size={22} />
          <div>
            <b>Make it a moment.</b>
            <small>Not just another day.</small>
          </div>
        </div>
      </div>

      <div className="hero-bottom-line">
        <span>SCROLL TO FIND YOUR NEXT THING</span>
        <span className="line"></span>
        <span>01 / 03</span>
      </div>
    </section>
  );
}
