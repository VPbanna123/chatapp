// import { useState } from 'react';
// import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { isValidEmail } from '../../utils/helper';
// import Loader from '../common/Loader';

// const Login = ({ onToggle }) => {
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!isValidEmail(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     const result = await login(formData);
//     setLoading(false);

//     if (!result.success) {
//       setErrors({ submit: result.message });
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-center">
//         <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
//         <p className="text-purple-100">Sign in to continue</p>
//       </div>

//       {/* Form */}
//       <div className="p-8">
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl ${
//                   errors.email ? 'border-red-500' : 'border-gray-200 focus:border-purple-500'
//                 } focus:outline-none focus:ring-4 focus:ring-purple-100`}
//                 placeholder="you@example.com"
//               />
//             </div>
//             {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl ${
//                   errors.password ? 'border-red-500' : 'border-gray-200 focus:border-purple-500'
//                 } focus:outline-none focus:ring-4 focus:ring-purple-100`}
//                 placeholder="••••••••"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//             {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
//           </div>

//           {errors.submit && (
//             <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
//               <p className="text-red-700 text-sm">{errors.submit}</p>
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl disabled:opacity-50"
//           >
//             {loading ? <Loader size="sm" /> : 'Sign In'}
//           </button>
//         </form>

//         {/* Toggle */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             Don't have an account?{' '}
//             <button onClick={onToggle} className="text-purple-600 font-bold hover:underline">
//               Sign Up
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail } from '../../utils/helper';
import Loader from '../common/Loader';

const Login = ({ onToggle }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const result = await login(formData);
    setLoading(false);

    if (!result.success) {
      setErrors({ submit: result.message });
    }
  };

  return (
    <div className="relative w-full">
      {/* Glassmorphism Container */}
      <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        
        {/* Gradient Header */}
        <div className="relative bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm px-5 sm:px-7 py-5 sm:py-6 border-b border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Welcome Back!</h2>
            <p className="text-white/80 text-xs sm:text-sm">Sign in to continue your journey</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-5 sm:px-7 py-5 sm:py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-white font-semibold mb-2 text-sm">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-white/60" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-md border-2 ${
                      errors.email ? 'border-red-400' : 'border-white/30 focus:border-white/50'
                    } rounded-xl text-white placeholder-white/50 focus:outline-none transition-all`}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              {errors.email && (
                <p className="mt-2 text-xs text-red-300 bg-red-500/20 px-3 py-1.5 rounded-lg">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white font-semibold mb-2 text-sm">Password</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-white/60" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3 bg-white/20 backdrop-blur-md border-2 ${
                      errors.password ? 'border-red-400' : 'border-white/30 focus:border-white/50'
                    } rounded-xl text-white placeholder-white/50 focus:outline-none transition-all`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="mt-2 text-xs text-red-300 bg-red-500/20 px-3 py-1.5 rounded-lg">{errors.password}</p>
              )}
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-xl">
                <p className="text-red-200 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mt-2"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? <Loader size="sm" /> : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/60 text-sm">or</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Toggle to Signup */}
          <div className="text-center">
            <p className="text-white/80 text-sm">
              Don't have an account?{' '}
              <button 
                onClick={onToggle} 
                className="text-white font-bold hover:underline underline-offset-4 transition-all"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
