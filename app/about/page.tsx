import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin, PersonStanding, UtensilsCrossed } from "lucide-react";

const highlights = [
  { icon: MapPin, title: "Close to the sacred sites", copy: "A convenient base for discovering Mahabodhi Temple and Bodh Gaya." },
  { icon: PersonStanding, title: "Comfort with care", copy: "Thoughtful rooms and the everyday details that help you settle in." },
  { icon: UtensilsCrossed, title: "A warm welcome", copy: "Attentive hospitality for pilgrims, families and curious travellers." },
  { icon: Clock3, title: "Here when you need us", copy: "Our guest team is ready to help make your visit feel easy." },
];

export default function AboutPage() {
  return (
    <main className="story-page about-page">
      <section className="story-hero">
        <Image src="/lobby2.png" alt="A welcoming interior at Hotel Orchid Bodhgaya" fill priority sizes="100vw" className="story-hero-image" />
        <div className="story-hero-shade" />
        <div className="story-hero-content">
          <span className="story-eyebrow"><i /> THE HOTEL ORCHID STORY</span>
          <h1>A peaceful place<br />to <em>feel at home.</em></h1>
          <p>Thoughtful comfort and a heartfelt welcome in the spiritual heart of Bodh Gaya.</p>
          <Link className="story-button" href="/rooms">Discover your stay <ArrowRight size={16} /></Link>
        </div>
        <div className="story-hero-caption"><span>HOTEL ORCHID</span><i /> BODHGAYA, INDIA</div>
      </section>

      <section className="about-intro story-container">
        <div className="about-intro-label"><span>01</span><i /> OUR APPROACH</div>
        <div className="about-intro-copy">
          <h2>Rooted in the spirit<br />of <em>Bodh Gaya.</em></h2>
          <p className="about-lead">Some journeys call for a little more stillness. Hotel Orchid is a welcoming place to pause, recharge and experience this remarkable destination at your own pace.</p>
          <p>We bring together modern comforts and the warmth of attentive hospitality, with convenient access to the temples and landmarks that make Bodh Gaya so special. Whether you are here on pilgrimage, travelling with family or exploring Bihar, we want every part of your stay to feel considered.</p>
          <Link className="story-text-link" href="/contact">We’d love to welcome you <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="about-visual-band">
        <div className="story-container about-visual-grid">
          <div className="about-visual-copy"><span className="story-eyebrow">A STAY THAT FEELS RIGHT</span><h2>Space to rest.<br /><em>Room to explore.</em></h2><p>Start the day refreshed, spend it discovering the sacred sites nearby, then return to a calm and comfortable room.</p></div>
          <div className="about-photo-main"><Image src="/reception.png" alt="Hotel Orchid reception ready to welcome guests" fill sizes="(max-width: 760px) 100vw, 55vw" /></div>
          <div className="about-photo-small"><Image src="/dblbed2.png" alt="Comfortable guest room at Hotel Orchid" fill sizes="(max-width: 760px) 70vw, 25vw" /></div>
          <div className="about-photo-note"><span>YOUR BODH GAYA RETREAT</span><b>Warmth in every detail.</b></div>
        </div>
      </section>

      <section className="about-highlights story-container">
        <div className="about-highlights-head"><span className="story-eyebrow">THE ORCHID EXPERIENCE</span><h2>Little things that make<br /><em>a meaningful stay.</em></h2></div>
        <div className="about-highlight-grid">{highlights.map(({ icon: Icon, title, copy }, i) => <article className="about-highlight" key={title}><span className="about-highlight-number">0{i + 1}</span><Icon size={23} strokeWidth={1.5} /><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="story-cta"><span className="story-eyebrow">YOUR BODH GAYA STORY STARTS HERE</span><h2>We look forward to<br /><em>welcoming you.</em></h2><Link className="story-button" href="/contact">Plan your visit <ArrowRight size={16} /></Link></section>
    </main>
  );
}
