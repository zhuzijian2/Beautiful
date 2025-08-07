import { useEffect, useState } from 'react';

interface MobileOptimizerProps {
  children: React.ReactNode;
}

export default function MobileOptimizer({ children }: MobileOptimizerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // 检测移动设备
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);

    // 检测网络连接速度
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        const isSlow = connection.effectiveType === 'slow-2g' || 
                      connection.effectiveType === '2g' || 
                      connection.effectiveType === '3g';
        setIsSlowConnection(isSlow);
      }
    }

    // 预加载关键资源
    if (isMobileDevice) {
      // 预加载字体图标
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';
      link.as = 'style';
      document.head.appendChild(link);
    }
  }, []);

  // 在慢速网络下显示简化版本
  if (isMobile && isSlowConnection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-6xl mb-4">💕</div>
          <h1 className="text-2xl font-bold text-pink-600 mb-4">情书</h1>
          <p className="text-lg text-pink-700 mb-6">陈梦婷，你愿意做我的恋人吗？</p>
          <div className="flex justify-center gap-4">
            <button className="bg-pink-500 text-white px-6 py-3 rounded-full">
              我愿意 💖
            </button>
          </div>
          <p className="text-sm text-pink-500 mt-4">—— 超级喜欢你的小朱</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
