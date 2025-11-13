
export default async function Home() {

  return (
    <main className="flex min-h-screen w-full  flex-col items-center justify-between  sm:items-center">
      <section className="relative w-full  flex flex-col items-center justify-center px-4 pt-20 overflow-hidden min-h-screen">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <p className="text-orange-500/80 font-light tracking-widest uppercase text-sm">A Essência do Poder</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-balance leading-tight">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600  via-orange-400 to-orange-500 animate-pulse">
                Vontade
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-orange-400 to-orange-500">
                do Fogo
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed">
            A chama que queima dentro de cada um, conectando corações através do sacrifício e da determinação
          </p>

          <div className="pt-8">
            <button type="button" className="group relative px-8 py-4 rounded-lg bg-linear-to-r from-orange-600 to-orange-500 text-foreground font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange/50">
              <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2 justify-center">
                Ver Ninjas
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-labelledby="exploreIconTitle">
                  <title id="exploreIconTitle">Arrow right</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-orange-500/5 to-transparent pointer-events-none"></div>
      </section>
    </main>
  );
}
