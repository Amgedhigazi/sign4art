import React, { useState, useEffect, useCallback } from 'react'
import './App.css'

const LOGO = '/images/c0977b_4d6527fd359841ad9744ce1247367f3f~mv2.png'

const PRODUCTS = [
  {
    id: 1,
    name: 'Canon AE-1',
    price: '€250.00',
    images: ['/images/c0977b_2a07218a7fec49c381db4db2b388fb12~mv2.jpg'],
    description: 'The legendary Canon AE-1 — the camera that made SLR photography mainstream. In great working condition with original strap.',
    specs: ['35mm SLR — introduced 1976', 'Shutter: 2s – 1/1000s + B', 'FD lens mount', 'Auto & manual exposure', 'Weight: 590g'],
  },
  {
    id: 2,
    name: 'Canon T50',
    price: '€100.00',
    images: ['/images/c0977b_e61fb9dec2594919a97cb94e440eb6f3~mv2.jpg'],
    description: 'Simple, fully automatic 35mm SLR. Perfect for beginners stepping into analog photography.',
    specs: ['35mm SLR — introduced 1983', 'Fully automatic exposure', 'Shutter: 1s – 1/1000s + B', 'FD lens mount', 'Weight: 440g'],
  },
  {
    id: 3,
    name: 'Praktica Super TL',
    price: '€150.00',
    images: ['/images/c0977b_6ba1814f97bf4e458cc1aa9f686e0c7e~mv2.jpg'],
    description: 'Classic East German 35mm SLR with universal M42 screw mount. Robust and versatile — works with a huge range of lenses.',
    specs: ['35mm SLR — East Germany', 'M42 universal screw mount', 'Shutter: 1s – 1/500s + B', 'Manual exposure', 'Weight: 520g'],
  },
  {
    id: 4,
    name: 'Minolta Dynax 505 Si Super',
    price: '€50.00',
    images: [
      '/images/c0977b_372b888c834a48f8889d07c19b2cf96d~mv2.jpg',
      '/images/c0977b_257866e482274065ba269b4410afa674~mv2.jpg',
    ],
    description: 'Minolta Dynax 505si Super + 35-70mm f3.5-4.5 AF lens included. Superb condition. Manual in Finnish included. Easy to use Minolta AF film SLR, introduced in 1998.',
    specs: [
      'Shutter: 30s – 1/4000s + B',
      'ISO: 25 – 5000',
      '9 exposure modes',
      'Spot metering',
      'Weight: 350g',
      'Includes: 35-70mm f3.5-4.5 AF lens',
    ],
  },
]

const PACKAGES = [
  {
    id: 1,
    name: 'Starter Kit',
    price: 'From €80',
    items: ['35mm film camera (your choice)', '2 rolls of 35mm film', 'Basic operation guide'],
    highlight: false,
  },
  {
    id: 2,
    name: 'Complete Kit',
    price: 'From €180',
    items: ['35mm SLR camera with lens', '5 rolls of 35mm film', 'Camera bag', 'Full operation manual'],
    highlight: true,
  },
  {
    id: 3,
    name: 'Workshop Bundle',
    price: 'From €250',
    items: ['35mm SLR camera with lens', 'Workshop registration (1 session)', '5 rolls of film', 'Personal guidance'],
    highlight: false,
  },
]

const EVENTS = [
  {
    id: 1,
    title: 'Portrait Photography Workshop',
    date: 'Saturday, August 13',
    location: 'Bochum',
    type: 'In-Person',
    img: '/images/c0977b_b21d9d1964c446d8a404f7f2d63ba30e~mv2.jpg',
  },
  {
    id: 2,
    title: 'Portrait Photography Lighting Workshop',
    date: 'Saturday, September 3',
    location: 'Sign2art Studio',
    type: 'In-Person',
    img: '/images/c0977b_b920f679359b4eb9938296fc354a1956~mv2.jpg',
  },
  {
    id: 3,
    title: 'FoodBorno',
    date: 'Monday, November 14',
    location: 'Online',
    type: 'Zoom',
    img: '/images/c0977b_e0cf047cffd84e82a3b48dc6176841a0~mv2.jpg',
  },
]

// TODO: Replace VIDEO_IDS with your actual YouTube video IDs
const VIDEOS = [
  { id: 1, title: 'Shooot Eince', youtubeId: 'YOUR_VIDEO_ID_1', duration: '0:31' },
  { id: 2, title: 'Workshop Highlights', youtubeId: 'YOUR_VIDEO_ID_2', duration: '' },
]

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Shop', id: 'shop' },
  { label: 'Events & Programs', id: 'events' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [modal, setModal] = useState(null)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openModal = useCallback((product) => {
    setModal(product)
    setActiveImg(0)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setModal(null)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeModal])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__logo" onClick={() => scrollTo('home')}>
          <img src={LOGO} alt="Sign4Art Store" className="nav__logo-img" />
        </div>
        <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          {NAV_LINKS.map(l => (
            <li key={l.id}><button onClick={() => scrollTo(l.id)}>{l.label}</button></li>
          ))}
        </ul>
        <button className="nav__burger" aria-label="Menu" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero__bg">
          <img src="/images/c0977b_646669c827c348ce9c76e20f76ebe266~mv2.jpg" alt="" />
        </div>
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1 className="hero__title">TAKE YOUR GEAR OUT!!</h1>
          <p className="hero__sub">Don't miss your shot</p>
          <div className="hero__ctas">
            <button className="btn btn--gold" onClick={() => scrollTo('shop')}>Shop Now</button>
            <button className="btn btn--outline" onClick={() => scrollTo('events')}>Upcoming Events</button>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="section">
        <div className="section__inner">
          <div className="section__head">
            <h2 className="section__title">Shop</h2>
            <p className="section__desc">Curated analog cameras in working condition. Click any camera to see full details.</p>
          </div>
          <div className="grid grid--4">
            {PRODUCTS.map(p => (
              <article key={p.id} className="card" onClick={() => openModal(p)}>
                <div className="card__img-wrap">
                  <img src={p.images[0]} alt={p.name} className="card__img" loading="lazy" />
                  <div className="card__hover-overlay">
                    <span>View Details</span>
                  </div>
                </div>
                <div className="card__body">
                  <h3 className="card__name">{p.name}</h3>
                  <div className="card__footer">
                    <span className="card__price">{p.price}</span>
                    <span className="btn btn--sm btn--gold">View</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="section section--alt">
        <div className="section__inner">
          <div className="section__head">
            <h2 className="section__title">Packages</h2>
            <p className="section__desc">Ready-to-shoot bundles — everything you need in one box.</p>
          </div>
          <div className="grid grid--3">
            {PACKAGES.map(pkg => (
              <div key={pkg.id} className={`pkg-card ${pkg.highlight ? 'pkg-card--highlight' : ''}`}>
                {pkg.highlight && <div className="pkg-card__badge">Most Popular</div>}
                <h3 className="pkg-card__name">{pkg.name}</h3>
                <p className="pkg-card__price">{pkg.price}</p>
                <ul className="pkg-card__list">
                  {pkg.items.map(item => (
                    <li key={item}><span className="pkg-card__check">✓</span>{item}</li>
                  ))}
                </ul>
                <a
                  href={`mailto:sign2art@gmail.com?subject=Package Inquiry: ${pkg.name}`}
                  className={`btn ${pkg.highlight ? 'btn--gold' : 'btn--outline'}`}
                >Inquire</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="section">
        <div className="section__inner">
          <div className="section__head">
            <h2 className="section__title">Events & Programs</h2>
            <p className="section__desc">Hands-on workshops and community events in Bochum and online.</p>
          </div>
          <div className="grid grid--3">
            {EVENTS.map(e => (
              <article key={e.id} className="event-card">
                <div className="event-card__img-wrap">
                  <img src={e.img} alt={e.title} className="event-card__img" loading="lazy" />
                  <span className="event-card__badge">{e.type}</span>
                </div>
                <div className="event-card__body">
                  <h3 className="event-card__title">{e.title}</h3>
                  <p className="event-card__date">{e.date}</p>
                  <p className="event-card__loc">📍 {e.location}</p>
                </div>
                <div className="event-card__footer">
                  <a
                    href={`mailto:sign2art@gmail.com?subject=Event Registration: ${e.title}`}
                    className="btn btn--gold btn--sm"
                  >Register</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" className="section section--alt">
        <div className="section__inner">
          <div className="section__head">
            <h2 className="section__title">Videos</h2>
            <p className="section__desc">Watch our workshops and studio sessions.</p>
          </div>
          <div className="grid grid--2">
            {VIDEOS.map(v => (
              <div key={v.id} className="video-card">
                {v.youtubeId && v.youtubeId !== 'YOUR_VIDEO_ID_1' && v.youtubeId !== 'YOUR_VIDEO_ID_2' ? (
                  <iframe
                    className="video-card__frame"
                    src={`https://www.youtube.com/embed/${v.youtubeId}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="video-card__placeholder">
                    <span className="video-card__play">▶</span>
                    <p>{v.title}</p>
                    <small>YouTube ID needed</small>
                  </div>
                )}
                <p className="video-card__title">{v.title}{v.duration && <span className="video-card__dur"> · {v.duration}</span>}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="section__inner section__inner--about">
          <div className="about__img-wrap">
            <img src="/images/c0977b_275be55078eb4af58f0205b1852cb6b7~mv2.jpg" alt="Sign4Art Studio" />
          </div>
          <div className="about__text">
            <h2 className="section__title">About Sign4Art Store</h2>
            <p>Sign4Art is an analog photography studio and store based in Bochum, Germany. We believe in the patience, intention and craft that film photography demands.</p>
            <p>Whether you're picking up your first 35mm camera or deepening your darkroom practice, we're here to supply, teach and inspire.</p>
            <p>We run regular workshops and events — from portrait lighting sessions at our Bochum studio to online community events open to everyone.</p>
            <a href="mailto:sign2art@gmail.com" className="btn btn--gold" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>Get in Touch</a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section section--alt">
        <div className="section__inner">
          <div className="section__head">
            <h2 className="section__title">Contact</h2>
          </div>
          <div className="contact__grid">
            <div className="contact__info">
              <div className="contact__item">
                <span className="contact__icon">📍</span>
                <div>
                  <strong>Studio Address</strong>
                  <p>Steinring 18<br />44789 Bochum, Germany</p>
                </div>
              </div>
              <div className="contact__item">
                <span className="contact__icon">✉️</span>
                <div>
                  <strong>Email</strong>
                  <p><a href="mailto:sign2art@gmail.com">sign2art@gmail.com</a></p>
                </div>
              </div>
              <div className="contact__item">
                <span className="contact__icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <p><a href="tel:+4917624172640">0176 24172640</a></p>
                </div>
              </div>
              <div className="contact__socials">
                <a href="https://www.instagram.com/amgedhigazi" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.facebook.com/amgad.higazi.10" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.youtube.com/channel/UCP6GLs7nYFlmAz1juZlUNpA" target="_blank" rel="noreferrer" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                </a>
              </div>
            </div>
            <form
              className="contact__form"
              onSubmit={e => {
                e.preventDefault()
                const msg = encodeURIComponent(e.target.message.value)
                window.location.href = `mailto:sign2art@gmail.com?subject=Message from Sign4Art site&body=${msg}`
              }}
            >
              <input name="name" className="form__input" placeholder="Your name" required />
              <input name="email" type="email" className="form__input" placeholder="Your email" required />
              <textarea name="message" className="form__input form__textarea" placeholder="Your message" rows="5" required />
              <button type="submit" className="btn btn--gold">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__inner">
          <img src={LOGO} alt="Sign4Art Store" className="footer__logo" />
          <p className="footer__copy">© {new Date().getFullYear()} Sign4Art Store, Bochum. All rights reserved.</p>
          <div className="footer__socials">
            <a href="https://www.instagram.com/amgedhigazi" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.facebook.com/amgad.higazi.10" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://www.youtube.com/channel/UCP6GLs7nYFlmAz1juZlUNpA" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal__close" onClick={closeModal} aria-label="Close">✕</button>
            <div className="modal__gallery">
              <div className="modal__main-img">
                <img src={modal.images[activeImg]} alt={modal.name} />
              </div>
              {modal.images.length > 1 && (
                <div className="modal__thumbs">
                  {modal.images.map((img, i) => (
                    <button
                      key={i}
                      className={`modal__thumb ${activeImg === i ? 'modal__thumb--active' : ''}`}
                      onClick={() => setActiveImg(i)}
                    >
                      <img src={img} alt={`${modal.name} ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="modal__info">
              <h2 className="modal__name">{modal.name}</h2>
              <p className="modal__price">{modal.price}</p>
              <p className="modal__desc">{modal.description}</p>
              <ul className="modal__specs">
                {modal.specs.map(s => <li key={s}>{s}</li>)}
              </ul>
              <a
                href={`mailto:sign2art@gmail.com?subject=Interested in ${modal.name}&body=Hi, I am interested in buying the ${modal.name} (${modal.price}). Please let me know if it is still available.`}
                className="btn btn--gold"
              >Inquire to Buy</a>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
