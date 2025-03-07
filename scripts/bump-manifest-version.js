const fs = require('fs');

const getManifestVersion = (browser) => {
  try {
    const manifestPath = `./manifest-${browser}.json`
    const manifestChromium = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return manifestChromium.version;
  } catch (err) {
    console.error(`Error reading manifest-${browser}.json:`, err);
    process.exit(1);
  }
};

const versionChromium = getManifestVersion('chromium');
const versionFirefox = getManifestVersion('firefox');

const bumpManifestVersion = (browser) => {
  try {
    const manifestPath = `./manifest-${browser}.json`
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const currentVersion = manifest.version;
    const versionParts = currentVersion.split('.');
    versionParts[versionParts.length - 1] = parseInt(versionParts[versionParts.length - 1]) + 1;
    const newVersion = versionParts.join('.');
    manifest.version = newVersion;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`Bumped version from ${currentVersion} -> ${newVersion}`);
  } catch (err) {
    console.error('Error bumping manifest version:', err);
    process.exit(1);
  }
};

bumpManifestVersion('chromium');
bumpManifestVersion('firefox');