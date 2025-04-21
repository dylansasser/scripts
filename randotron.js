const svg = document.getElementById('ds-dynamic-logo');
svg.onclick = (e) => {
  const colors = ['#f8f6ef', '#faf2dc', '#d2cab2', '#857d65', '#5c5746', '#5d5d4c', '#424236', '#8f8f75']
  const rando = () => colors[Math.floor(Math.random() * colors.length)];
  document.documentElement.style.cssText = `
       --swatch--light: ${rando()};
      --swatch--light-tan: ${rando()};
      --swatch--medium-tan: ${rando()};
      --swatch--dark-tan: ${rando()};
      --swatch--green-tan: ${rando()};
      --swatch--medium-green: ${rando()};
      --swatch--dark-green: ${rando()};
      --swatch--light-green: ${rando()};
  `

}