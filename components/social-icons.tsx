'use client';

import { useState, useEffect } from 'react';

export default function SocialIcons() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const SocialIcon = ({ icon, label }: { icon: string; label: string }) => (
    <div
      className={`transform transition-all duration-700 ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0)';
      }}
    >
      {icon === 'twitter' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 10.5.5 10.5.5" />
        </svg>
      )}
      {icon === 'linkedin' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )}
      {icon === 'instagram' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <circle cx="17.5" cy="6.5" r="1.5" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="flex gap-1 justify-center items-center">
      <SocialIcon icon="twitter" label="Twitter" />
      <SocialIcon icon="linkedin" label="LinkedIn" />
      <SocialIcon icon="instagram" label="Instagram" />
    </div>
  );
}
