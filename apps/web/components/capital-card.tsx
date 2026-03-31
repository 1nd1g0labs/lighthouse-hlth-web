import { ArrowUpRight } from 'lucide-react';

export function CapitalCard() {
  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute left-[10%] top-[20%] h-[60%] w-[80%] rounded-full bg-primary/15 blur-3xl" />

      {/* Glass card */}
      <div className="relative rounded-2xl border border-white/60 bg-white/55 p-5 shadow-lg backdrop-blur-xl sm:p-6">
        {/* Chart */}
        <div className="mb-4 rounded-xl bg-white p-4 shadow-sm">
          <svg
            viewBox="0 0 300 100"
            className="h-auto w-full"
            role="img"
            aria-label="Capital margin projection chart showing growth from 2024 to 2030, reaching 1.6 million dollars cumulative margin"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="capital-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#0d9488" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <path
              d="M0,85 C30,80 60,70 90,60 C120,50 150,35 180,28 C210,20 240,15 270,10 L300,5 L300,100 L0,100 Z"
              fill="url(#capital-fill)"
            />
            <path
              d="M0,85 C30,80 60,70 90,60 C120,50 150,35 180,28 C210,20 240,15 270,10 L300,5"
              fill="none"
              stroke="#0d9488"
              strokeWidth={2}
            />
            <circle cx={0} cy={85} r={3} fill="#0d9488" />
            <circle cx={60} cy={70} r={3} fill="#0d9488" />
            <circle cx={120} cy={50} r={3} fill="#0d9488" />
            <circle cx={180} cy={28} r={3} fill="#0d9488" />
            <circle cx={240} cy={15} r={3} fill="#0d9488" />
            <circle cx={300} cy={5} r={3} fill="#0d9488" />
          </svg>
          <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400">
            <span>2024</span><span>2025</span><span>2026</span><span>2027</span><span>2028</span><span>2029</span><span>2030</span>
          </div>
          <p className="mt-2 text-right text-xs text-gray-500">
            → $1.6M cumulative margin by 2030
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium text-gray-400">Lighthouse HLTH</p>
            <p className="text-[15px] font-bold tracking-tight text-navy">
              Capital Decision Intelligence
            </p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy">
            <ArrowUpRight size={16} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
