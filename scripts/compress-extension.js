var zip = require('bestzip');
const fs = require('fs');

// Get browser from command line arguments
const browser = process.argv[2];

if (!browser) {
  console.error('Please provide a browser argument: firefox or chromium');
  console.error('Usage: node compress-extension.js <browser>');
  process.exit(1);
}

if (browser !== 'firefox' && browser !== 'chromium') {
  console.error('Invalid browser. Please specify "firefox" or "chromium"');
  process.exit(1);
}

console.log(`Building for ${browser}...`);

// Copy the appropriate manifest file based on browser selection
const sourceManifest = `./manifest-${browser}.json`;
const targetManifest = './extension/manifest.json';

try {
  fs.copyFileSync(sourceManifest, targetManifest);
  console.log(`Copied ${sourceManifest} to ${targetManifest}`);
} catch (err) {
  console.error(`Error copying manifest file: ${err}`);
  process.exit(1);
}

// Get manifest version
const manifestPath = './extension/manifest.json';

const getManifestVersion = () => {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return manifest.version;
  } catch (err) {
    console.error('Error reading manifest.json:', err);
    process.exit(1);
  }
};

const version = getManifestVersion();
console.log('Getting version:', version);

zip({
  cwd: 'extension/',
  source: '*',
  destination: `../builds/impuestito-extension-v${version}-${browser}.zip`
}).then(function() {
  console.log('all done!');
}).catch(function(err) {
  console.error(err.stack);
  process.exit(1);
});
