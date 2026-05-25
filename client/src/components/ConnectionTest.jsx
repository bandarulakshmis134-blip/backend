import { useState } from 'react';

export default function ConnectionTest() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('Click the button to test API connectivity.');

  const handleCheck = async () => {
    setStatus('loading');
    setMessage('Checking connection...');

    try {
      const response = await fetch('/api/status');
      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(`Success: ${data.message}`);
      } else {
        setStatus('error');
        setMessage(`Error: ${data.message || 'Unable to reach API'}`);
      }
    } catch (error) {
      setStatus('error');
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <section className="page-card" style={{ marginTop: '1.5rem' }}>
      <h2>Frontend–Backend Connectivity Test</h2>
      <p>{message}</p>
      <button onClick={handleCheck} disabled={status === 'loading'}>
        {status === 'loading' ? 'Checking…' : 'Check API Connection'}
      </button>
    </section>
  );
}
