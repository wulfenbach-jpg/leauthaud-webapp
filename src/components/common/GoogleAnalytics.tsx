import { useEffect } from 'react';

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined') return;
    if (document.querySelector(`script[src*="id=${GA_ID}"]`)) return; // already loaded

    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(gtagScript);

    const initScript = document.createElement('script');
    initScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `;
    document.head.appendChild(initScript);
  }, []);

  return null;
};

export default GoogleAnalytics;
