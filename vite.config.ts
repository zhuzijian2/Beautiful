/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function getPlugins() {
  const plugins = [react(), tsconfigPaths()];
  return plugins;
}

export default defineConfig({
  plugins: getPlugins(),
  base: './', // 使用相对路径
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 React 相关库分离
          'react-vendor': ['react', 'react-dom'],
          // 将动画库分离
          'animation-vendor': ['framer-motion'],
          // 将 UI 库分离
          'ui-vendor': ['sonner', 'clsx', 'tailwind-merge'],
        },
      },
    },
    // 启用 gzip 压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true, // 移除 debugger
      },
    },
    // 优化资源大小
    chunkSizeWarningLimit: 1000,
  },
  // 优化开发服务器
  server: {
    hmr: {
      overlay: false, // 禁用错误覆盖层
    },
  },
});
