import { app, BrowserWindow } from 'electron';
import path from 'path';

const isDev = !app.isPackaged;

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true
		}
	});

	if (isDev) {
		// SvelteKit dev server 주소(기본 5173 포트)
		win.loadURL('http://localhost:5173');
		win.webContents.openDevTools();
	} else {
		// TODO
		// 프로덕션 빌드 시 SvelteKit 빌드 파일을 로드
		// 예: build 후 .svelte-kit/output 폴더 또는 adapter-static 결과물
		// 패키징 과정에서 파일 경로 조정 필요
		win.loadURL(`file://${path.join(__dirname, '../web/build/index.html')}`);
	}
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
