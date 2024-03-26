
/**
 * Get a random pastel color.
 * @returns {string} The color in hex format. Example: #000000
 */
export function getRandomPastelColor() {
  let color = "#";
  for (let i = 0; i < 3; i++) {
    // Add 127 to ensure it's always a pastel color
    let component = Math.round(Math.random() * 127 + 127).toString(16);
    if (component.length === 1) {
      component = "0" + component;
    }
    color += component;
  }
  return color;
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

/**
 * Get the favicon of a website checking if it does not return 404, if it does, return null.
 * @param url The url to get the favicon from.
 */
export function getFavicon(url: string): string | null {
  if (!url) return 'https://webmarks.io/favicon.ico';
  // const response = fetch(`https://s2.googleusercontent.com/s2/favicons?domain=${url}`).catch(() => null);
  // if (response === null) return null;
  return `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;
}