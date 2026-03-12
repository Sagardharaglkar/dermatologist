import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react"
// ============================================================
//  🏥 CLINIC CONFIGURATION — Edit this section for each client
// ============================================================
const CLINIC_CONFIG = {
  // ── Doctor & Clinic Identity ──────────────────────────────
  doctorName: "Dr. [Doctor Name]",
  doctorTitle: "MD Dermatology",
  doctorSubtitle: "Skin & Cosmetology Specialist",
  doctorEmoji: "👩‍⚕️",          // or use an <img> tag below
  clinicName: "[Clinic Name] Skincare",
  tagline: '"Healthy Skin Starts Here"',
  clinicRegion: "[City], [District]",
  clinicCity: "[City]",
  clinicDistrict: "[District]",
  serveAreas: "[City 1], [City 2] & surrounding areas",

  // ── Contact & Location ────────────────────────────────────
  phone: "+91 XXXXX XXXXX",
  phoneRaw: "919999999999",       // digits only, for wa.me & tel: links
  email: "clinic@example.com",   // leave "" to hide

  addressLine1: "[Building / Apartment Name]",
  addressLine2: "[Street / Area]",
  addressLine3: "[City]",
  addressLine4: "[District], Maharashtra – [PIN]",

  // Google Maps embed URL — replace with actual embed link
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30668.68505580453!2d73.68!3d16.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0cd69b0b2cc79%3A0x16ee3e0e6c9e32b4!2sKudal%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",

  // ── Hours ─────────────────────────────────────────────────
  openDays: "Tuesday – Thursday",
  openHours: "3:00 PM – 6:00 PM",
  closedDays: "Friday – Monday",

  // ── Stats (shown in hero & about) ────────────────────────
  stats: [
    { number: "500+", label: "Patients" },
    { number: "7+",   label: "Treatments" },
    { number: "5★",   label: "Ratings" },
  ],

  // ── Doctor Qualifications ─────────────────────────────────
  qualifications: [
    {
      title: "MD Dermatology",
      sub: "Medical Degree in Dermatology, Venereology & Leprosy",
    },
    { title: "MBBS", sub: "Bachelor of Medicine and Bachelor of Surgery" },
    {
      title: "Certified Cosmetologist",
      sub: "Advanced training in cosmetic dermatology procedures",
    },
    {
      title: "Member – IADVL",
      sub: "Indian Association of Dermatologists, Venereologists & Leprologists",
    },
  ],

  // ── Doctor Quote ──────────────────────────────────────────
  doctorQuote:
    "Every patient deserves a thorough diagnosis and a treatment plan that fits their lifestyle, skin type, and goals. I believe in evidence-based dermatology delivered with empathy — because healthy skin is not just medical, it deeply impacts your confidence and quality of life.",

  // ── Google Reviews search term ────────────────────────────
  googleSearchTerm: "[Doctor Name] [City]",

  // ── Brand Colors (CSS values) ─────────────────────────────
  // Primary = main green, Accent = hero gradient end
  colorPrimary: "#22c55e",
  colorPrimaryDark: "#16a34a",
  colorHeroText: "#1a3c2e",
  colorHeroSub: "#4a7c5e",
};

// ============================================================
//  🛎️ SERVICES — Customise treatments offered
// ============================================================
const SERVICES = [
  {
    icon: "🌿",
    title: "Acne Treatment",
    desc: "Comprehensive acne management including medical-grade peels, topical therapies, and personalised skincare routines.",
    benefits: ["Reduces active breakouts", "Prevents future acne", "Fades acne scars", "Improves skin texture"],
    color: "from-green-50 to-emerald-50",
  },
  {
    icon: "✨",
    title: "Pigmentation Treatment",
    desc: "Targeted treatment for melasma, dark spots, sun damage, and uneven skin tone using advanced dermatological methods.",
    benefits: ["Even skin tone", "Reduces dark patches", "Brightens complexion", "Long-lasting results"],
    color: "from-amber-50 to-yellow-50",
  },
  {
    icon: "🔬",
    title: "Wart Removal",
    desc: "Safe and effective removal of warts using cryotherapy and laser techniques with minimal discomfort.",
    benefits: ["Quick procedure", "Minimal scarring", "High success rate", "Prevents spread"],
    color: "from-blue-50 to-sky-50",
  },
  {
    icon: "🛡️",
    title: "Skin Allergy Treatment",
    desc: "Accurate allergy testing and tailored treatment plans to manage eczema, urticaria, contact dermatitis, and more.",
    benefits: ["Identifies triggers", "Reduces flare-ups", "Relieves itching", "Strengthens skin barrier"],
    color: "from-rose-50 to-pink-50",
  },
  {
    icon: "⏳",
    title: "Anti-Aging Treatments",
    desc: "Rejuvenating treatments including chemical peels, fillers guidance, and advanced skincare protocols to restore youthful skin.",
    benefits: ["Reduces fine lines", "Improves elasticity", "Hydrates deeply", "Restores radiance"],
    color: "from-purple-50 to-violet-50",
  },
  {
    icon: "💊",
    title: "Skin Infection Treatment",
    desc: "Expert diagnosis and treatment of bacterial, fungal, and viral skin infections using evidence-based protocols.",
    benefits: ["Accurate diagnosis", "Targeted therapy", "Fast recovery", "Prevents recurrence"],
    color: "from-teal-50 to-cyan-50",
  },
  {
    icon: "🩺",
    title: "General Skin Consultation",
    desc: "Complete skin health assessment, mole mapping, rash evaluation, and personalised skincare prescription.",
    benefits: ["Full skin analysis", "Expert advice", "Custom skincare plan", "Preventive care"],
    color: "from-orange-50 to-amber-50",
  },
];

// ============================================================
//  💬 TESTIMONIALS — Replace with real patient reviews
// ============================================================
const TESTIMONIALS = [
  {
    name: "Patient A",
    location: "[City]",
    rating: 5,
    text: "Dr. [Name]'s diagnosis was spot-on. She identified my skin issue immediately and the treatment worked within two weeks. I'm so relieved! Her attention to every detail made me feel completely at ease.",
    treatment: "Acne Treatment",
    initials: "PA",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Patient B",
    location: "[City]",
    rating: 5,
    text: "The staff is incredibly friendly and the treatment prices are very reasonable for the quality of care. The doctor explained everything clearly and made sure I understood my skincare routine.",
    treatment: "Pigmentation Treatment",
    initials: "PB",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Patient C",
    location: "[City]",
    rating: 5,
    text: "I had stubborn warts for years and they were removed in just one session! The results were quick and I barely felt anything. Highly recommend to anyone with skin concerns.",
    treatment: "Wart Removal",
    initials: "PC",
    color: "bg-rose-100 text-rose-700",
  },
  {
    name: "Patient D",
    location: "[City]",
    rating: 5,
    text: "My skin allergies were causing me so much discomfort. After consulting here, I finally got proper relief. The systematic approach and follow-up care is exceptional.",
    treatment: "Skin Allergy Treatment",
    initials: "PD",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Patient E",
    location: "[City]",
    rating: 5,
    text: "The anti-aging treatment has given me such a confidence boost. My skin looks 5 years younger! The expertise and the welcoming clinic environment make every visit a pleasure.",
    treatment: "Anti-Aging Treatment",
    initials: "PE",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Patient F",
    location: "[City]",
    rating: 5,
    text: "Professional, knowledgeable, and genuinely caring. The doctor took time to understand my concerns before recommending treatment. Best dermatologist in the district without a doubt!",
    treatment: "General Consultation",
    initials: "PF",
    color: "bg-teal-100 text-teal-700",
  },
];

// ============================================================
//  📸 GALLERY — Add real before/after case studies here
// ============================================================
const GALLERY_ITEMS = [
  {
    treatment: "Acne Treatment",
    icon: "🌿",
    tag: "Acne",
    color: "from-green-100 to-emerald-100",
    tagColor: "bg-green-100 text-green-700",
    borderColor: "border-green-200",
    iconBg: "bg-green-200",
    cases: [
      { id: "AC1", label: "Teenage Acne — Cheeks", duration: "6 weeks", sessions: "3 sessions", result: "85% clearance", patientAge: "17 yrs", beforeNote: "Active pustular acne", afterNote: "Smooth, clear skin" },
      { id: "AC2", label: "Adult Hormonal Acne — Jawline", duration: "8 weeks", sessions: "4 sessions", result: "90% clearance", patientAge: "28 yrs", beforeNote: "Cystic breakouts", afterNote: "Minimal residual marks" },
      { id: "AC3", label: "Acne Scars — Forehead", duration: "10 weeks", sessions: "5 sessions", result: "70% improvement", patientAge: "22 yrs", beforeNote: "Post-acne scarring", afterNote: "Significantly smoother texture" },
      { id: "AC4", label: "Back Acne — Body", duration: "12 weeks", sessions: "6 sessions", result: "80% clearance", patientAge: "24 yrs", beforeNote: "Widespread breakouts", afterNote: "Clear back skin" },
    ],
  },
  {
    treatment: "Pigmentation Treatment",
    icon: "✨",
    tag: "Pigmentation",
    color: "from-amber-100 to-yellow-100",
    tagColor: "bg-amber-100 text-amber-700",
    borderColor: "border-amber-200",
    iconBg: "bg-amber-200",
    cases: [
      { id: "PG1", label: "Melasma — Cheeks & Forehead", duration: "8 weeks", sessions: "4 sessions", result: "75% lightening", patientAge: "35 yrs", beforeNote: "Dark brown patches", afterNote: "Even, brightened tone" },
      { id: "PG2", label: "Sun Spots — Nose Bridge", duration: "6 weeks", sessions: "3 sessions", result: "90% clearance", patientAge: "42 yrs", beforeNote: "Multiple sun spots", afterNote: "Clear skin" },
      { id: "PG3", label: "Post-Inflammatory Hyperpigmentation", duration: "10 weeks", sessions: "5 sessions", result: "80% improvement", patientAge: "26 yrs", beforeNote: "Dark spots after acne", afterNote: "Uniform skin tone" },
      { id: "PG4", label: "Neck Darkening — Acanthosis", duration: "12 weeks", sessions: "6 sessions", result: "65% lightening", patientAge: "31 yrs", beforeNote: "Thick dark patches", afterNote: "Noticeably lighter" },
    ],
  },
  {
    treatment: "Wart Removal",
    icon: "🔬",
    tag: "Wart Removal",
    color: "from-blue-100 to-sky-100",
    tagColor: "bg-blue-100 text-blue-700",
    borderColor: "border-blue-200",
    iconBg: "bg-blue-200",
    cases: [
      { id: "WR1", label: "Common Wart — Finger", duration: "1 session", sessions: "1 session", result: "Complete removal", patientAge: "19 yrs", beforeNote: "Raised wart, 5mm", afterNote: "Smooth skin, no scar" },
      { id: "WR2", label: "Flat Warts — Face", duration: "2 weeks", sessions: "2 sessions", result: "Complete removal", patientAge: "25 yrs", beforeNote: "Multiple flat warts", afterNote: "Clear facial skin" },
      { id: "WR3", label: "Plantar Wart — Sole", duration: "2 sessions", sessions: "2 sessions", result: "Complete removal", patientAge: "38 yrs", beforeNote: "Deep plantar wart", afterNote: "Pain-free, clear sole" },
      { id: "WR4", label: "Filiform Wart — Neck", duration: "1 session", sessions: "1 session", result: "Complete removal", patientAge: "45 yrs", beforeNote: "Thread-like wart", afterNote: "No trace remaining" },
    ],
  },
  {
    treatment: "Anti-Aging Treatments",
    icon: "⏳",
    tag: "Anti-Aging",
    color: "from-purple-100 to-violet-100",
    tagColor: "bg-purple-100 text-purple-700",
    borderColor: "border-purple-200",
    iconBg: "bg-purple-200",
    cases: [
      { id: "AA1", label: "Fine Lines — Forehead", duration: "6 weeks", sessions: "3 sessions", result: "60% reduction", patientAge: "48 yrs", beforeNote: "Visible forehead lines", afterNote: "Smoother, younger look" },
      { id: "AA2", label: "Under-Eye Wrinkles", duration: "8 weeks", sessions: "4 sessions", result: "55% improvement", patientAge: "52 yrs", beforeNote: "Crow's feet, dark circles", afterNote: "Refreshed eye area" },
      { id: "AA3", label: "Dull Skin — Full Face", duration: "4 weeks", sessions: "2 sessions", result: "Visible glow", patientAge: "44 yrs", beforeNote: "Tired, dull complexion", afterNote: "Radiant, hydrated skin" },
      { id: "AA4", label: "Loose Skin — Jawline", duration: "10 weeks", sessions: "5 sessions", result: "40% firming", patientAge: "56 yrs", beforeNote: "Sagging skin", afterNote: "Firmer jaw contour" },
    ],
  },
];

// ============================================================
//  ❓ FAQs — Customise as needed
// ============================================================
const FAQS = [
  {
    q: "What should I bring to my first appointment?",
    a: "Please bring any previous skin prescriptions, a list of current medications, and photos of your skin concern if available. Arrive with a clean face if your appointment is for facial skin issues.",
  },
  {
    q: "How long does a typical consultation last?",
    a: `A first consultation typically lasts 20–30 minutes. Follow-up appointments are usually 10–15 minutes. We ensure no patient feels rushed.`,
  },
  {
    q: "Are the treatments safe for all skin types?",
    a: `Yes. ${CLINIC_CONFIG.doctorName} specialises in treating all skin types including sensitive and darker Indian skin tones. Every treatment plan is personalised.`,
  },
  {
    q: "Can I book via WhatsApp?",
    a: "Absolutely! WhatsApp is our most convenient booking channel. Simply click the WhatsApp button on this website and send us your name and preferred slot.",
  },
];

// ============================================================
//  NAV
// ============================================================
const NAV_LINKS = ["Home", "About", "Services", "Gallery", "Appointment", "Reviews", "Contact"];

// ============================================================
//  SHARED COMPONENTS
// ============================================================
function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z" />
        </svg>
      ))}
    </div>
  );
}

function WhatsAppBtn({ fixed = false }) {
  const href = `https://wa.me/${CLINIC_CONFIG.phoneRaw}?text=Hello%20${encodeURIComponent(CLINIC_CONFIG.doctorName)}%2C%20I%20would%20like%20to%20book%20an%20appointment.`;
  const base = "flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg transition-all duration-200 active:scale-95";
  const WaIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.428a.5.5 0 00.611.61l5.74-1.504A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.65-.505-5.17-1.387l-.37-.217-3.835 1.005 1.024-3.74-.24-.386A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
    </svg>
  );
  if (fixed) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer"
        className={`${base} fixed bottom-6 right-6 z-50 px-5 py-3 text-sm shadow-2xl hover:scale-105`}
        aria-label="Chat on WhatsApp">
        <WaIcon /> Book via WhatsApp
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} px-6 py-3`}>
      <WaIcon /> WhatsApp Us
    </a>
  );
}

// ============================================================
//  PAGES
// ============================================================

/* ── HOME ── */
function HomePage({ setPage }) {
  const [activeFeature, setActiveFeature] = useState(0);
  const C = CLINIC_CONFIG;
  const features = [
    { icon: "🏥", title: "Expert Dermatologist", desc: "Board-certified specialist with years of clinical experience" },
    { icon: "🔬", title: "Advanced Treatments", desc: "Latest dermatological technology and evidence-based protocols" },
    { icon: "💚", title: "Personalised Care", desc: "Every treatment plan tailored to your unique skin type and concerns" },
    { icon: "📍", title: "Convenient Location", desc: `Easily accessible clinic in the heart of ${C.clinicCity}` },
  ];
  useEffect(() => {
    const t = setInterval(() => setActiveFeature((p) => (p + 1) % features.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #fef9f0 50%, #f0f9ff 100%)" }}>
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #86efac, transparent)" }} />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #fde68a, transparent)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-100 rounded-full px-4 py-2 text-sm font-medium text-green-700 mb-6 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Accepting New Patients · {C.openDays} {C.openHours}
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4"
              style={{ fontFamily: "'Georgia', serif", color: C.colorHeroText }}>
              {C.doctorName}
              <span className="block text-3xl lg:text-4xl font-normal mt-1"
                style={{ color: C.colorHeroSub }}>{C.clinicName}</span>
            </h1>
            <p className="text-2xl font-light text-stone-500 mb-3 tracking-wide italic">{C.tagline}</p>
            <p className="text-base text-stone-600 leading-relaxed mb-8 max-w-lg">
              Expert dermatological care in {C.clinicCity}. Personalised treatments for every skin concern — from acne to anti-aging — delivered with compassion and clinical precision.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button onClick={() => setPage("Appointment")}
                className="px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
                style={{ background: `linear-gradient(135deg, ${C.colorPrimary}, ${C.colorPrimaryDark})` }}>
                📅 Book Appointment
              </button>
              <WhatsAppBtn />
            </div>
            <div className="flex gap-8">
              {C.stats.map(({ number, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold" style={{ color: C.colorPrimaryDark }}>{number}</div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor card */}
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="w-72 h-80 lg:w-80 lg:h-96 rounded-3xl shadow-2xl overflow-hidden"
                style={{ background: "linear-gradient(145deg, #d1fae5, #a7f3d0)" }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="w-32 h-32 rounded-full bg-white/50 flex items-center justify-center text-6xl mb-4 shadow-inner">
                    {C.doctorEmoji}
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900">{C.doctorName}</h3>
                  <p className="text-emerald-700 text-sm">{C.doctorTitle}</p>
                  <p className="text-emerald-600 text-xs mt-1 text-center">{C.clinicRegion}'s Trusted Skin Specialist</p>
                  <div className="mt-4 flex gap-1"><StarRating /></div>
                  <p className="text-xs text-emerald-700 mt-1">5.0 · {C.stats[0].number} reviews</p>
                </div>
              </div>
              <div className="absolute -left-6 top-8 bg-white rounded-2xl shadow-lg px-4 py-3 text-center">
                <div className="text-green-600 text-xl font-bold">{C.stats[1].number}</div>
                <div className="text-xs text-stone-500">Specialised<br />Treatments</div>
              </div>
              <div className="absolute -right-6 bottom-16 bg-white rounded-2xl shadow-lg px-4 py-3 text-center">
                <div className="text-amber-500 text-xl font-bold">⭐ 5.0</div>
                <div className="text-xs text-stone-500">Patient<br />Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">About the Clinic</span>
            <h2 className="text-3xl font-bold mt-2" style={{ fontFamily: "'Georgia', serif", color: C.colorHeroText }}>A Clinic Built on Trust &amp; Expertise</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-stone-600 leading-relaxed mb-4">
                {C.clinicName} is {C.clinicCity}'s premier dermatology clinic, dedicated to providing evidence-based, compassionate skin care to patients across {C.clinicDistrict}. Our clinic blends clinical excellence with a warm, welcoming environment.
              </p>
              <p className="text-stone-600 leading-relaxed mb-6">
                Whether you're dealing with a persistent skin condition or seeking a cosmetic enhancement, {C.doctorName}'s personalised approach ensures you receive the most effective and appropriate treatment for your unique skin.
              </p>
              <button onClick={() => setPage("About")}
                className="inline-flex items-center gap-2 text-green-700 font-semibold hover:gap-3 transition-all">
                Meet {C.doctorName} <span>→</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} onClick={() => setActiveFeature(i)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 ${activeFeature === i ? "shadow-lg scale-105" : "hover:shadow-md"}`}
                  style={{ background: activeFeature === i ? "linear-gradient(135deg, #f0fdf4, #dcfce7)" : "#f9fafb" }}>
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <div className="font-semibold text-stone-800 text-sm">{f.title}</div>
                  <div className="text-xs text-stone-500 mt-1 leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Treatments */}
      <section className="py-16" style={{ background: "#f8fdf8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Our Services</span>
            <h2 className="text-3xl font-bold mt-2" style={{ fontFamily: "'Georgia', serif", color: C.colorHeroText }}>Popular Treatments</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 6).map((s, i) => (
              <div key={i}
                className={`p-6 rounded-2xl bg-gradient-to-br ${s.color} border border-white/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
                onClick={() => setPage("Services")}>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-stone-800 mb-2">{s.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed line-clamp-2">{s.desc}</p>
                <div className="mt-4 text-sm font-semibold" style={{ color: C.colorPrimaryDark }}>Learn more →</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => setPage("Services")}
              className="px-8 py-3 border-2 border-green-600 text-green-700 rounded-full font-semibold hover:bg-green-600 hover:text-white transition-all">
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Patient Reviews</span>
            <h2 className="text-3xl font-bold mt-2" style={{ fontFamily: "'Georgia', serif", color: C.colorHeroText }}>What Our Patients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-stone-50 border border-stone-100 hover:shadow-md transition-all">
                <StarRating />
                <p className="text-stone-600 text-sm leading-relaxed mt-3 mb-4 italic">"{t.text.substring(0, 120)}..."</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${t.color}`}>{t.initials}</div>
                  <div>
                    <div className="font-semibold text-stone-800 text-sm">{t.name}</div>
                    <div className="text-xs text-stone-500">{t.location} · {t.treatment}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => setPage("Reviews")}
              className="inline-flex items-center gap-2 text-green-700 font-semibold hover:gap-3 transition-all">
              See All Reviews →
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #14532d, #166534)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Georgia', serif" }}>Ready for Healthier Skin?</h2>
          <p className="text-green-200 mb-8">Book your consultation today. Appointments available {C.openDays}, {C.openHours}.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setPage("Appointment")}
              className="px-8 py-4 bg-white text-green-800 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              📅 Book Appointment
            </button>
            <WhatsAppBtn />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── ABOUT ── */
function AboutPage({ setPage }) {
  const C = CLINIC_CONFIG;
  return (
    <div className="min-h-screen bg-white">
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Meet Your Doctor</span>
          <h1 className="text-4xl font-bold mt-2" style={{ fontFamily: "'Georgia', serif", color: C.colorHeroText }}>{C.doctorName}</h1>
          <p className="text-stone-500 mt-2">{C.doctorTitle} · {C.doctorSubtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          <div className="sticky top-24">
            <div className="rounded-3xl overflow-hidden shadow-xl" style={{ background: "linear-gradient(145deg, #d1fae5, #a7f3d0)" }}>
              <div className="p-10 text-center">
                <div className="w-40 h-40 rounded-full bg-white/60 mx-auto flex items-center justify-center text-7xl shadow-inner mb-6">{C.doctorEmoji}</div>
                <h2 className="text-2xl font-bold text-emerald-900 mb-1">{C.doctorName}</h2>
                <p className="text-emerald-700 font-medium">{C.doctorTitle}</p>
                <p className="text-emerald-600 text-sm mt-1">{C.clinicRegion}'s Trusted Skin Specialist</p>
                <div className="flex justify-center mt-3"><StarRating /></div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  {C.stats.map(({ number, label }) => (
                    <div key={label} className="bg-white/50 rounded-2xl p-3">
                      <div className="text-xl font-bold text-emerald-800">{number}</div>
                      <div className="text-xs text-emerald-600">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 p-6 rounded-2xl bg-amber-50 border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-3">🕒 Clinic Timings</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-stone-600">{C.openDays}</span><span className="font-semibold text-stone-800">{C.openHours}</span></div>
                <div className="flex justify-between"><span className="text-stone-600">{C.closedDays}</span><span className="font-medium text-red-500">Closed</span></div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-stone-800 mb-3">🎓 Qualifications</h3>
              <div className="space-y-3">
                {C.qualifications.map(({ title, sub }) => (
                  <div key={title} className="flex gap-3 p-4 bg-green-50 rounded-xl">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-stone-800 text-sm">{title}</div>
                      <div className="text-xs text-stone-500 mt-0.5">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-stone-800 mb-3">💬 Clinic Philosophy</h3>
              <div className="p-5 rounded-2xl border-l-4 border-green-500 bg-green-50">
                <p className="text-stone-600 leading-relaxed italic">"{C.doctorQuote}"</p>
                <p className="mt-3 text-sm font-semibold text-green-700">— {C.doctorName}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-stone-800 mb-3">🤝 Patient Care Approach</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  ["🔍", "Thorough Assessment", "Comprehensive skin analysis before any treatment"],
                  ["📋", "Personalised Plans", "No one-size-fits-all — every plan is tailored"],
                  ["💡", "Patient Education", "We explain every step so you're fully informed"],
                  ["🔄", "Follow-up Care", "Ongoing support to ensure lasting results"],
                  ["🌿", "Gentle Approach", "Minimal-intervention first wherever possible"],
                  ["📞", "Accessible", "WhatsApp support for post-consultation queries"],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="p-4 rounded-xl bg-stone-50 hover:bg-green-50 transition-colors">
                    <span className="text-xl">{icon}</span>
                    <div className="font-semibold text-stone-800 text-sm mt-1">{title}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setPage("Appointment")}
              className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              style={{ background: `linear-gradient(135deg, ${C.colorPrimary}, ${C.colorPrimaryDark})` }}>
              Book a Consultation with {C.doctorName} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SERVICES ── */
function ServicesPage({ setPage }) {
  const [selected, setSelected] = useState(null);
  const C = CLINIC_CONFIG;
  return (
    <div className="min-h-screen" style={{ background: "#f8fdf8" }}>
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">What We Treat</span>
          <h1 className="text-4xl font-bold mt-2" style={{ fontFamily: "'Georgia', serif", color: C.colorHeroText }}>Our Dermatology Services</h1>
          <p className="text-stone-500 mt-3 max-w-xl mx-auto">Comprehensive skin care solutions personalised for every patient. Click any service for details.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div key={i}
              className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${selected === i ? "ring-2 ring-green-500 shadow-xl" : "shadow-md"}`}
              onClick={() => setSelected(selected === i ? null : i)}>
              <div className={`p-6 bg-gradient-to-br ${s.color}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{s.icon}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/70 text-stone-600">
                    {selected === i ? "▲ Less" : "▼ More"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-800 mb-2">{s.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
              {selected === i && (
                <div className="bg-white p-6 border-t border-stone-100">
                  <h4 className="font-bold text-stone-700 mb-3 text-sm uppercase tracking-wider">Key Benefits</h4>
                  <ul className="space-y-2 mb-5">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-stone-600">
                        <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs flex-shrink-0">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <button onClick={(e) => { e.stopPropagation(); setPage("Appointment"); }}
                    className="w-full py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                    style={{ background: `linear-gradient(135deg, ${C.colorPrimary}, ${C.colorPrimaryDark})` }}>
                    Book Consultation for {s.title}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl p-10 text-center" style={{ background: "linear-gradient(135deg, #14532d, #166534)" }}>
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Georgia', serif" }}>Not Sure Which Treatment You Need?</h2>
          <p className="text-green-200 mb-6">Book a General Skin Consultation and {C.doctorName} will guide you to the right treatment.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setPage("Appointment")} className="px-8 py-3 bg-white text-green-800 rounded-full font-bold hover:shadow-lg transition-all">Book Consultation</button>
            <WhatsAppBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── APPOINTMENT ── */
function AppointmentPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", treatment: "", date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const C = CLINIC_CONFIG;

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500); };

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#f0fdf4" }}>
      <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md mx-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
        <h2 className="text-2xl font-bold text-stone-800 mb-3" style={{ fontFamily: "'Georgia', serif" }}>Appointment Requested!</h2>
        <p className="text-stone-500 mb-2">Thank you, <strong>{form.name}</strong>. We'll confirm your appointment via WhatsApp or call shortly.</p>
        <p className="text-sm text-stone-400 mb-8">For immediate booking, WhatsApp us directly.</p>
        <div className="flex flex-col gap-3">
          <WhatsAppBtn />
          <button onClick={() => setSubmitted(false)} className="px-6 py-3 border border-stone-200 rounded-full text-stone-600 hover:bg-stone-50 transition-colors text-sm">Book Another</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "linear-gradient(135deg, #f0fdf4, #fef9f0)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Get Started</span>
          <h1 className="text-4xl font-bold mt-2" style={{ fontFamily: "'Georgia', serif", color: C.colorHeroText }}>Book Your Consultation</h1>
          <p className="text-stone-500 mt-3">Fill in the form below and we'll confirm within 24 hours. Or WhatsApp us for instant booking.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-stone-800 mb-4">📋 Before Your Visit</h3>
              <ul className="space-y-3 text-sm text-stone-600">
                {["Arrive 5 minutes early", "Bring previous prescriptions", "Clean face for facial concerns", "Note down your symptoms", "List current medications"].map(t => (
                  <li key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="bg-green-800 rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2">🕒 Clinic Hours</h3>
              <p className="text-green-200 text-sm mb-1">{C.openDays}</p>
              <p className="text-xl font-bold">{C.openHours}</p>
              <p className="text-green-300 text-xs mt-2">Closed {C.closedDays}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md text-center">
              <p className="text-stone-600 text-sm mb-3">Prefer WhatsApp booking?</p>
              <WhatsAppBtn />
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Full Name *</label>
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Phone Number *</label>
                  <input required name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Treatment Type *</label>
                  <select required name="treatment" value={form.treatment} onChange={handleChange} className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all bg-white">
                    <option value="">Select treatment</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">Preferred Date *</label>
                  <input required name="date" type="date" value={form.date} onChange={handleChange} className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Message / Describe Your Concern</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Briefly describe your skin concern, symptoms, or any questions..." className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: `linear-gradient(135deg, ${C.colorPrimary}, ${C.colorPrimaryDark})` }}>
                {loading ? "⏳ Booking..." : "📅 Book Consultation"}
              </button>
              <p className="text-xs text-stone-400 text-center">We'll call or WhatsApp you to confirm. No payment required.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── REVIEWS ── */
function ReviewsPage({ setPage }) {
  const C = CLINIC_CONFIG;
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Patient Stories</span>
          <h1 className="text-4xl font-bold mt-2" style={{ fontFamily: "'Georgia', serif", color: C.colorHeroText }}>Reviews &amp; Testimonials</h1>
          <p className="text-stone-500 mt-3">Real experiences from our valued patients across {C.clinicDistrict}.</p>
          <div className="flex items-center justify-center gap-4 mt-6 p-4 bg-amber-50 rounded-2xl w-fit mx-auto">
            <div className="text-5xl font-bold text-amber-500">5.0</div>
            <div><StarRating /><div className="text-sm text-stone-500 mt-1">Based on {C.stats[0].number} patient reviews</div></div>
          </div>
        </div>

        <div className="mb-10 p-6 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center gap-4">
          <div className="text-4xl">🔍</div>
          <div className="flex-1">
            <div className="font-bold text-stone-800">Google Reviews</div>
            <div className="text-sm text-stone-500">Search "{C.googleSearchTerm}" on Google Maps to see our live reviews</div>
          </div>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">View on Google</a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="p-6 rounded-2xl border border-stone-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="flex items-center justify-between mb-4">
                <StarRating />
                <span className="text-xs text-stone-400">{t.treatment}</span>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${t.color}`}>{t.initials}</div>
                <div>
                  <div className="font-semibold text-stone-800 text-sm">{t.name}</div>
                  <div className="text-xs text-stone-500">{t.location}</div>
                </div>
                <div className="ml-auto text-green-500 text-lg">✓</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-8" style={{ background: "#f8fdf8" }}>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 text-center" style={{ fontFamily: "'Georgia', serif" }}>Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                <h4 className="font-bold text-stone-800 text-sm mb-2">❓ {f.q}</h4>
                <p className="text-stone-600 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-stone-800 mb-4">Experienced Our Care? Share Your Review</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">⭐ Write a Google Review</a>
            <button onClick={() => setPage("Appointment")}
              className="px-6 py-3 rounded-full font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${C.colorPrimary}, ${C.colorPrimaryDark})` }}>
              Book Your Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── CONTACT ── */
function ContactPage({ setPage }) {
  const C = CLINIC_CONFIG;
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "#f8fdf8" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Find Us</span>
          <h1 className="text-4xl font-bold mt-2" style={{ fontFamily: "'Georgia', serif", color: C.colorHeroText }}>Contact &amp; Location</h1>
          <p className="text-stone-500 mt-3">We're located in {C.clinicCity}. Walk in or book ahead.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-stone-800 mb-4">📍 Address</h3>
              <p className="text-stone-600 text-sm leading-loose">
                {C.addressLine1},<br />{C.addressLine2},<br />{C.addressLine3},<br />{C.addressLine4}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-stone-800 mb-4">🕒 Clinic Timings</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-stone-800 text-sm">{C.openDays}</div>
                    <div className="text-xs text-stone-500">Open</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-700">{C.openHours}</div>
                    <div className="text-xs text-green-600">✓ Open</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                  <div className="font-semibold text-stone-800 text-sm">{C.closedDays}</div>
                  <div className="font-semibold text-red-500 text-sm">Closed</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-stone-800 mb-4">📞 Get in Touch</h3>
              <div className="space-y-3">
                <a href={`tel:+${C.phoneRaw}`} className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors">
                  <span className="text-2xl">📱</span>
                  <div>
                    <div className="text-xs text-stone-500">Phone / WhatsApp</div>
                    <div className="font-semibold text-stone-800 text-sm">{C.phone}</div>
                  </div>
                </a>
                {C.email && (
                  <a href={`mailto:${C.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <div className="text-xs text-stone-500">Email</div>
                      <div className="font-semibold text-stone-800 text-sm">{C.email}</div>
                    </div>
                  </a>
                )}
                <a href={`https://wa.me/${C.phoneRaw}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
                  <span className="text-2xl">💬</span>
                  <div>
                    <div className="text-xs text-stone-500">WhatsApp Booking</div>
                    <div className="font-semibold text-green-700 text-sm">Message us for appointments</div>
                  </div>
                </a>
              </div>
            </div>

            <button onClick={() => setPage("Appointment")}
              className="w-full py-4 rounded-2xl text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              style={{ background: `linear-gradient(135deg, ${C.colorPrimary}, ${C.colorPrimaryDark})` }}>
              📅 Book an Appointment Online
            </button>
            <div className="text-center"><WhatsAppBtn /></div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md">
              <div className="p-4 bg-green-50 border-b border-green-100">
                <h3 className="font-bold text-stone-800 text-sm">🗺️ Find Us — {C.clinicCity}, {C.clinicDistrict}</h3>
              </div>
              <iframe title="Clinic Location" width="100%" height="400" style={{ border: 0 }}
                loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"
                src={C.mapEmbedUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── GALLERY ── */
function GalleryPage({ setPage }) {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCard, setSelectedCard] = useState(null);
  const [uploadHover, setUploadHover] = useState(null);
  const C = CLINIC_CONFIG;
  const tabs = ["All", ...GALLERY_ITEMS.map(g => g.tag)];
  const filtered = activeTab === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.tag === activeTab);

  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "linear-gradient(180deg, #f8fdf8 0%, #fff 100%)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Results Gallery</span>
          <h1 className="text-4xl font-bold mt-2" style={{ fontFamily: "'Georgia', serif", color: C.colorHeroText }}>Treatment Results</h1>
          <p className="text-stone-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            Each card is a placeholder ready for a real patient photo. Replace with actual before/after images when available.
          </p>
        </div>

        <div className="mb-8 mx-auto max-w-2xl">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-2xl">📸</span>
            <div>
              <div className="font-bold text-amber-900 text-sm">How to add real photos</div>
              <div className="text-amber-700 text-xs mt-1 leading-relaxed">
                Place patient images in <code className="bg-amber-100 px-1 rounded">public/gallery/</code> and update the <code className="bg-amber-100 px-1 rounded">src</code> prop on each card. Always obtain written patient consent before publishing.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === tab ? "text-white shadow-md scale-105" : "bg-white border border-stone-200 text-stone-600 hover:border-green-300 hover:text-green-700"}`}
              style={activeTab === tab ? { background: `linear-gradient(135deg, ${C.colorPrimary}, ${C.colorPrimaryDark})` } : {}}>
              {tab === "All" ? "🗂️ All Treatments" : tab}
            </button>
          ))}
        </div>

        <div className="space-y-14">
          {filtered.map((group) => (
            <div key={group.treatment}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl ${group.iconBg} flex items-center justify-center text-xl`}>{group.icon}</div>
                <div>
                  <h2 className="text-xl font-bold text-stone-800" style={{ fontFamily: "'Georgia', serif" }}>{group.treatment}</h2>
                  <p className="text-xs text-stone-400">{group.cases.length} case studies · Placeholder images ready for upload</p>
                </div>
                <div className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${group.tagColor}`}>{group.cases.length} Cases</div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {group.cases.map((c) => (
                  <div key={c.id}
                    className={`rounded-2xl overflow-hidden border ${group.borderColor} bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${selectedCard === c.id ? "ring-2 ring-green-400 shadow-xl" : ""}`}
                    onClick={() => setSelectedCard(selectedCard === c.id ? null : c.id)}>
                    <div className="grid grid-cols-2 h-44 relative">
                      <div className={`flex flex-col items-center justify-center gap-1 bg-gradient-to-br ${group.color} relative`}
                        onMouseEnter={() => setUploadHover(`${c.id}-before`)}
                        onMouseLeave={() => setUploadHover(null)}>
                        <div className="text-3xl opacity-40">📷</div>
                        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Before</span>
                        <span className="text-xs text-stone-400 text-center px-2 leading-tight">{c.beforeNote}</span>
                        {uploadHover === `${c.id}-before` && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <span className="text-white text-xs font-bold text-center px-2">Click to upload<br />before photo</span>
                          </div>
                        )}
                        <div className="absolute top-2 left-2 bg-white/80 text-xs font-bold text-stone-600 px-2 py-0.5 rounded-full">Before</div>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-1 bg-white relative border-l border-stone-100"
                        onMouseEnter={() => setUploadHover(`${c.id}-after`)}
                        onMouseLeave={() => setUploadHover(null)}>
                        <div className="text-3xl opacity-40">🌟</div>
                        <span className="text-xs font-bold text-green-500 uppercase tracking-wider">After</span>
                        <span className="text-xs text-stone-400 text-center px-2 leading-tight">{c.afterNote}</span>
                        {uploadHover === `${c.id}-after` && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <span className="text-white text-xs font-bold text-center px-2">Click to upload<br />after photo</span>
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-green-500 text-xs font-bold text-white px-2 py-0.5 rounded-full">After</div>
                      </div>

                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center z-10">
                        <svg className="w-3 h-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 12h8M8 17h8" />
                        </svg>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-stone-800 text-sm leading-tight">{c.label}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${group.tagColor}`}>{c.result}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-stone-500">
                        <span>⏱ {c.duration}</span>
                        <span>🔁 {c.sessions}</span>
                        <span>👤 {c.patientAge}</span>
                      </div>
                      {selectedCard === c.id && (
                        <div className="mt-3 pt-3 border-t border-stone-100 space-y-2">
                          <div className="flex gap-2">
                            <div className={`flex-1 p-2 rounded-lg text-xs ${group.color} text-stone-700`}>
                              <div className="font-bold mb-0.5">Before</div>{c.beforeNote}
                            </div>
                            <div className="flex-1 p-2 rounded-lg text-xs bg-green-50 text-green-800">
                              <div className="font-bold mb-0.5">After</div>{c.afterNote}
                            </div>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); setPage("Appointment"); }}
                            className="w-full mt-1 py-2 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-opacity"
                            style={{ background: `linear-gradient(135deg, ${C.colorPrimary}, ${C.colorPrimaryDark})` }}>
                            Book This Treatment →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 p-6 rounded-2xl bg-stone-50 border border-stone-200 flex gap-4 items-start">
          <span className="text-2xl">⚖️</span>
          <div>
            <div className="font-bold text-stone-700 text-sm mb-1">Patient Privacy &amp; Consent</div>
            <p className="text-stone-500 text-xs leading-relaxed">
              All real patient photos must be published only with documented written consent as per Indian Medical Council guidelines. Names and identifying information should be anonymised unless explicit permission is granted.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl p-10 text-center" style={{ background: "linear-gradient(135deg, #14532d, #166534)" }}>
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Georgia', serif" }}>Want Results Like These?</h2>
          <p className="text-green-200 text-sm mb-6">Book a consultation and start your skin transformation journey with {C.doctorName}.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setPage("Appointment")} className="px-8 py-3 bg-white text-green-800 rounded-full font-bold hover:shadow-lg transition-all">📅 Book Consultation</button>
            <WhatsAppBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FOOTER ── */
function Footer({ setPage }) {
  const C = CLINIC_CONFIG;
  return (
    <footer style={{ background: "#0d2818" }} className="text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-xl">🌿</div>
              <div>
                <div className="font-bold text-lg" style={{ fontFamily: "'Georgia', serif" }}>{C.doctorName}</div>
                <div className="text-green-400 text-xs">{C.clinicName} · {C.clinicCity}</div>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-4 max-w-sm">{C.tagline} — Expert dermatological care with a personal touch for patients across {C.clinicDistrict}.</p>
            <div className="flex gap-2">
              <a href={`https://wa.me/${C.phoneRaw}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-xs font-semibold transition-colors">WhatsApp</a>
              <a href={`tel:+${C.phoneRaw}`} className="px-4 py-2 bg-stone-700 hover:bg-stone-600 rounded-lg text-xs font-semibold transition-colors">Call Us</a>
            </div>
          </div>

          <div>
            <div className="font-semibold text-green-400 text-xs uppercase tracking-widest mb-4">Quick Links</div>
            <div className="space-y-2">
              {NAV_LINKS.map(l => (
                <button key={l} onClick={() => setPage(l)} className="block text-stone-400 hover:text-white text-sm transition-colors">{l}</button>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold text-green-400 text-xs uppercase tracking-widest mb-4">Clinic Info</div>
            <div className="space-y-2 text-sm text-stone-400">
              <div>📍 {C.addressLine2}, {C.clinicCity}</div>
              <div>📍 {C.clinicDistrict}</div>
              <div>⏰ {C.openDays}: {C.openHours}</div>
              <div>📞 {C.phone}</div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500">© {new Date().getFullYear()} {C.clinicName}. All rights reserved.</p>
          <p className="text-xs text-stone-600">Serving {C.serveAreas}</p>
        </div>
      </div>
    </footer>
  );
}

/* ── MAIN APP ── */
export default function App() {
  const [page, setPage] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const topRef = useRef(null);

  const navigate = (p) => {
    setPage(p);
    setMenuOpen(false);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const C = CLINIC_CONFIG;
  const pages = {
    Home: <HomePage setPage={navigate} />,
    About: <AboutPage setPage={navigate} />,
    Services: <ServicesPage setPage={navigate} />,
    Gallery: <GalleryPage setPage={navigate} />,
    Appointment: <AppointmentPage />,
    Reviews: <ReviewsPage setPage={navigate} />,
    Contact: <ContactPage setPage={navigate} />,
  };

  return (
    <div className="min-h-screen font-sans" style={{ fontFamily: "'Lato', 'Segoe UI', sans-serif" }}>
      <div ref={topRef} />

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => navigate("Home")} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center text-lg">🌿</div>
              <div className="text-left">
                <div className="font-bold text-stone-800 text-sm leading-tight" style={{ fontFamily: "'Georgia', serif" }}>{C.doctorName}</div>
                <div className="text-xs text-green-600">{C.clinicName} · {C.clinicCity}</div>
              </div>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(l => (
                <button key={l} onClick={() => navigate(l)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${page === l ? "bg-green-100 text-green-700" : "text-stone-600 hover:text-green-700 hover:bg-green-50"}`}>
                  {l}
                </button>
              ))}
              <button onClick={() => navigate("Appointment")}
                className="ml-2 px-5 py-2 rounded-full text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                style={{ background: `linear-gradient(135deg, ${C.colorPrimary}, ${C.colorPrimaryDark})` }}>
                Book Now
              </button>
            </div>

            <button className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-4 py-3 space-y-1">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => navigate(l)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${page === l ? "bg-green-100 text-green-700" : "text-stone-600 hover:bg-stone-50"}`}>
                {l}
              </button>
            ))}
            <div className="pt-2 pb-1">
              <button onClick={() => navigate("Appointment")}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm"
                style={{ background: `linear-gradient(135deg, ${C.colorPrimary}, ${C.colorPrimaryDark})` }}>
                📅 Book Appointment
              </button>
            </div>
          </div>
        )}
      </nav>

      <main>{pages[page]}</main>
      <Footer setPage={navigate} />
      <WhatsAppBtn fixed />
      <Analytics />
    </div>
  );
}
