import { useState, useEffect } from 'react'
import Head from 'next/head'
 

export default function WeddingEnvelope() {
  const [isOpening, setIsOpening] = useState(false)
  const [showWedding, setShowWedding] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showLabel, setShowLabel] = useState(true)

  const handleOpenEnvelope = () => {
    setIsOpening(true)
    setHasInteracted(true)
    const audio = document.getElementById('bgMusic')
    if (audio) {
      audio.play().then(() => setIsPlaying(true)).catch(e => console.log('Audio play failed:', e))
    }
    setTimeout(() => {
      setShowWedding(true)
    }, 1200)
  }

  const togglePlay = () => {
    const audio = document.getElementById('bgMusic')
    if (!audio) return
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    const onScroll = () => {
      setShowLabel(window.scrollY < 80)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  

  
  return (
    <>
      <Head>
        <title>VANE & SERGIO - Nuestra Boda</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Acompáñanos el 7 de Febrero 2026. VANE & SERGIO - Nuestra Boda." />
        <meta property="og:title" content="VANE & SERGIO - Nuestra Boda" />
        <meta property="og:description" content="Save the Date: 7 de Febrero 2026. Ceremonia y recepción en Jardín Las Jacarandas." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/share-img.png" />
        <meta property="og:image:alt" content="VANE & SERGIO - Nuestra Boda" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VANE & SERGIO - Nuestra Boda" />
        <meta name="twitter:description" content="Acompáñanos el 7 de Febrero 2026." />
        <meta name="twitter:image" content="/images/share-img.png" />
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  olive: {
                    50: '#f2f4ee',
                    100: '#e3e9da',
                    300: '#a7b992',
                    600: '#6B8E4A',
                    800: '#556B2F'
                  },
                  gold: {
                    500: '#d4af37',
                    600: '#c19a2a',
                    700: '#b3891f'
                  },
                  cream: {
                    50: '#f7f6f2',
                    100: '#f0ede6'
                  }
                }
              }
            }
          }
        `}} />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="/wedding.ico" />
      </Head>
      {hasInteracted && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={togglePlay}
            className={`bg-black/60 hover:bg-black/70 text-white rounded-full shadow-lg transition-all duration-300 flex items-center backdrop-blur-sm border border-gold-500 ${showLabel ? 'px-4 py-2 gap-3' : 'p-2'}`}
          >
            {showLabel && (
              <span className="text-sm tracking-wide transition-opacity duration-300">NUESTRA CANCIÓN</span>
            )}
            <span className="relative w-6 h-6">
              <span className={`absolute inset-0 text-gold-500 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>🎵</span>
              <span className={`absolute inset-0 text-gold-500 line-through transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>🎵</span>
            </span>
          </button>
        </div>
      )}
      
      <style jsx>{`
        .intro-gradient {
          position: relative;
          --olive: 107,142,74;
          --intensity: 0.18;
          background: linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(var(--olive), var(--intensity)) 40%, rgba(255,255,255,1) 80%);
          background-size: 200% 200%;
          animation: sweepGrad 16s ease-in-out infinite;
          overflow: hidden;
        }
        @keyframes sweepGrad {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {!showWedding && (
        <div className="min-h-screen intro-gradient flex items-center justify-center p-8">
          <div className="relative z-10 text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-olive-800 mb-3" style={{fontFamily: 'Playfair Display'}}>
              Nuestra Invitación
            </h1>
            <p className="font-sans text-olive-700 text-lg mb-6" style={{fontFamily: 'Lato'}}>
              Haz clic en el sello para abrir
            </p>
            <button
              onClick={handleOpenEnvelope}
              className="inline-block rounded-full overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 focus:outline-none"
              aria-label="Abrir invitación"
            >
              <img src="/images/seal.png" alt="Sello de cera" className="w-28 h-28 object-contain" />
            </button>
          </div>
        </div>
      )}

      {showWedding && <WeddingWebsite />}

      <audio id="bgMusic" loop preload="auto">
        <source src="/audio/Carlos Rivera - Te Esperaba (Lyric Video).mp3" type="audio/mpeg" />
      </audio>
    </>
  )
}

function WeddingWebsite() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const weddingDate = new Date('2026-02-07T14:30:00')
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate.getTime() - now
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <style jsx global>{`
        body {
          font-family: 'Lato', sans-serif;
        }
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        .timeline-item {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }
        .timeline-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>


      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gray-300">
          <img 
            src="/images/v_s-hero.jpg" 
            alt="Victoria y Salvador" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="font-serif text-6xl md:text-8xl mb-6 animate-fade-in">
            ¡Nos Casamos!
          </h1>
          <p className="font-sans text-xl md:text-2xl text-cream-100">
            Y queremos que seas parte del inicio de esta historia
          </p>
        </div>
      </section>

      

      {/* Calendar Section */}
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-5xl md:text-6xl text-olive-800 mb-3">
            Save the Date
          </h2>
          <div className="mx-auto w-24 h-0.5 bg-gold-500 rounded mb-6"></div>
          <p className="font-sans text-2xl text-olive-600 mb-4">
            Febrero 2026
          </p>
          <div className="inline-flex items-center gap-2 bg-white/80 border border-gold-500 text-olive-800 px-4 py-2 rounded-full mb-10 shadow-sm">
            <span className="font-serif">07</span>
            <span className="text-olive-600">de</span>
            <span className="font-serif">Febrero</span>
            <span className="text-olive-600">de</span>
            <span className="font-serif">2026</span>
          </div>
          
          {/* Calendar Grid */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mb-8 border border-cream-100">
            <div className="grid grid-cols-7 gap-2 text-center">
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
                <div key={`day-${i}`} className="font-semibold text-olive-700 p-2">{day}</div>
              ))}
              {Array.from({length: 28}, (_, i) => i + 1).map(date => (
                <div 
                  key={date} 
                  className={`p-2 rounded transition transform ${date === 7 ? 'bg-gold-500 text-white font-bold shadow-md ring-2 ring-gold-500 scale-105 animate-pulse' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {date}
                </div>
              ))}
            </div>
          </div>

          {/* RSVP */}
          <p className="font-sans text-olive-700 mb-4">Confirma tu asistencia con cualquiera de nosotros</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/3421056700?text=Hola%20confirmo%20asistencia" 
              className="border-2 border-olive-600 text-olive-600 hover:bg-olive-600 hover:text-white px-8 py-3 rounded-full font-serif text-lg transition-all duration-300"
            >
              Confirmar con el Novio
            </a>
            <a 
              href="https://wa.me/5551441221?text=Hola%20confirmo%20asistencia" 
              className="border-2 border-olive-600 text-olive-600 hover:bg-olive-600 hover:text-white px-8 py-3 rounded-full font-serif text-lg transition-all duration-300"
            >
              Confirmar con la Novia
            </a>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 bg-olive-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-olive-800 mb-8">
            Cuenta Regresiva
          </h2>
          
          {/* Countdown Timer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-2xl mx-auto">
            {[
              {label: 'Días', value: timeLeft.days},
              {label: 'Horas', value: timeLeft.hours},
              {label: 'Minutos', value: timeLeft.minutes},
              {label: 'Segundos', value: timeLeft.seconds}
            ].map(item => (
              <div key={item.label} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="font-serif text-4xl md:text-5xl text-gold-600 mb-2">
                  {item.value}
                </div>
                <div className="font-sans text-olive-600 uppercase tracking-wide">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Photo Gallery */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-3xl mx-auto">
            {/* Foto 1 (vertical) */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md md:shadow-lg border border-cream-100 h-[28rem] flex items-center justify-center transform rotate-[-3deg] md:rotate-[-5deg] -translate-y-1 md:-translate-y-2 z-10">
              <img
                src="/images/v-s-2.jpg"
                alt="Foto vertical de la pareja"
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
            {/* Foto 2 (vertical) */}
            <div className="bg-white rounded-xl overflow-hidden shadow-none md:shadow-lg border border-cream-100 h-[28rem] flex items-center justify-center transform rotate-[4deg] md:rotate-[6deg] translate-y-1 md:translate-y-2 -mt-2 md:mt-0 z-0">
              <img
                src="/images/hand-v-s.jpg"
                alt="Foto vertical de manos"
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-olive-800 mb-4">
            Ceremonia Civil y Recepción
          </h2>
          <p className="font-sans text-xl text-olive-600 mb-8">
            Jardín Las Jacarandas
          </p>
          
          <div className="max-w-4xl mx-auto mb-8">
            <div className="rounded-lg overflow-hidden h-96">
              <iframe
                src="https://maps.google.com/maps?q=19.260579,-98.899812&z=17&hl=es&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(60%) saturate(85%) contrast(95%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <a 
            href="https://share.google/WFcgT0NA2XwtIXohT"
            className="bg-olive-600 hover:bg-olive-700 text-white px-8 py-3 rounded-full font-serif text-lg transition-all duration-300"
          >
            Ver ubicación / Cómo llegar
          </a>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl md:text-5xl text-olive-800 text-center mb-8">
            Itinerario
          </h2>
          
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-olive-300 transform -translate-x-1/2"></div>

              {[
                {time: '2:30 PM', title: 'Recepción', img: '/images/rings.png'},
                {time: '4:00 PM', title: 'Comida', img: '/images/restaurant.png'},
                {time: '5:00 PM', title: 'Festejo', img: '/images/musical-notes.png'},
                {time: '11:00 PM', title: 'Cierre', img: '/images/car.png'}
              ].map((event, index) => (
                <div key={index} className={`timeline-item visible relative mb-12 md:w-1/2 ${index % 2 === 0 ? 'mr-auto md:-rotate-1' : 'ml-auto md:rotate-1'}`}>
                  <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-md border border-gold-500 flex items-center justify-center">
                    <img src={event.img} alt={`Icono ${event.title}`} className="w-10 h-10 object-contain" />
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="font-sans text-lg text-olive-800">{event.title}</div>
                    <div className="font-serif text-xl text-gold-600">{event.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center text-olive-700 font-sans mt-8">
            <p>Agradeceremos tu puntualidad al llegar</p>
            <p><span className="font-serif text-gold-600">2:30 pm</span> a la recepción.</p>
            <p className="mt-1">Nos interesa mucho verte ahi</p>
          </div>
        </div>
      </section>

      {/* Dress Code Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-olive-800 mb-6">
            Código de Vestimenta
          </h2>
          <p className="font-sans text-olive-700 mb-4">
            Lo más importante para nosotros es que se sientan comodos, pero nos gustaria que la vestimenta fuera,
          </p>
          <div className="inline-flex items-center gap-2 border border-olive-600 text-olive-700 px-4 py-2 rounded-full mb-6">
            <span className="font-serif">Formal - Cocktail</span>
          </div>

          <div className="max-w-md mx-auto mb-6">
            <div className="bg-cream-50 rounded-xl p-6 shadow-sm border border-cream-100">
              <div className="font-serif text-olive-800 mb-4">Prohibidos</div>
              <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-48">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-red-600">🚫</span>
                    <span className="font-sans text-red-700 font-semibold">No Blanco</span>
                  </div>
                  <div className="w-full h-8 rounded bg-white border"></div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-48">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-red-600">🚫</span>
                    <span className="font-sans text-red-700 font-semibold">No Verde Olivo</span>
                  </div>
                  <div className="w-full h-8 rounded" style={{backgroundColor: 'var(--olive-800)'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Registry Section */}
      <section className="py-16 bg-olive-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-cream-100 p-8 text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-olive-800 mb-4">V&amp;S</h2>
            <div className="font-sans text-olive-700 space-y-2 mb-6">
              <p>Aunque tu presencia es nuestro mayor regalo, si</p>
              <p>aun asi quieres obsequiarnos algo, puedes</p>
              <p>consultar la siguiente guia.</p>
              <p>No necesariamente debe ser adquirido en estas</p>
              <p>tiendas, pero si deseas realizarnos ese obsequio,</p>
              <p>te agradecemos que lo marques como</p>
              <p>comprado.</p>
            </div>

            <div className="flex justify-center">
              <a 
                href="https://www.amazon.com.mx/wedding/registry/2PG5R4ZUUJMCL"
                className="inline-flex items-center gap-3 bg-cream-50 hover:bg-white rounded-full px-6 py-3 shadow-md border border-cream-100 transition-all duration-300"
              >
                <span className="text-2xl">📦</span>
                <span className="font-sans text-olive-800">Amazon</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative">
        <div className="relative w-full h-64 md:h-96">
          <img 
            src="/images/v-s-1.jpg" 
            alt="Victoria y Salvador - Footer" 
            className="w-full h-full object-cover" 
            loading="lazy" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-transparent"></div>
        </div>
        <div className="bg-black text-white text-xs py-2 text-center">
          Hecho con ❤️ | @namelesseddsj
        </div>
      </footer>
    </>
  )
}
