docker build -f Dockerfile -t annavar/piskvorky:3 .
echo '--------'
docker run -it -p 80:80 annavar/piskvorky:3