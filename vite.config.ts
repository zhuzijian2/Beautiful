/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import autoprefixer from "autoprefixer";

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
        // 优化文件名，减少长度
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // 启用更激进的压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true, // 移除 debugger
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // 移除更多调试代码
        passes: 2, // 多次压缩
      },
      mangle: {
        toplevel: true, // 混淆顶级变量名
      },
    },
    // 优化资源大小
    chunkSizeWarningLimit: 500, // 降低警告阈值
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 优化资源内联阈值
    assetsInlineLimit: 4096, // 4KB 以下的资源内联
  },
  // 优化开发服务器
  server: {
    hmr: {
      overlay: false, // 禁用错误覆盖层
    },
  },
  // 优化 CSS 处理
  css: {
    postcss: {
      plugins: [
        // 添加 autoprefixer 确保兼容性
        autoprefixer,
      ],
    },
  },
});
