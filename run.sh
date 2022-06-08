docker build -f Dockerfile --build-arg player=O --build-arg background=\#00FF11 --build-arg size=8 -t piskvorky:4 .
echo '--------'
docker run -it -p 80:80 piskvorky:4