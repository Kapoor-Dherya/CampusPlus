
import { Search, Bookmark, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find your thing",
    description:
      "Explore events by interest, or search for something that sparks your curiosity."
  },
  {
    number: "02",
    icon: Bookmark,
    title: "Save the good ones",
    description:
      "Bookmark events you love. Your saved list stays available on this device."
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Show up & shine",
    description:
      "Meet your people, try something new, and make your campus yours."
  }
];

export default function HowItWorks() {
  return (
    <section className="how-section" id="how-it-works">
      <div className="how-heading">
        <div className="eyebrow">✳ EASY AS ONE, TWO, GO</div>
        <h2>
          Less scrolling.
          <br />
          <span>More living.</span>
        </h2>
        <p>Three little steps to a much bigger campus life.</p>
      </div>

      <div className="how-steps">
        {steps.map(({ number, icon: Icon, title, description }) => (
          <article className="how-step" key={number}>
            <span className="step-number">{number}</span>

            <div className="step-icon">
              <Icon size={21} />
            </div>

            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
