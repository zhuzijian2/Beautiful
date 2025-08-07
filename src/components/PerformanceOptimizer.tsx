import { useEffect, useState } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

export default function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWeChat, setIsWeChat] = useState(false);

  useEffect(() => {
    // 检测是否在微信环境中
    const isWeChatBrowser = /MicroMessenger/i.test(navigator.userAgent);
    setIsWeChat(isWeChatBrowser);

    // 在微信环境中，延迟加载以优化性能
    if (isWeChatBrowser) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100); // 短暂延迟，让微信浏览器准备就绪
      
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
    }
  }, []);

  // 在微信环境中显示加载提示
  if (isWeChat && !isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <i className="fa-solid fa-heart text-4xl text-pink-500 mb-4"></i>
          </div>
          <p className="text-pink-600 text-lg">正在准备浪漫时刻...</p>
          <p className="text-pink-400 text-sm mt-2">请稍候</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
