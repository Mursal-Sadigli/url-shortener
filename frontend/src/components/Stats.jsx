import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_URL } from '../config'


const Stats = ({code}) => {
    const [stats, setStats] = useState(null)

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${API_URL}/stats/${code}`);
            setStats(response.data);
        } catch (error) {
            if (error.response?.status === 404) {
                setStats(null); // Link tapılmadıqda bölməni gizlədirik
            }
            console.log("Statistika tapılmadı (404) və ya server xətası.");
        }
    };

  useEffect(() => {
    fetchStats();
  }, [code]);

  if (!stats) return null;

  return (
    <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/40 space-y-5'>
      <div className='flex items-center justify-between border-b border-slate-50 pb-4'>
        <div className='flex items-center gap-3'>
          <h3 className='text-lg font-bold text-slate-900'>Link Statistikası</h3>
          <button 
            onClick={fetchStats}
            className='p-1.5 hover:bg-slate-50 rounded-lg text-blue-600 transition-colors group'
            title="Statistikanı yenilə"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-active:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <div className='flex items-center gap-2 px-2.5 py-1 bg-green-50 text-green-600 rounded-full border border-green-100'>
          <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
          <span className='text-[9px] font-black uppercase tracking-wider'>Aktual</span>
        </div>
      </div>
      
      <div className='grid grid-cols-2 gap-6'>
        <div className='space-y-1'>
          <p className='text-[9px] font-bold text-slate-400 uppercase tracking-widest'>Toplam Klik</p>
          <p className='text-3xl font-black text-slate-900 tracking-tight'>{stats.totalClicks}</p>
        </div>
        <div className='space-y-1'>
          <p className='text-[9px] font-bold text-slate-400 uppercase tracking-widest'>Son 24 Saat</p>
          <p className='text-3xl font-black text-blue-600 tracking-tight'>{stats.last24Clicks}</p>
        </div>
      </div>

      <div className='pt-5 border-t border-slate-50'>
        <p className='text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5'>Orijinal Ünvan</p>
        <div className='p-3 bg-slate-50 rounded-xl border border-slate-100'>
          <p className='text-[11px] text-slate-500 font-medium break-all italic leading-relaxed'>
            {stats.originalUrl}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Stats
