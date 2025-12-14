import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        authentication: 'src/Authentication/index.ts',
        'user-management': 'src/UserManagement/index.ts',
        user: 'src/User/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: [
        'react',
        'react-dom',
        'jotai',
        '@mui/material',
        '@emotion/react',
        '@emotion/styled',
    ],
});
