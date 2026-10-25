
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  CalendarDays,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import { events } from "../data/events";
import EventCard from "./EventCard";

const categories = [
  "All events",
  "Technology",
  "Music",
  "Workshop",
  "Business",
  "Science",
  "Sports",
];

export default function EventsSection({
  query,
  setQuery,
  showSaved,
  setShowSaved,
}) {
  const [category, setCategory] = useState("All events");
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("campusplus-saved") || "[]");
    } catch {
      return [];
    }
  });

  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);

  const [registered, setRegistered] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("campusplus-registered") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [registrationMessage, setRegistrationMessage] = useState("");

  const toggleSaved = (id) => {
    setSaved((previous) => {
      const updated = previous.includes(id)
        ? previous.filter((savedId) => savedId !== id)
        : [...previous, id];

      localStorage.setItem(
        "campusplus-saved",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const registerEvent = (event) => {
    if (registered.includes(event.id)) {
      setRegistrationMessage(
        `You're already registered for ${event.title}.`
      );
      return;
    }

    const updated = [...registered, event.id];

    localStorage.setItem(
      "campusplus-registered",
      JSON.stringify(updated)
    );

    setRegistered(updated);
    setRegistrationMessage(
      `Successfully registered for ${event.title}!`
    );
  };

  const filteredEvents = useMemo(() => {
    const result = events.filter((event) => {
      const matchesCategory =
        category === "All events" ||
        event.category === category;

      const searchText = (query || "").toLowerCase();

      const matchesSearch = [
        event.title,
        event.category,
        event.place,
        event.host,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(searchText)
      );

      const matchesSaved =
        !showSaved || saved.includes(event.id);

      return (
        matchesCategory &&
        matchesSearch &&
        matchesSaved
      );
    });

    return [...result].sort((a, b) => {
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      }

      return 0;
    });
  }, [query, category, showSaved, saved, sortBy]);

  return (
    <section className="events-section" id="events">
      <div className="section-heading">
        <div>
          <p className="eyebrow">CAMPUS HAPPENINGS</p>

          <h2>
            {showSaved
              ? "Your saved events."
              : "Find your next thing."}
          </h2>

          <p>
            Discover events, meet people, and make campus life count.
          </p>
        </div>

        <button
          className={`saved-filter ${
            showSaved ? "selected" : ""
          }`}
          onClick={() => setShowSaved(!showSaved)}
        >
          <Bookmark size={16} />
          {showSaved ? "Show all events" : "Saved events"}
        </button>
      </div>

      <div className="events-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search events, places, hosts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="filter-row">
        <div className="category-tabs">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-tab ${
                category === item ? "active" : ""
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div
          className="filter-button"
          style={{ position: "relative" }}
        >
          <button
            type="button"
            onClick={() => setSortOpen((open) => !open)}
            aria-expanded={sortOpen}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: 0,
              border: 0,
              background: "transparent",
              color: "inherit",
              font: "inherit",
              cursor: "pointer",
            }}
          >
            <SlidersHorizontal size={16} />
            Sort by
          </button>

          {sortOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                zIndex: 10,
                minWidth: "170px",
                padding: "6px",
                background: "var(--surface)",
                color: "var(--text)",
                border: "1px solid var(--line)",
                borderRadius: "10px",
                boxShadow: "0 8px 24px #0002",
              }}
            >
              {[
                ["default", "Default order"],
                ["name", "Name: A–Z"],
                ["category", "Category"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setSortBy(value);
                    setSortOpen(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    textAlign: "left",
                    border: 0,
                    borderRadius: "6px",
                    background:
                      sortBy === value
                        ? "var(--bg)"
                        : "transparent",
                    color: "inherit",
                    font: "inherit",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="results-count">
        <strong>{filteredEvents.length}</strong>{" "}
        {filteredEvents.length === 1 ? "event" : "events"} found
        {showSaved && " · Showing saved events only"}
      </div>

      {filteredEvents.length > 0 ? (
        <div className="event-grid">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isSaved={saved.includes(event.id)}
              isRegistered={registered.includes(event.id)}
              onToggleSave={() => toggleSaved(event.id)}
              onOpen={(eventToOpen) => {
                setSelected(eventToOpen);
                setRegistrationMessage("");
              }}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Bookmark size={32} />

          <h3>
            {showSaved
              ? "No saved events yet"
              : "No events found"}
          </h3>

          <p>
            {showSaved
              ? "Save an event you like and it will appear here."
              : "Try another search or choose a different category."}
          </p>

          {showSaved && (
            <button
              className="submit-btn"
              onClick={() => setShowSaved(false)}
            >
              Explore all events
            </button>
          )}
        </div>
      )}

      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="event-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close event details"
            >
              <X size={20} />
            </button>

            <img
              className="modal-image"
              src={`https://images.unsplash.com/${selected.image}?auto=format&fit=crop&w=900&q=80`}
              alt={selected.title}
            />

            <div className="modal-content">
              <p className="eyebrow">{selected.category}</p>
              <h2>{selected.title}</h2>

              <div className="modal-info">
                <span>
                  <CalendarDays size={17} />
                  {selected.date || "Date to be announced"}
                </span>

                <span>
                  <MapPin size={17} />
                  {selected.place || "Location to be announced"}
                </span>
              </div>

              <div className="modal-host">
                <strong>Organized by</strong>
                <p>{selected.host || "Campus Community"}</p>
              </div>

              <p>
                {selected.description ||
                  `Join ${
                    selected.host || "the campus community"
                  } for this ${String(
                    selected.category || "campus"
                  ).toLowerCase()} event.`}
              </p>

              <button
                className={`saved-filter ${
                  saved.includes(selected.id) ? "selected" : ""
                }`}
                onClick={() => toggleSaved(selected.id)}
              >
                <Bookmark size={16} />
                {saved.includes(selected.id)
                  ? "Remove from saved"
                  : "Save event"}
              </button>

              <div style={{ marginTop: "14px" }}>
                <button
                  className="submit-btn"
                  onClick={() => registerEvent(selected)}
                  disabled={registered.includes(selected.id)}
                  style={{
                    border: 0,
                    cursor: registered.includes(selected.id)
                      ? "default"
                      : "pointer",
                    opacity: registered.includes(selected.id)
                      ? 0.75
                      : 1,
                  }}
                >
                  {registered.includes(selected.id)
                    ? "Already Registered"
                    : "Register Now"}
                </button>

                {registrationMessage && (
                  <p
                    role="status"
                    aria-live="polite"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      marginTop: "12px",
                      padding: "12px",
                      border: "1px solid var(--line)",
                      borderRadius: "9px",
                      color: "var(--text)",
                      fontSize: "12px",
                      lineHeight: 1.6,
                    }}
                  >
                    <CheckCircle2
                      size={17}
                      style={{ flexShrink: 0 }}
                    />
                    {registrationMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
