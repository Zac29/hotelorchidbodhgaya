import "./HeroBenefits.css";

const benefits = [
  { icon: "bed", title: "Comfortable Rooms", subtitle: "For a Relaxing Stay" },
  { icon: "dining", title: "Multi-Cuisine Dining", subtitle: "Delicious & Hygienic Food" },
  { icon: "lotus", title: "Prime Location", subtitle: "Near Mahabodhi Temple" },
  { icon: "guest", title: "24/7 Guest Support", subtitle: "Always Here for You" },
] as const;

function BenefitIcon({ name }: { name: (typeof benefits)[number]["icon"] }) {
  if (name === "bed") return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M11 48V23c0-2 1.5-3.5 3.5-3.5H21c2 0 3.5 1.5 3.5 3.5v8M11 39h42v9M11 32h42c3 0 5 2 5 5v11M8 52v4m48-4v4M16 24h5m-5 5h5" />
      <path d="M24.5 31H53" />
    </svg>
  );
  if (name === "dining") return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M15 8v16m-6-16v9c0 4 2 7 6 7s6-3 6-7V8m-6 16v32M43 8c-7 8-9 17-8 27h9v21m0-48v27" />
      <path d="M43 8c7 8 9 17 8 27h-7" />
    </svg>
  );
  if (name === "lotus") return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 11c-8 8-10 17 0 28 10-11 8-20 0-28Z" />
      <path d="M29 38C18 21 10 23 7 27c3 12 11 18 25 18m3-7c11-17 19-15 22-11-3 12-11 18-25 18M19 40c-7-3-13-2-17 1 7 8 16 12 30 12s23-4 30-12c-4-3-10-4-17-1" />
      <path d="M32 39v14" />
    </svg>
  );
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="19" r="10" />
      <path d="M13 54V49c0-8 8-14 19-14s19 6 19 14v5H13Z" />
    </svg>
  );
}

export default function HeroBenefits() {
  return (
    <div className="hero-benefits" aria-label="Hotel features">
      <div className="hero-benefits__inner">
        {benefits.map((benefit) => (
          <div className="hero-benefit" key={benefit.title}>
            <span className="hero-benefit__icon"><BenefitIcon name={benefit.icon} /></span>
            <span className="hero-benefit__copy">
              <strong>{benefit.title}</strong>
              <span>{benefit.subtitle}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
