import React from "react";
import { GiCakeSlice } from "react-icons/gi";

export default function About() {
  const imageLinks = [
    "https://javara.co.id/wp-content/uploads/2023/01/istockphoto.jpeg",
    "https://images.unsplash.com/photo-1580745497986-76cbf3d259da?q=80&w=1548&auto=format&fit=crop&=80",
    "https://asset.kompas.com/crops/QqRi14iIqQEJbQU7KC-DO-IStdk=/0x39:1000x706/1200x800/data/photo/2021/12/21/61c18043d7d4d.jpg",
    "https://cdn0-production-images-kly.akamaized.net/zpGY7r7c8h4qg26qB9dRmlCe6CA=/0x274:750x697/1200x675/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/4370161/original/043741400_1679641233-shutterstock_1748008952.jpg",
    "https://sisterssansgluten.com/wp-content/uploads/2020/03/matcha-2-scaled.jpg",
    "https://foto.kontan.co.id/mrrVhlWYRgrpzEcr_FrEvQvKkWY=/smart/2024/07/10/296713580p.jpg",
    "https://images.unsplash.com/photo-1605807646983-377bc5a76493?q=80&w=2524&auto=format&fit=crop&=80",
    "https://images.unsplash.com/photo-1626263468007-a9e0cf83f1ac?q=80&w=1740&auto=format&fit=crop&=80",
    "https://images.unsplash.com/photo-1602630209855-dceac223adfe?q=80&w=1773&auto=format&fit=crop&=80",
    "https://images.unsplash.com/photo-1630150275481-fdd323506564?q=80&w=1208&auto=format&fit=crop&=80",
    "https://images.unsplash.com/photo-1570806516998-c4c167ee2f55?q=80&w=1374&auto=format&fit=crop&=80",
    
  ];

  // Duplikasi array untuk loop mulus
  const scrollImages = [...imageLinks, ...imageLinks];

  return (
    <section
      id="about"
      className="py-20 px-7 bg-gradient-to-r from-yellow-50 to-yellow-400 dark:from-slate-600 dark:to-slate-900 flex flex-col items-center transition-colors duration-300"
    >
      {/* Konten About */}
      <div className="flex flex-col items-center mb-12 text-center -mt-1 max-w-2xl">
        <GiCakeSlice className="text-8xl text-yellow-700 dark:text-yellow-500 mb-4 drop-shadow-lg" />
        <h2 className="text-6xl font-cake font-extrabold text-yellow-700 dark:text-yellow-400 mb-3 tracking-wide">
          Firdaus Cake
        </h2>
        <p className="text-lg font-body text-yellow-800 dark:text-yellow-300 mb-4 italic">
          “Manis dalam setiap potongan.”
        </p>
        <p className="text-md font-body text-yellow-700 dark:text-yellow-300 leading-relaxed">
          Firdaus Cake hadir dengan cita rasa lembut, tampilan elegan, 
          dan sentuhan kehangatan di setiap sajian. Karena setiap momen 
          berharga layak ditemani rasa yang istimewa.
        </p>
      </div>

      {/* Marquee Footer */}
      <div className="overflow-hidden w-full mb-5">
        <div className="flex animate-marquee gap-4">
          {scrollImages.map((link, idx) => (
            <img
              key={idx}
              src={link}
              alt={`Gambar ${idx + 1}`}
              className="w-60 h-45 object-cover rounded-lg drop-shadow-lg flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* CSS Tailwind custom */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
