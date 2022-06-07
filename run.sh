docker build -f Dockerfile -t piskvorky .
echo '--------'
docker run -it -p 80:80 piskvorky