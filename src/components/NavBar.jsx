import { CalendarDays, Bookmark, Sun, Moon, Plus } from "lucide-react";

export default function NavBar({ dark, setDark, showSaved, setShowSaved }) {
  const goToEvents = () => {
    document.getElementById("events")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className="navbar">
      <a href="#" className="brand">
        <span className="brand-icon">
          <CalendarDays size={20} />
        </span>

        <span className="brand-text">
          Campus<span>Plus</span>
          <small>CAMPUS LIFE, CONNECTED</small>
        </span>
      </a>

      <div className="nav-links">
        <a
          href="#events"
          className={!showSaved ? "active" : ""}
          onClick={() => setShowSaved(false)}
        >
          Explore
        </a>

        <button
          className={`saved-link ${showSaved ? "saved-active" : ""}`}
          onClick={() => {
            setShowSaved(!showSaved);
            goToEvents();
          }}
        >
          <Bookmark size={16} />
          {showSaved ? "Show all" : "Saved"}
        </button>
      </div>

      <div className="nav-actions">
        <button
          className="theme-btn"
          onClick={() => setDark(!dark)}
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <a
          href="mailto:your-email@example.com?subject=CampusPlus%20Event%20Submission"
          className="submit-btn"
        >
          <Plus size={16} />
          Submit Event
        </a>
      </div>
    </nav>
  );
}
