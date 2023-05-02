export function getRandomPastelColor() {
   var hue = Math.floor(Math.random() * 360); // choose a random hue
   var pastelSaturation = Math.floor(Math.random() * 31) + 70; // set saturation between 70% and 100%
   var pastelLightness = Math.floor(Math.random() * 41) + 30; // set lightness between 30% and 70%
   var pastelColor = 'hsl(' + hue + ',' + pastelSaturation + '%,' + pastelLightness + '%)'; // build the HSL color string
   return pastelColor;
}