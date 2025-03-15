var zip = require('bestzip');
const fs = require('fs');

// Get browser from command line arguments
const browser = process.argv[2];

if (!browser) {
  console.error('\n❌ Please provide a browser argument: firefox or chromium');
  console.error('\n📖 Usage: node compress-extension.js <browser>');
  process.exit(1);
}

if (browser !== 'firefox' && browser !== 'chromium') {
  console.error('\n❌ Invalid browser. Please specify "firefox" or "chromium"');
  process.exit(1);
}

console.log(`\n🔨 Building for ${browser}...`);

// Copy the appropriate manifest file based on browser selection
const sourceManifest = `./manifest-${browser}.json`;
const targetManifest = './extension/manifest.json';

try {
  fs.copyFileSync(sourceManifest, targetManifest);
  console.log(`\n📝 Copied ${sourceManifest} to ${targetManifest}`);
} catch (err) {
  console.error(`\n❌ Error copying manifest file: ${err}`);
  process.exit(1);
}

// Get manifest version
const manifestPath = './extension/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const envVars = JSON.parse(fs.readFileSync('./.env.json', 'utf8'));

console.log("\n⏳ Getting API URLs from environments...");
const api_taxes = envVars.IMPUESTITO_API_URL || "";
const api_gamepass = envVars.XBOX_STORE_API_URL || "";


if (api_taxes !== "" || api_gamepass !== "") {
  console.log("\n📕 Current manifest version:", manifest.version);
  console.log("\n⏳ Setting API URLs...");
  console.log("📝 IMPUESTITO_API_URL:", api_taxes);
  console.log("📝 XBOX_STORE_API_URL:", api_gamepass);
  manifest.web_accessible_resources[0].resources = [api_taxes, api_gamepass];
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log("✅ API URLs updated");
} else {
  console.error("\n❌ API URLs not found in .env file");
  process.exit(1);
}


console.log("\n📦 Compressing extension (.zip)...");
zip({
  cwd: 'extension/',
  source: '*',
  destination: `../builds/impuestito-extension-v${manifest.version}-${browser}.zip`
}).then(function() {
  console.log('✅ Extension compressed successfully!');
}).catch(function(err) {
  console.error('❌ Error compressing extension:', err.stack);
  process.exit(1);
});
