import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        auth: 'src/auth/index.ts',
        users: 'src/users/index.ts',
        login: 'src/Login/index.ts',
        'user-management': 'src/UserManagement/index.ts',
        avatar: 'src/Avatar/index.ts',
        'app-bar': 'src/AppBar/index.ts',
    },
    format: ['esm'],
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
