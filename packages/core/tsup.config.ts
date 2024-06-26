import { defineConfig } from 'tsup';
// import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import packageJson from './package.json';

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/app/index.ts',
        'src/app/constants/index.ts',
        'src/app/controller/index.ts',
        'src/app/enums/index.ts',
        'src/app/interfaces/index.ts',
        'src/app/module/index.ts',
        'src/app/module-tree/index.ts',
        'src/app/pipeline/index.ts',
        'src/app/services/index.ts',
        'src/app/utils/index.ts',
        'src/constants/index.ts',
        'src/decorators/index.ts',
        'src/enums/index.ts',
        'src/errors/index.ts',
        'src/interfaces/index.ts',
        'src/pipes/index.ts',
        'src/schemas/index.ts',
        'src/services/index.ts',
        'src/types/index.ts',
        'src/utils/index.ts',
    ],
    splitting: true,
    sourcemap: 'inline',
    clean: false,
    format: 'esm',
    outDir: 'dist',
    bundle: true,
    minify: false,
    external: [...Object.keys(packageJson.dependencies), 'alt-shared'],
    noExternal: Object.keys(packageJson.devDependencies),
    // esbuildPlugins: [polyfillNode()],
});
