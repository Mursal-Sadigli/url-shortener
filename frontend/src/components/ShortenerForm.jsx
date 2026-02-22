import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../config';

// URL qısaltma forması komponenti

const ShortenerForm = ({ setShortUrl, setCode }) => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        // Yeni sorğu zamanı köhnə nəticələri təmizləyirik
        setShortUrl("");
        setCode("");

        try {
            const response = await axios.post(`${API_URL}/shorten`, { url });
            const { shortUrl } = response.data;
            
            setShortUrl(shortUrl);
            
            // Kod hissəsini URL-dən ayırırıq
            const urlParts = shortUrl.split("/");
            setCode(urlParts[urlParts.length - 1]);
            
            setUrl(""); // Giriş sahəsini təmizləyirik
        } catch (error) {
            const message = error.response?.data?.message || "Xəta baş verdi";
            setError(message);
        }
    };

  return (
    <form onSubmit={handleSubmit} className='w-full space-y-4'>
      <div className='group relative flex flex-col sm:flex-row gap-3'>
        <input 
          type="text" 
          placeholder='Orijinal URL-i bura daxil edin...' 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          className='flex-1 p-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-base shadow-sm'
        />
        <button 
          type='submit' 
          className='px-6 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap text-base'
        >
          Qısalt
        </button>
      </div>
      {error && (
        <div className='bg-red-50 text-red-600 p-3 rounded-xl border border-red-100 flex items-center gap-3 animate-in fade-in zoom-in duration-300'>
          <span className='font-bold opacity-75'>!</span>
          <p className='text-sm font-semibold'>{error}</p>
        </div>
      )}
    </form>
  )
}

export default ShortenerForm
