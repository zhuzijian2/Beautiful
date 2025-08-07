import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { toast } from 'sonner';

// 爱心动画组件
const FloatingHeart = ({ 
  style, 
  sizeIndex, 
  colorIndex 
}: { 
  style: React.CSSProperties,
  sizeIndex: number,
  colorIndex: number
}) => {
  const heartVariants: Variants = {
    float: {
      y: [0, -20, 0],
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };
  
  const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl'];
  const colors = ['text-red-400', 'text-pink-400', 'text-rose-400', 'text-fuchsia-400'];
  
  return (
    <motion.i
      className={`fa-solid fa-heart absolute ${sizes[sizeIndex]} ${colors[colorIndex]}`}
      style={{ ...style, zIndex: 0 }}
      variants={heartVariants}
      animate="float"
      initial={{ opacity: 0 }}
    />
  );
};

// 打字效果hook
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);
  
  return { displayText, isComplete };
};



export default function LoveConfessionPage() {
  const [showHearts, setShowHearts] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [message, setMessage] = useState("");
  const [rejectBtnScale, setRejectBtnScale] = useState(1); // 再考虑一下按钮缩放比例
  const [acceptBtnScale, setAcceptBtnScale] = useState(1); // 我愿意按钮缩放比例
  const heartContainerRef = useRef<HTMLDivElement>(null);
  
  // 爱心接口定义
  interface Heart {
    id: number;
    left: number;
    top: number;
    size: number;
    colorIndex: number;
    delay: number;
  }
  
  // 爱心状态管理
  const [hearts, setHearts] = useState<Heart[]>([]);
  
  // 表白文本
  const confessionText = "陈梦婷，你愿意做我的恋人吗？";
  
  // 打字效果
  const { displayText, isComplete } = useTypewriter(confessionText);
  
  // 创建漂浮爱心背景
  useEffect(() => {
    // 生成爱心数据
    const generateHearts = (count: number): Heart[] => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.floor(Math.random() * 4), // 0-3对应不同大小
        colorIndex: Math.floor(Math.random() * 4), // 0-3对应不同颜色
        delay: Math.random() * 5
      }));
    };
    
    if (showHearts) {
      setHearts(generateHearts(20));
    } else {
      setHearts([]);
    }
  }, [showHearts]);
  
  // 接受表白处理
  const handleAccept = () => {
    setAccepted(true);
    setShowConfetti(true);
    toast.success("太棒了！我会永远爱你！");
    
    // 3秒后显示额外惊喜
    setTimeout(() => {
      setMessage("这是我们的专属回忆，永远珍藏 ❤️");
    }, 3000);
  };
  
   // 拒绝表白处理
  const handleReject = () => {
    // 让拒绝按钮逃跑的有趣效果
    const rejectButton = document.getElementById('reject-btn');
    if (rejectButton) {
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 50;
      
      const randomX = Math.floor(Math.random() * maxX);
      const randomY = Math.floor(Math.random() * maxY);
      
      rejectButton.style.position = 'absolute';
      rejectButton.style.left = `${randomX}px`;
      rejectButton.style.top = `${randomY}px`;
      
      toast.info("再考虑一下嘛~ 😊");
    }
    
    // 更新按钮大小：再考虑一下按钮变小，我愿意按钮变大
    setRejectBtnSize(prev => Math.max(0, prev - 0.15)); // 每次点击减小15%，最小为0
    setAcceptBtnSize(prev => Math.min(1.5, prev + 0.1)); // 每次点击增大10%，最大为150%
  };
  
  // 按钮大小状态
  const [rejectBtnSize, setRejectBtnSize] = useState(1); // 1 = 100% 大小
  const [acceptBtnSize, setAcceptBtnSize] = useState(1);
  
  // 页面加载时启动爱心背景
  useEffect(() => {
    setShowHearts(true);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 overflow-hidden relative">
      {/* 爱心背景容器 */}
       {/* 爱心背景容器 */}
       <div ref={heartContainerRef} className="fixed inset-0 pointer-events-none">
         {hearts.map(heart => (
           <FloatingHeart 
             key={heart.id} 
             style={{ 
               left: `${heart.left}vw`, 
               top: `${heart.top}vh`,
               animationDelay: `${heart.delay}s`
             }}
             sizeIndex={heart.size}
             colorIndex={heart.colorIndex}
           />
         ))}
       </div>
      
      {/* 顶部装饰 */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-pink-200/50 to-transparent"></div>
      
      {/* 页面内容 */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-2xl">
        {/* 标题 */}
        <header className="text-center mb-10 mt-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500 mb-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            情书
          </motion.h1>
          <motion.p 
            className="text-pink-600 text-lg italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            一封特别的信，只给特别的你
          </motion.p>
        </header>
        
        {/* 情书卡片 */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-pink-200 mb-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* 装饰元素 */}
          <div className="absolute -right-12 -bottom-12 text-9xl opacity-5 text-pink-300">
            <i className="fa-solid fa-heart"></i>
          </div>
          
          {/* 情书内容 */}
          <div className="relative z-10">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
            </div>
            
           <p className="text-pink-800 text-2xl leading-relaxed mb-6 min-h-[200px] text-center">
              {displayText}
              {!isComplete && (
                <span className="animate-pulse">|</span>
              )}
            </p>
            

              
              <div className="flex justify-center mb-4">
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
              </div>
              
              {/* 署名 */}
            <p className="text-right text-pink-600 italic">
              —— 超级喜欢你的小朱^_^
            </p>
          </div>
        </motion.div>
        
        {/* 互动按钮 */}
        <AnimatePresence>
          {isComplete && !accepted && (
            <motion.div 
              className="flex justify-center gap-6 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
               <button 
                 id="reject-btn"
                 onClick={handleReject}
                 className="bg-white hover:bg-pink-50 text-pink-700 px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl border border-pink-200 text-lg font-medium"
                 style={{ 
                   transform: `scale(${rejectBtnSize})`,
                   opacity: rejectBtnSize,
                   pointerEvents: rejectBtnSize > 0 ? 'auto' : 'none',
                   transition: 'transform 0.3s ease, opacity 0.3s ease'
                 }}
               >
                 <i className="fa-regular fa-heart"></i>
                 再考虑一下
               </button>
              
               <button 
                 onClick={handleAccept}
                 className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl text-lg font-medium"
                 style={{ 
                   transform: `scale(${acceptBtnSize})`,
                   transition: 'transform 0.3s ease'
                 }}
               >
                 <i className="fa-solid fa-heart"></i>
                 我愿意
               </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* 接受后的消息 */}
        <AnimatePresence>
          {accepted && (
            <motion.div 
              className="text-center mt-10 p-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl text-white shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4">❤️ 太好了！❤️</h3>
              <p className="text-lg mb-4">陈梦婷，谢谢你接受我的表白！！！</p>
              <p className="text-lg italic">{message}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* 爱心雨效果 */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(100)].map((_, i) => (
              <motion.i
                key={i}
                className="fa-solid fa-heart absolute text-red-500"
                style={{
                  left: `${Math.random() * 100}vw`,
                  top: `-${Math.random() * 20 + 10}px`,
                  fontSize: `${Math.random() * 16 + 12}px`,
                  opacity: Math.random() * 0.8 + 0.2
                }}
                initial={{ opacity: 0 }}
                animate={{
                  y: "100vh",
                  opacity: [0, 1, 0.8, 0],
                  rotate: [0, Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1)]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  ease: "ease-in-out"
                }}
              />
            ))}
          </div>
        )}
        
        {/* 页脚 */}
        <footer className="text-center mt-16 text-pink-500 text-sm">
          <p>© {new Date().getFullYear()} 专属表白网页</p>
          <p className="mt-1">愿我们的故事，从这里开始</p>
        </footer>
      </div>
    </div>
  );
}