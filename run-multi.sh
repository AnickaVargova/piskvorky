docker build -f Dockerfile.multi -t piskvorkymulti .
echo '--------'
docker run -it -p 80:80 piskvorkymulti