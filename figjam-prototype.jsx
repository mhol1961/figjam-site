import { useState, useEffect, useRef } from "react";

const COLORS = {
  cream: "#FDF6EC",
  warmWhite: "#FEFBF4",
  deepBurgundy: "#6B1D2A",
  wine: "#8B2E3B",
  gold: "#C4953A",
  goldLight: "#D4A94C",
  charcoal: "#2C2C2C",
  warmGray: "#6B6560",
  lightGray: "#E8E2DA",
  sage: "#8B9A7B",
  fig: "#4A2040",
};

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;500;600&display=swap');
`;

// Animated section hook
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [threshold]);
  return [ref, isVisible];
}

function AnimatedSection({ children, delay = 0, className = "" }) {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Navigation
function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "Menu", href: "#menu" },
    { label: "Cart Service", href: "#cart" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(253,246,236,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.lightGray}` : "none",
        transition: "all 0.4s ease",
        padding: scrolled ? "12px 0" : "20px 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="#hero" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: COLORS.deepBurgundy,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Playfair Display', serif", color: COLORS.cream,
              fontSize: 18, fontWeight: 600,
            }}>F</div>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22, fontWeight: 600, letterSpacing: 1,
              color: scrolled ? COLORS.deepBurgundy : "#fff",
              transition: "color 0.4s",
            }}>FIG JAM</span>
          </div>
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                textDecoration: "none",
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: 13, fontWeight: 400, letterSpacing: 2,
                textTransform: "uppercase",
                color: scrolled ? COLORS.charcoal : "rgba(255,255,255,0.9)",
                transition: "color 0.3s",
                display: window.innerWidth < 768 ? "none" : "block",
              }}
            >{l.label}</a>
          ))}
          <a
            href="#contact"
            style={{
              display: window.innerWidth < 768 ? "none" : "inline-flex",
              padding: "10px 24px",
              background: COLORS.gold,
              color: "#fff",
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 12, fontWeight: 500, letterSpacing: 2,
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: 2,
              transition: "background 0.3s",
            }}
          >Order Now</a>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${COLORS.deepBurgundy} 0%, ${COLORS.fig} 50%, ${COLORS.charcoal} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative elements */}
      <div style={{
        position: "absolute", top: -100, right: -100,
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.gold}15 0%, transparent 70%)`,
      }} />
      <div style={{
        position: "absolute", bottom: -150, left: -100,
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.wine}30 0%, transparent 70%)`,
      }} />

      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.5,
      }} />

      <div style={{ textAlign: "center", padding: "0 24px", position: "relative", zIndex: 2, maxWidth: 800 }}>
        {/* Decorative line */}
        <div style={{
          width: loaded ? 80 : 0, height: 1, background: COLORS.gold,
          margin: "0 auto 32px", transition: "width 1s ease 0.3s",
        }} />

        <p style={{
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: 13, letterSpacing: 5, textTransform: "uppercase",
          color: COLORS.goldLight, marginBottom: 24,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.4s",
        }}>Sweet & Savory Charcuterie · Sarasota, FL</p>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(42px, 7vw, 82px)", fontWeight: 400,
          color: COLORS.cream, lineHeight: 1.1, margin: "0 0 24px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease 0.6s",
        }}>
          Crafted with<br />
          <em style={{ fontStyle: "italic", color: COLORS.goldLight }}>Passion</em> & Purpose
        </h1>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(18px, 2.5vw, 24px)", color: "rgba(255,255,255,0.7)",
          lineHeight: 1.6, maxWidth: 550, margin: "0 auto 40px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.8s",
        }}>
          From corporate grazing tables to sunset beach picnics — artisanal boards, boxes & cups made fresh for every occasion.
        </p>

        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 1s",
        }}>
          <a href="#menu" style={{
            padding: "14px 36px",
            background: COLORS.gold,
            color: "#fff",
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: 12, fontWeight: 500, letterSpacing: 3,
            textTransform: "uppercase", textDecoration: "none",
            borderRadius: 2, transition: "all 0.3s",
          }}>Explore the Menu</a>
          <a href="tel:9419140007" style={{
            padding: "14px 36px",
            border: `1px solid ${COLORS.goldLight}`,
            color: COLORS.goldLight,
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: 12, fontWeight: 500, letterSpacing: 3,
            textTransform: "uppercase", textDecoration: "none",
            borderRadius: 2, transition: "all 0.3s",
          }}>Call 941-914-0007</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: loaded ? 0.6 : 0, transition: "opacity 1s ease 1.5s",
      }}>
        <span style={{
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: 10, letterSpacing: 3, color: COLORS.cream, textTransform: "uppercase",
        }}>Scroll</span>
        <div style={{
          width: 1, height: 40, background: `linear-gradient(to bottom, ${COLORS.cream}, transparent)`,
          animation: "pulse 2s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section style={{
      padding: "100px 24px",
      background: COLORS.cream,
      position: "relative",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" }}>
        <AnimatedSection style={{ flex: "1 1 400px" }}>
          <div style={{
            position: "relative",
            aspectRatio: "3/4",
            maxWidth: 420,
            background: COLORS.lightGray,
            borderRadius: 4,
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(135deg, ${COLORS.deepBurgundy}30, ${COLORS.gold}20)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 72, color: COLORS.deepBurgundy, opacity: 0.2,
              }}>FJ</span>
            </div>
            {/* Gold corner accent */}
            <div style={{
              position: "absolute", top: -2, left: -2,
              width: 60, height: 60,
              borderTop: `3px solid ${COLORS.gold}`,
              borderLeft: `3px solid ${COLORS.gold}`,
            }} />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} style={{ flex: "1 1 400px" }}>
          <p style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: 12, letterSpacing: 4, textTransform: "uppercase",
            color: COLORS.gold, marginBottom: 16,
          }}>Our Story</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400,
            color: COLORS.deepBurgundy, lineHeight: 1.2, marginBottom: 24,
          }}>
            Born from a Love of<br /><em>Fresh Flavors</em>
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 19, lineHeight: 1.8, color: COLORS.warmGray, marginBottom: 20,
          }}>
            After years in the corporate world filled with the same catered lunches, we decided it was time for a twist. Fig Jam Charcuterie was born from a passion for something fresh and exciting.
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 19, lineHeight: 1.8, color: COLORS.warmGray, marginBottom: 32,
          }}>
            We value freshness, quality, and presentation — treating every customer the way we'd want to be treated. Serving Sarasota, Siesta Key, and surrounding areas.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 1, background: COLORS.gold }} />
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 16, fontStyle: "italic", color: COLORS.deepBurgundy,
            }}>Elizabeth Kent, Owner</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Menu Section
function Menu() {
  const [activeCategory, setActiveCategory] = useState("boards");

  const boards = [
    { name: "Charcuterie Cups", price: "$12 each", serves: "Min. 10 cups", desc: "Perfect for business meeting snacks and party favors", color: COLORS.sage },
    { name: "Small Board", price: "$50", serves: "Feeds 2–3", desc: "Ideal for romantic beach picnics and date nights", color: COLORS.wine },
    { name: "Medium Board", price: "$125", serves: "Feeds 6–8", desc: "Great for girl's night, game day, or small gatherings", color: COLORS.gold },
    { name: "Large Board", price: "$175", serves: "Feeds 8–10", desc: "Perfect for parties, showers, and celebrations", color: COLORS.deepBurgundy },
  ];

  const categories = [
    { key: "cheese", label: "Cheese", items: "Brie · Bleu Cheese · Goat Cheese · Cheddar · Parmigiano Reggiano · Havarti · Gouda · Pepper Jack" },
    { key: "meat", label: "Charcuterie", items: "Prosciutto · Chorizo · Mortadella · Genoa Salami · Pepperoni · Soppressata" },
    { key: "fruit", label: "Fruits", items: "Mission Figs · Strawberries · Seedless Grapes · Medjool Dates · Dried Fruit · Seasonal selections" },
    { key: "extras", label: "Extras", items: "Chocolate Pretzels · Macarons · Candied Pecans · Pistachios · Sea Salt Chocolates · Pickles & Olives" },
    { key: "spreads", label: "Spreads", items: "Honey · Fig Jam · Strawberry · Marmalade · Apple Butter · Hot Mustard · Spicy & Sweet" },
  ];

  return (
    <section id="menu" style={{
      padding: "100px 24px",
      background: COLORS.warmWhite,
      position: "relative",
    }}>
      {/* Subtle pattern overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `repeating-linear-gradient(45deg, ${COLORS.charcoal} 0, ${COLORS.charcoal} 1px, transparent 0, transparent 50%)`,
        backgroundSize: "20px 20px",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 12, letterSpacing: 4, textTransform: "uppercase",
              color: COLORS.gold, marginBottom: 16,
            }}>Tasteful Options</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400,
              color: COLORS.deepBurgundy, marginBottom: 12,
            }}>Our <em>Menu</em></h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18, color: COLORS.warmGray,
            }}>Fresh, made to order — free delivery in the Sarasota area</p>
          </div>
        </AnimatedSection>

        {/* Board sizes */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 80 }}>
          {boards.map((b, i) => (
            <AnimatedSection key={b.name} delay={i * 0.1}>
              <div style={{
                background: "#fff",
                borderRadius: 4,
                padding: 32,
                border: `1px solid ${COLORS.lightGray}`,
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: b.color,
                }} />
                <p style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
                  color: COLORS.warmGray, marginBottom: 8,
                }}>{b.serves}</p>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22, fontWeight: 500, color: COLORS.charcoal, marginBottom: 8,
                }}>{b.name}</h3>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28, fontWeight: 600, color: b.color, marginBottom: 12,
                }}>{b.price}</p>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 16, lineHeight: 1.6, color: COLORS.warmGray,
                }}>{b.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Customize section */}
        <AnimatedSection>
          <div style={{
            background: COLORS.deepBurgundy,
            borderRadius: 4,
            padding: "48px 40px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, right: 0, width: 300, height: 300,
              background: `radial-gradient(circle, ${COLORS.gold}15, transparent)`,
            }} />
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28, fontWeight: 400, color: COLORS.cream,
              marginBottom: 8, position: "relative",
            }}>Customize Your <em>Experience</em></h3>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 17, color: "rgba(255,255,255,0.6)", marginBottom: 32,
              position: "relative",
            }}>Select from our curated ingredients to build your perfect board</p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24, position: "relative" }}>
              {categories.map(c => (
                <button
                  key={c.key}
                  onClick={() => setActiveCategory(c.key)}
                  style={{
                    padding: "8px 20px",
                    background: activeCategory === c.key ? COLORS.gold : "transparent",
                    color: activeCategory === c.key ? "#fff" : "rgba(255,255,255,0.6)",
                    border: `1px solid ${activeCategory === c.key ? COLORS.gold : "rgba(255,255,255,0.2)"}`,
                    borderRadius: 2,
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >{c.label}</button>
              ))}
            </div>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18, lineHeight: 2, color: "rgba(255,255,255,0.8)",
              position: "relative",
              transition: "opacity 0.3s",
            }}>
              {categories.find(c => c.key === activeCategory)?.items}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <p style={{
            textAlign: "center", marginTop: 32,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16, fontStyle: "italic", color: COLORS.warmGray,
          }}>
            Pricing may vary by menu selection · Vegan, Gluten Free & Dairy Free options available
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Cart Service Section
function CartService() {
  const features = [
    { icon: "🛒", title: "Full Service Cart", desc: "Elegant setup with umbrella and custom display" },
    { icon: "📋", title: "Custom Menu", desc: "Curated or customizable food options for your event" },
    { icon: "👨‍🍳", title: "Dedicated Server", desc: "Professional service throughout your event" },
    { icon: "🎨", title: "Custom Signage", desc: "Branded signage available for your occasion" },
  ];

  return (
    <section id="cart" style={{
      padding: "100px 24px",
      background: `linear-gradient(175deg, ${COLORS.charcoal} 0%, ${COLORS.deepBurgundy} 100%)`,
      position: "relative",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" }}>
          <AnimatedSection style={{ flex: "1 1 450px" }}>
            <p style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 12, letterSpacing: 4, textTransform: "uppercase",
              color: COLORS.goldLight, marginBottom: 16,
            }}>Premium Service</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400,
              color: COLORS.cream, lineHeight: 1.2, marginBottom: 24,
            }}>
              Charcuterie Cart<br /><em style={{ color: COLORS.goldLight }}>Experience</em>
            </h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 19, lineHeight: 1.8, color: "rgba(255,255,255,0.7)",
              marginBottom: 32,
            }}>
              Elevate your event with our full-service charcuterie cart. Perfect for weddings, bridal and baby showers, corporate meetings, and special celebrations.
            </p>

            <div style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 4, padding: 28,
              borderLeft: `3px solid ${COLORS.gold}`,
              marginBottom: 32,
            }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20, color: COLORS.cream, marginBottom: 8,
              }}>Starting at <span style={{ color: COLORS.goldLight, fontSize: 28, fontWeight: 600 }}>$300</span></p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 16, color: "rgba(255,255,255,0.6)",
              }}>
                Base for 2 hours · $15–25 per guest · Minimum 15 guests · Additional time available
              </p>
            </div>

            <a href="#contact" style={{
              display: "inline-block",
              padding: "14px 36px",
              background: COLORS.gold,
              color: "#fff",
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 12, fontWeight: 500, letterSpacing: 3,
              textTransform: "uppercase", textDecoration: "none",
              borderRadius: 2,
            }}>Book a Free Consultation</a>
          </AnimatedSection>

          <AnimatedSection delay={0.2} style={{ flex: "1 1 400px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {features.map((f, i) => (
                <div key={f.title} style={{
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 4, padding: 24,
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "background 0.3s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                >
                  <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{f.icon}</span>
                  <h4 style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 13, fontWeight: 500, letterSpacing: 1,
                    color: COLORS.cream, marginBottom: 6,
                  }}>{f.title}</h4>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.5,
                  }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Gallery placeholder
function Gallery() {
  const items = Array.from({ length: 6 }, (_, i) => ({
    label: ["Beach Picnic", "Corporate Event", "Bridal Shower", "Date Night", "Game Day", "Holiday Party"][i],
    color: [COLORS.sage, COLORS.wine, COLORS.goldLight, COLORS.fig, COLORS.deepBurgundy, COLORS.gold][i],
  }));

  return (
    <section id="gallery" style={{
      padding: "100px 24px",
      background: COLORS.cream,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 12, letterSpacing: 4, textTransform: "uppercase",
              color: COLORS.gold, marginBottom: 16,
            }}>Our Work</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400,
              color: COLORS.deepBurgundy,
            }}>The <em>Gallery</em></h2>
          </div>
        </AnimatedSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 250px)",
          gap: 16,
        }}>
          {items.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div style={{
                height: "100%",
                background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
                borderRadius: 4,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.4s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(to top, rgba(0,0,0,0.4), transparent)`,
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "0"}
                />
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 48, color: item.color, opacity: 0.3,
                }}>FJ</span>
                <span style={{
                  position: "absolute", bottom: 20, left: 20,
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                  color: COLORS.charcoal, opacity: 0.7,
                }}>{item.label}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <p style={{
            textAlign: "center", marginTop: 32,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16, fontStyle: "italic", color: COLORS.warmGray,
          }}>
            Placeholder images — real product photography would go here
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Testimonials
function Testimonials() {
  const reviews = [
    {
      name: "Kim T.",
      text: "I cannot recommend Fig Jam Charcuterie enough. Liz delivered the most beautiful, perfect board that felt fancy and was just what we needed. She even threw in a bottle of wine to make it more special.",
    },
    {
      name: "Hannah",
      text: "It was perfect. He was so impressed, as was I. Delicious and filling. You're amazing — keep up the great work!",
    },
    {
      name: "Jared",
      text: "We watched the sunset in Siesta Key with a Fig Jam Beach Picnic. My girlfriend surprised me — it was so good and fresh!",
    },
  ];

  return (
    <section id="testimonials" style={{
      padding: "100px 24px",
      background: COLORS.warmWhite,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 12, letterSpacing: 4, textTransform: "uppercase",
              color: COLORS.gold, marginBottom: 16,
            }}>What They Say</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400,
              color: COLORS.deepBurgundy,
            }}>Kind <em>Words</em></h2>
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {reviews.map((r, i) => (
            <AnimatedSection key={r.name} delay={i * 0.15}>
              <div style={{
                background: "#fff",
                borderRadius: 4,
                padding: 36,
                border: `1px solid ${COLORS.lightGray}`,
                height: "100%",
                display: "flex", flexDirection: "column",
              }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 64, lineHeight: 0.8, color: COLORS.gold, opacity: 0.3,
                  display: "block", marginBottom: 16,
                }}>"</span>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 18, lineHeight: 1.8, color: COLORS.charcoal,
                  flex: 1,
                }}>{r.text}</p>
                <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: COLORS.deepBurgundy,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 14, color: COLORS.cream,
                  }}>{r.name[0]}</div>
                  <span style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: 13, fontWeight: 500, letterSpacing: 1,
                    color: COLORS.charcoal,
                  }}>{r.name}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact / CTA
function Contact() {
  return (
    <section id="contact" style={{
      padding: "100px 24px",
      background: COLORS.deepBurgundy,
      position: "relative",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.05,
        backgroundImage: `radial-gradient(circle at 2px 2px, ${COLORS.cream} 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />

      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <AnimatedSection>
          <p style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: 12, letterSpacing: 4, textTransform: "uppercase",
            color: COLORS.goldLight, marginBottom: 16,
          }}>Get in Touch</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400,
            color: COLORS.cream, marginBottom: 24,
          }}>Ready to <em>Order?</em></h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 19, lineHeight: 1.8, color: "rgba(255,255,255,0.7)",
            marginBottom: 40,
          }}>
            Call us to discuss your event, customize your board, or book our full-service cart. Free delivery in the Sarasota area!
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <a href="tel:9419140007" style={{
            display: "inline-block",
            padding: "18px 48px",
            background: COLORS.gold,
            color: "#fff",
            fontFamily: "'Playfair Display', serif",
            fontSize: 24, fontWeight: 500,
            textDecoration: "none",
            borderRadius: 2,
            marginBottom: 32,
            transition: "transform 0.3s",
          }}>941-914-0007</a>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div style={{
            display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap",
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}>
            <div>
              <p style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)", marginBottom: 4,
              }}>Service Area</p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17, color: COLORS.cream,
              }}>Sarasota · Siesta Key · Surrounding Areas</p>
            </div>
            <div>
              <p style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)", marginBottom: 4,
              }}>Delivery</p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17, color: COLORS.cream,
              }}>Free · Fresh · Made to Order</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer style={{
      padding: "40px 24px",
      background: COLORS.charcoal,
      textAlign: "center",
    }}>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 18, color: COLORS.cream, marginBottom: 8,
      }}>Fig Jam Charcuterie LLC</p>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 14, color: "rgba(255,255,255,0.4)",
      }}>Sweet & Savory · Sarasota, Florida</p>
    </footer>
  );
}

// Main App
export default function FigJamSite() {
  return (
    <>
      <style>{fonts}</style>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.cream}; }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        ::selection {
          background: ${COLORS.gold};
          color: white;
        }
      `}</style>
      <Nav />
      <Hero />
      <About />
      <Menu />
      <CartService />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
