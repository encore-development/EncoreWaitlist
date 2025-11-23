'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to join waitlist');
      }

      setIsSuccess(true);
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to join waitlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 animate-fade-in" style={{ animationDuration: '600ms' }}>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 border border-green-500">
          <Check className="w-6 h-6 text-green-500" />
        </div>
        <p className="font-poppins text-white text-center" style={{ fontSize: '14px' }}>
          Thank you for joining
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center" style={{ gap: '8px' }}>
      <div className="w-full flex items-center justify-center px-4" style={{ gap: '8px', maxWidth: '100%' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={isLoading}
          className="font-poppins px-4 rounded-full text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/50 transition-colors flex-1"
          style={{
            fontSize: '11px',
            height: '40px',
            backgroundColor: '#000000'
          }}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="font-poppins font-semibold bg-white text-black hover:bg-white/90 rounded-full transition-all flex items-center justify-center flex-shrink-0"
          style={{
            fontSize: '13px',
            height: '40px',
            padding: '0 24px'
          }}
        >
          {isLoading ? 'Joining...' : 'Join waitlist'}
        </Button>
      </div>
    </form>
  );
}
