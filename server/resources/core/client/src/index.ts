import '@abraham/reflection';
import { createAppBuilder } from '@altv-mango/client';
import alt from "alt-client";
import { RootModule } from './root.module';
import { MAIN_WEBVIEW } from '@shared/constants';

const appBuilder = await createAppBuilder();
const app = await appBuilder.addWebView(MAIN_WEBVIEW, { url: 'http://localhost:5173', visible: true }).build();
alt.showCursor(true)
await app.start(RootModule);
 