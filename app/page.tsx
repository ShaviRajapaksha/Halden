
import ScrollSequence from "@/components/ScrollSequence";

export default function Home() {
  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        <a className="nav-brand" href="#top" aria-label="Halden home">
          <span className="nav-mark">H</span>
          <strong>Halden</strong>
        </a>

        <span className="nav-center">Objects of better sound</span>

        <a className="nav-link" href="#product">
          Explore H1 <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <main id="top">
        <ScrollSequence />

        <section className="editorial" aria-labelledby="manifesto-heading">
          <div className="editorial-top">
            <span>Beyond the ordinary</span>
            <span>Designed with intention / 001</span>
          </div>

          <h2 id="manifesto-heading">
            Less noise.
            <br />
            More <em>meaning.</em>
          </h2>

          <div className="editorial-bottom">
            <p>
              Great sound isn't about adding more. It's about
              understanding what matters, removing distractions,
              and giving every detail the space it deserves.
              That's the thinking behind Halden H1.
            </p>
          </div>
        </section>

        <section
          className="specifications"
          id="product"
          aria-labelledby="spec-heading"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow">Considered from every angle</div>

              <h2 id="spec-heading">
                Details make
                <br />
                the <em>difference.</em>
              </h2>
            </div>

            <p>
              A design philosophy built around acoustic performance,
              lasting comfort, and an uncompromising attention to detail.
            </p>
          </div>

          <div className="spec-grid">
            <article className="spec-card">
              <span className="spec-number">01 / SOUND</span>
              <h3>Precision audio</h3>
              <p>
                A carefully considered driver design, tuned to bring
                clarity and definition to your listening experience.
              </p>
            </article>

            <article className="spec-card">
              <span className="spec-number">02 / COMFORT</span>
              <h3>Made for longer listens</h3>
              <p>
                Cushioned contact points and a considered fit designed
                around everyday listening.
              </p>
            </article>

            <article className="spec-card">
              <span className="spec-number">03 / MATERIALS</span>
              <h3>Purposeful materials</h3>
              <p>
                A balance of tactile finishes, structural integrity,
                and restrained visual detail.
              </p>
            </article>

            <article className="spec-card">
              <span className="spec-number">04 / DESIGN</span>
              <h3>Nothing excessive</h3>
              <p>
                Clean lines, deliberate proportions, and a silhouette
                that feels considered from every angle.
              </p>
            </article>

            <article className="spec-card">
              <span className="spec-number">05 / EXPERIENCE</span>
              <h3>Intuitive by nature</h3>
              <p>
                A listening experience focused on the music rather
                than the technology surrounding it.
              </p>
            </article>

            <article className="spec-card">
              <span className="spec-number">06 / PHILOSOPHY</span>
              <h3>Built around purpose</h3>
              <p>
                Every design decision starts with a simple question:
                does it make the experience better?
              </p>
            </article>
          </div>
        </section>

        <section className="closing" aria-labelledby="closing-heading">
          <div className="eyebrow">A different way to listen</div>

          <h2 id="closing-heading">
            Find your
            <br />
            <em>frequency.</em>
          </h2>

          <p>
            Discover a more considered approach to sound, form,
            and the everyday moments that matter.
          </p>

          <a className="cta" href="#top">
            Experience Halden H1
            <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="footer-brand" href="#top">
          Halden.
        </a>

        <span>Sound, considered.</span>

        <div className="footer-meta">
          <a href="#experience">The experience</a>
          <a href="#product">The details</a>
          <span>© {new Date().getFullYear()} Halden</span>
        </div>
      </footer>
    </>
  );
}
