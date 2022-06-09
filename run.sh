docker build -f Dockerfile -t piskvorky:4 .
echo '--------'
docker run --mount type=bind,source="$(pwd)"/allConfigs/prod.js,target=/usr/share/nginx/html/config.js -it -p 80:80 piskvorky:4
