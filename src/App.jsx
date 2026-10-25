
import { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import EventsSection from "./components/EventsSection";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  return (
    <div className={dark ? "app dark" : "app light"}>
      <NavBar
        dark={dark}
        setDark={setDark}
        showSaved={showSaved}
        setShowSaved={setShowSaved}
      />

      <main>
        <Hero query={query} setQuery={setQuery} />

        <ErrorBoundary>
          <EventsSection
            query={query}
            setQuery={setQuery}
            showSaved={showSaved}
            setShowSaved={setShowSaved}
          />
        </ErrorBoundary>

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}

export default App;
