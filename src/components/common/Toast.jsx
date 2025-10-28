import { useEffect } from 'react';
import { X, Info, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    feature: <Sparkles className="w-5 h-5" />,
  };

  const colors = {
    info: 'from-blue-500 to-cyan-500',
    success: 'from-green-500 to-emerald-500',
    warning: 'from-orange-500 to-amber-500',
    feature: 'from-purple-500 to-pink-500',
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden max-w-sm">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-r ${colors[type]} opacity-20`}></div>
        
        {/* Content */}
        <div className="relative flex items-center gap-3 p-4">
          <div className={`flex-shrink-0 bg-gradient-to-r ${colors[type]} p-2 rounded-xl text-white`}>
            {icons[type]}
          </div>
          
          <p className="flex-1 text-white font-medium text-sm">{message}</p>
          
          <button
            onClick={onClose}
            className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Toast;
