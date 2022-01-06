const { packageDirectoryNames } = require('./packages');
const { execSync } = require('child_process');

packageDirectoryNames.forEach(packageDirectoryName => {
  console.log(packageDirectoryName);
  execSync('cd packages/' + packageDirectoryName + ' && npm pack');
});
