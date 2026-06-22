const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd, opts = {}) {
    console.log('>', cmd);
    execSync(cmd, { stdio: 'inherit', ...opts });
}

try {
    const clientDir = path.resolve(__dirname, '..', '..', 'client');
    if (!fs.existsSync(clientDir)) {
        console.log('client folder not found, skipping client build');
        process.exit(0);
    }

    process.chdir(clientDir);

    // try pnpm, fallback to npm
    try {
        run('corepack enable || true');
        run('corepack prepare pnpm@latest --activate || true');
        run('pnpm install --frozen-lockfile');
        run('pnpm run build');
    } catch (err) {
        console.warn('pnpm build failed, falling back to npm');
        run('npm install --legacy-peer-deps');
        run('npm run build');
    }

    const distDir = path.join(clientDir, 'dist');
    const targetDir = path.resolve(__dirname, '..', 'public');

    if (!fs.existsSync(distDir)) {
        console.warn('dist directory not found after build');
        process.exit(0);
    }

    // ensure target dir exists
    fs.rmSync(targetDir, { recursive: true, force: true });
    fs.mkdirSync(targetDir, { recursive: true });

    // copy files
    run(`cp -a "${distDir}/." "${targetDir}/"`);

    console.log('client build copied to backend/public');
} catch (err) {
    console.error('build-client script failed', err);
    process.exit(1);
}
