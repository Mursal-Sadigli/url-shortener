import { useState, useEffect } from 'react'
import ShortenerForm from './components/ShortenerForm'
import Stats from './components/Stats'

const App = () => {

  const [shortUrl, setShortUrl] = useState(() => localStorage.getItem("shortUrl") || "");
  const [code, setCode] = useState(() => localStorage.getItem("code") || "");

  useEffect(() => {
    localStorage.setItem("shortUrl", shortUrl);
    localStorage.setItem("code", code);
  }, [shortUrl, code]);

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans antialiased text-slate-900'>
      <div className='w-full max-w-lg space-y-6 animate-in fade-in duration-700'>
        <div className='text-center space-y-1'>
          <h1 className='text-3xl font-black tracking-tight text-slate-900'>
            URL Qısaldıcı
          </h1>
          <p className='text-sm text-slate-500 font-medium'>
            Uzun linkləri qısaldın və statistikasını izləyin
          </p>
        </div>
        
        <div className='bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100'>
          <ShortenerForm setShortUrl={setShortUrl} setCode={setCode} />

          {shortUrl && (
            <div className='mt-8 pt-8 border-t border-slate-100 flex flex-col items-center animate-in slide-in-from-bottom-4 duration-500'>
              <p className='text-xs font-bold text-slate-400 uppercase tracking-widest mb-3'>
                Sizin Qısa URL
              </p>
              <a 
                href={shortUrl} 
                target='_blank' 
                rel="noreferrer" 
                className='text-xl text-blue-600 hover:text-blue-700 font-bold break-all transition-all decoration-blue-200 decoration-2 underline-offset-4'
              >
                {shortUrl}
              </a>
            </div>
          )}
        </div>

        {code && (
          <div className='animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150'>
            <Stats code={code} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App