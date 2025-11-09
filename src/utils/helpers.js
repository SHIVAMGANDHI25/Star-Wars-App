export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const convertHeight = (heightCm) => {
  return (heightCm / 100).toFixed(2);
};

export const getRandomImage = (seed) => {
  return `https://picsum.photos/seed/${seed}/400/500`;
};

export const getSpeciesColor = (speciesName) => {
  const colors = {
    'Human': 'bg-blue-100 border-blue-400',
    'Droid': 'bg-gray-100 border-gray-400',
    'Wookiee': 'bg-amber-100 border-amber-600',
    'Rodian': 'bg-green-100 border-green-500',
    'Hutt': 'bg-yellow-100 border-yellow-600',
    'Yoda\'s species': 'bg-emerald-100 border-emerald-500',
    'Trandoshan': 'bg-lime-100 border-lime-600',
    'Mon Calamari': 'bg-cyan-100 border-cyan-500',
    'Ewok': 'bg-orange-100 border-orange-500',
    'Sullustan': 'bg-rose-100 border-rose-400',
    'Neimodian': 'bg-purple-100 border-purple-400',
    'Gungan': 'bg-indigo-100 border-indigo-400',
    'Toydarian': 'bg-pink-100 border-pink-400',
    'Dug': 'bg-red-100 border-red-400',
    'Twi\'lek': 'bg-violet-100 border-violet-400',
    'Aleena': 'bg-fuchsia-100 border-fuchsia-400',
    'Vulptereen': 'bg-sky-100 border-sky-400',
    'Xexto': 'bg-teal-100 border-teal-400',
    'Toong': 'bg-slate-100 border-slate-400',
    'Cerean': 'bg-zinc-100 border-zinc-400',
    'Nautolan': 'bg-emerald-100 border-emerald-600',
    'Zabrak': 'bg-red-100 border-red-600',
    'Tholothian': 'bg-blue-100 border-blue-600',
    'Iktotchi': 'bg-stone-100 border-stone-500',
    'Quermian': 'bg-orange-100 border-orange-600',
    'Kel Dor': 'bg-amber-100 border-amber-500',
    'Chagrian': 'bg-sky-100 border-sky-600',
    'Geonosian': 'bg-orange-100 border-orange-700',
    'Mirialan': 'bg-green-100 border-green-600',
    'Clawdite': 'bg-lime-100 border-lime-500',
    'Besalisk': 'bg-cyan-100 border-cyan-600',
    'Kaminoan': 'bg-gray-100 border-gray-500',
    'Skakoan': 'bg-indigo-100 border-indigo-600',
    'Muun': 'bg-slate-100 border-slate-600',
    'Togruta': 'bg-orange-100 border-orange-400',
    'Kaleesh': 'bg-red-100 border-red-500',
    'Pau\'an': 'bg-zinc-100 border-zinc-600',
    'default': 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-400'
  };
  
  return colors[speciesName] || colors['default'];
};
