import { CommonEngine } from '@angular/ssr/node';
import { APP_BASE_HREF } from '@angular/common';
import { USER_THEME } from './app/tokens/user-theme.token';
import bootstrap from './main.server';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const commonEngine = new CommonEngine();

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

export async function netlifyCommonEngineHandler(request: Request): Promise<Response> {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies: Record<string, string> = Object.fromEntries(
    cookieHeader
      .split(';')
      .map(c => c.trim().split('='))
      .filter(([k, v]) => k && v)
  );

  const userTheme = cookies['user-theme'] || 'bocchi';

  const url = new URL(request.url);

  try {
    const html = await commonEngine.render({
      bootstrap,
      documentFilePath: indexHtml,
      url: url.pathname,
      publicPath: browserDistFolder,
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: USER_THEME, useValue: userTheme }
      ]
    });

    return new Response(html, {
      headers: { 'content-type': 'text/html' }
    });
  } catch (error: any) {
    return new Response(error?.message || 'Server Error', { status: 500 });
  }
}
