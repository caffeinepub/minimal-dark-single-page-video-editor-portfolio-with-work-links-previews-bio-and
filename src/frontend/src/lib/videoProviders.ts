export interface VideoProviderInfo {
  provider: string;
  embedUrl: string;
  supported: boolean;
}

export function detectVideoProvider(url: string): VideoProviderInfo | null {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase().replace('www.', '');

    // YouTube
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      let videoId = '';

      if (hostname.includes('youtu.be')) {
        // Handle youtu.be short links - extract ID from pathname
        const pathParts = urlObj.pathname.slice(1).split('/');
        videoId = pathParts[0].split('?')[0];
      } else if (urlObj.pathname.includes('/embed/')) {
        // Handle embed URLs
        const pathParts = urlObj.pathname.split('/embed/');
        videoId = pathParts[1].split('/')[0].split('?')[0];
      } else if (urlObj.pathname.includes('/shorts/')) {
        // Handle YouTube Shorts - extract ID from pathname
        const pathParts = urlObj.pathname.split('/shorts/');
        videoId = pathParts[1].split('/')[0].split('?')[0];
      } else {
        // Handle standard watch URLs
        videoId = urlObj.searchParams.get('v') || '';
      }

      // Clean up any remaining query params or fragments
      videoId = videoId.split('&')[0].split('#')[0];

      if (videoId) {
        return {
          provider: 'YouTube',
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          supported: true,
        };
      }
    }

    // Vimeo
    if (hostname.includes('vimeo.com')) {
      const videoId = urlObj.pathname.split('/').filter(Boolean)[0];
      if (videoId) {
        return {
          provider: 'Vimeo',
          embedUrl: `https://player.vimeo.com/video/${videoId}`,
          supported: true,
        };
      }
    }

    return {
      provider: 'Unknown',
      embedUrl: '',
      supported: false,
    };
  } catch (error) {
    console.error('Error detecting video provider:', error);
    return null;
  }
}
