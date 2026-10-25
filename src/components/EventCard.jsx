
import {
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  MapPin,
} from "lucide-react";

export default function EventCard({
  event,
  isSaved,
  onToggleSave,
  onOpen,
  isRegistered = false,
}) {
  const imageUrl = event.image
    ? `https://images.unsplash.com/${event.image}?auto=format&fit=crop&w=700&q=80`
    : "";

  return (
    <article className="event-card">
      <button
        className={`bookmark-button ${
          isSaved ? "is-saved" : ""
        }`}
        onClick={onToggleSave}
        aria-label={
          isSaved ? "Remove saved event" : "Save event"
        }
        aria-pressed={isSaved}
        type="button"
      >
        <Bookmark
          size={16}
          fill={isSaved ? "currentColor" : "none"}
        />
      </button>

      <button
        className="card-image-button"
        onClick={() => onOpen(event)}
        type="button"
        aria-label={`View details for ${event.title}`}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={event.title}
            loading="lazy"
          />
        )}

        <span className="event-tag">
          {event.category || "CAMPUS EVENT"}
        </span>

        <ArrowUpRight className="image-arrow" size={18} />
      </button>

      <div className="card-body">
        <div className="card-meta">
          <span className="category-label">
            {event.category}
          </span>

          <span className="meta-date">
            <CalendarDays size={12} />
            {event.date || "Date TBA"}
          </span>
        </div>

        <button
          className="event-title"
          onClick={() => onOpen(event)}
          type="button"
        >
          <span>{event.title}</span>
          <ArrowUpRight size={16} />
        </button>

        <div className="card-location">
          <MapPin size={13} />
          <span>{event.place || "Location TBA"}</span>
        </div>

        <div className="card-footer">
          <span className="host-avatar">
            {String(event.host || "Campus")
              .split(/\s+/)
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </span>

          <span className="host-name">
            {event.host || "Campus Community"}
          </span>

          {isRegistered ? (
            <span
              style={{
                marginLeft: "auto",
                color: "var(--accent)",
                fontSize: "9px",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              REGISTERED
            </span>
          ) : (
            <button
              className="details-link"
              onClick={() => onOpen(event)}
              type="button"
            >
              Details <ArrowUpRight size={12} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
