import React from "react";

export default function OrderOnline() {
  const platforms = [
    {
      name: "Shopee Food",
      url: "https://shopeefood.co.id",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C9.243 2 7 4.243 7 7H5v4h14V7h-2c0-2.757-2.243-5-5-5zM5 13v9h14v-9H5zm7 2a3 3 0 110 6 3 3 0 010-6z" />
        </svg>
      ),
      color: "from-orange-400 via-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-500 hover:via-orange-600 hover:to-orange-700",
      shadow: "shadow-orange-200 dark:shadow-orange-900/30",
    },
    {
      name: "GrabFood",
      url: "https://food.grab.com",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      color: "from-green-400 via-green-500 to-green-600",
      hoverColor: "hover:from-green-500 hover:via-green-600 hover:to-green-700",
      shadow: "shadow-green-200 dark:shadow-green-900/30",
    },
    {
      name: "GoFood",
      url: "https://gofood.co.id",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.486 2 2 6.486 2 12c0 2.312.781 4.437 2.094 6.125L12 22l7.906-3.875A9.953 9.953 0 0022 12c0-5.514-4.486-10-10-10z" />
        </svg>
      ),
      color: "from-red-400 via-red-500 to-red-600",
      hoverColor: "hover:from-red-500 hover:via-red-600 hover:to-red-700",
      shadow: "shadow-red-200 dark:shadow-red-900/30",
    },
  ];

  return (
    <section id="pesanonline" className="relative py-20 bg-gradient-to-br from-yellow-50 via-yellow-200 to-amber-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/10 dark:bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/10 dark:bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 dark:bg-yellow-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center px-6">
        {/* Header Section */}
        <div className="mb-11 text-center">
        {/* Ikon + Judul */}
        <div className="flex items-center justify-center gap-3 mb-5 mt-0">
            <h2 className="text-6xl font-cake md:text-7xl font-bold text-yellow-700 dark:text-yellow-500 leading-none">
            Pesan Online dengan Mudah & Cepat
            </h2>
        </div>

        {/* Deskripsi */}
        <p className="text-sm font-body px-5 text-yellow-800 dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Nikmati kenyamanan memesan makanan favorit Anda melalui platform online terpercaya. 
            Pilih platform kesayangan Anda dan mulai menikmati pengalaman kuliner yang tak terlupakan.
        </p>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 mb-5">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  relative flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl 
                  bg-gradient-to-br ${platform.color} ${platform.hoverColor}
                  text-white shadow-lg ${platform.shadow}
                  hover:shadow-xl hover:scale-105 
                  transform transition-all duration-300 ease-out
                  backdrop-blur-sm border border-white/20 dark:border-gray-700/50
                  min-h-[120px] md:min-h-[140px]
                `}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
                
                {/* Icon container */}
                <div className="relative mb-2 md:mb-3 p-2 bg-white/20 dark:bg-white/30 rounded-xl backdrop-blur-sm group-hover:bg-white/30 dark:group-hover:bg-white/40 transition-all duration-300">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {platform.svg}
                  </div>
                </div>
                
                {/* Platform name */}
                <span className="relative font-semibold text-sm md:text-base mb-1 group-hover:text-white transition-colors duration-300">
                  {platform.name}
                </span>
                
                {/* Call to action */}
                <span className="relative text-xs opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  Pesan Sekarang
                </span>

                {/* Arrow icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
