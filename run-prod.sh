docker build -f Dockerfile.prod -t piskvorkyprod .
echo '--------'
docker run -it -p 80:80 piskvorkyprod