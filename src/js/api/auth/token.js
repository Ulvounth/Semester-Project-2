export function decodedAccessToken() {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    // Simply return null without logging an error
    return null;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null; // Invalid token format
    }
    const decodedPayload = atob(parts[1].replace(/_/g, '/').replace(/-/g, '+'));
    return JSON.parse(decodedPayload);
  } catch (error) {
    // Handle decoding errors silently or log them as warnings without affecting user experience
    console.warn('Failed to decode access token:', error);
    return null;
  }
}
