import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

// 懒加载组件
const Home = lazy(() => import("@/pages/Home"));

// 加载组件
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
      <p className="text-pink-600">加载中...</p>
    </div>
  </div>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <PerformanceOptimizer>
      <AuthContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, logout }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
          </Routes>
        </Suspense>
      </AuthContext.Provider>
    </PerformanceOptimizer>
  );
}
