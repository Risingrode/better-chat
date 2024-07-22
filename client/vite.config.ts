import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		open: true
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	// define: {
	// 	'process.env': { // 定义开发环境
	// 	NODE_ENV: JSON.stringify(process.env.NODE_ENV)
	// 	}
	// }
});
