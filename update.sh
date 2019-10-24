echo "Fetching new tags"
git fetch --tags --quiet

yourVersion=$(git describe --abbrev=0 --tags)
latestVersion=$(git describe --tags `git rev-list --tags --max-count=1`)

echo "Your version: ${yourVersion}"
echo "Latest version: ${latestVersion}"

echo "Checking out the latest version"
git checkout $latestVersion

echo "Jaydon: installing dependencies"
yarn install

echo "Jaydon: building React app"
yarn build

echo "Jaydon: restarting server with PM2"
pm2 restart jaydon
