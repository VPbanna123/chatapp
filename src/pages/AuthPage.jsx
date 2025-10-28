// import { useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Login from '../components/auth/Login';
// import Signup from '../components/auth/Signup';
// import { MessageCircle, Sparkles } from 'lucide-react';

// const AuthPage = () => {
//   const { isAuthenticated } = useAuth();
//   const [showLogin, setShowLogin] = useState(true);

//   if (isAuthenticated) {
//     return <Navigate to="/chat" replace />;
//   }

//   return (
//     <div className="fixed inset-0 h-screen w-screen bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 overflow-y-auto">
//       {/* Animated Background Decorations */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
//         <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Main Content Container */}
//       <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 py-8">
//         {/* Header Section */}
//         <div className="text-center mb-6 sm:mb-8 px-4 w-full">
//           <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
//             <div className="bg-white bg-opacity-20 backdrop-blur-lg p-2.5 sm:p-3 md:p-4 rounded-2xl border border-white border-opacity-30 shadow-2xl">
//               <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" strokeWidth={2.5} />
//             </div>
//             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
//               ChatApp
//             </h1>
//             <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-300 animate-pulse" />
//           </div>
//           <p className="text-purple-100 text-sm sm:text-base md:text-lg font-medium drop-shadow-md">
//             Connect • Chat • Communicate
//           </p>
//           <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-white text-xs sm:text-sm opacity-90">
//             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//             <span>Real-time messaging platform</span>
//           </div>
//         </div>

//         {/* Auth Form Container */}
//         <div className="w-full max-w-md mb-6 sm:mb-8">
//           {showLogin ? (
//             <Login onToggle={() => setShowLogin(false)} />
//           ) : (
//             <Signup onToggle={() => setShowLogin(true)} />
//           )}
//         </div>

//         {/* Footer Features */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-3xl px-4 mb-6">
//           <div className="text-center bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white border-opacity-20">
//             <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🔒</div>
//             <h3 className="text-white font-semibold text-sm sm:text-base mb-0.5 sm:mb-1">Secure</h3>
//             <p className="text-purple-100 text-xs">End-to-end encrypted</p>
//           </div>
//           <div className="text-center bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white border-opacity-20">
//             <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">⚡</div>
//             <h3 className="text-white font-semibold text-sm sm:text-base mb-0.5 sm:mb-1">Fast</h3>
//             <p className="text-purple-100 text-xs">Real-time messaging</p>
//           </div>
//           <div className="text-center bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white border-opacity-20">
//             <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🌐</div>
//             <h3 className="text-white font-semibold text-sm sm:text-base mb-0.5 sm:mb-1">Global</h3>
//             <p className="text-purple-100 text-xs">Connect worldwide</p>
//           </div>
//         </div>

//         {/* Bottom Text */}
//         <p className="text-center text-white text-xs sm:text-sm opacity-80 px-4">
//           © 2025 ChatApp. All rights reserved.
//         </p>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AuthPage;
// import { useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Login from '../components/auth/Login';
// import Signup from '../components/auth/Signup';

// const AuthPage = () => {
//   const { isAuthenticated } = useAuth();
//   const [showLogin, setShowLogin] = useState(true);

//   if (isAuthenticated) {
//     return <Navigate to="/chat" replace />;
//   }

//   return (
//     <div className="fixed inset-0 h-screen w-screen bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 flex items-center justify-center p-4 overflow-hidden">
//       {/* Auth Form Container */}
//       <div className="w-full max-w-md">
//         {showLogin ? (
//           <Login onToggle={() => setShowLogin(false)} />
//         ) : (
//           <Signup onToggle={() => setShowLogin(true)} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthPage;
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import { MessageCircle, Sparkles, Zap, Heart } from 'lucide-react';

const AuthPage = () => {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600 flex items-center justify-center overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        
        {/* Floating Icons */}
        <Sparkles className="absolute top-20 left-20 w-8 h-8 text-white/20 animate-float" />
        <MessageCircle className="absolute top-40 right-32 w-12 h-12 text-white/20 animate-float animation-delay-2000" />
        <Zap className="absolute bottom-32 left-40 w-10 h-10 text-white/20 animate-float animation-delay-3000" />
        <Heart className="absolute bottom-20 right-20 w-8 h-8 text-white/20 animate-float animation-delay-4000" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-4 sm:py-6">
        
        {/* Logo & Title - Fixed at top */}
        <div className="text-center mb-4 sm:mb-5">
          <div className="flex items-center justify-center mb-2 sm:mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-60"></div>
              <div className="relative bg-white/20 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/30">
                <MessageCircle className="w-7 h-7 sm:w-9 sm:h-9 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1.5 sm:mb-2 drop-shadow-lg">
            Welcome to ChatApp
          </h1>
          <p className="text-white/90 text-xs sm:text-sm font-medium">
            Connect, chat, and share moments
          </p>
        </div>

        {/* Auth Form Container */}
        <div className="w-full">
          {showLogin ? (
            <div key="login" className="animate-fadeIn">
              <Login onToggle={() => setShowLogin(false)} />
            </div>
          ) : (
            <div key="signup" className="animate-fadeIn">
              <Signup onToggle={() => setShowLogin(true)} />
            </div>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="text-center mt-4 sm:mt-5">
          <p className="text-white/70 text-xs sm:text-sm">
            By continuing, you agree to our{' '}
            <span className="underline cursor-pointer hover:text-white transition-colors">Terms</span>
            {' '}&{' '}
            <span className="underline cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
