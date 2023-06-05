export function getRandomPastelColor() {
   var hue = Math.floor(Math.random() * 360); // choose a random hue
   var pastelSaturation = Math.floor(Math.random() * 31) + 70; // set saturation between 70% and 100%
   var pastelLightness = Math.floor(Math.random() * 41) + 30; // set lightness between 30% and 70%
   var pastelColor = 'hsl(' + hue + ',' + pastelSaturation + '%,' + pastelLightness + '%)'; // build the HSL color string
   return pastelColor;
}

/**
 * Get color (black/white) depending on bgColor so it would be clearly seen.
 * @param hex The background color. Example: #000000
 * @returns {string}
 */
export function getColorByBgColor(hex: string): string {
   // Convert the hex color to RGB
   const r = parseInt(hex.substr(1, 2), 16);
   const g = parseInt(hex.substr(3, 2), 16);
   const b = parseInt(hex.substr(5, 2), 16);

   // Calculate the relative luminance
   const relativeLuminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

   // Determine the contrast ratio
   const contrastRatio = (relativeLuminance + 0.05) / 0.05;

   // Decide the text color based on the contrast ratio
   return contrastRatio >= 4.5 ? '#000000' : '#ffffff';
}

export function getFavicon(url: string): string {
   if (!url) return 'https://s2.googleusercontent.com/s2/favicons?domain=webmarks.io';
   return `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;
}