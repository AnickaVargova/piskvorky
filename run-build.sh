docker build -f Dockerfile.build -t piskvorkybuild .
echo '--------'
docker run -v $(pwd)/build:/app/build piskvorkybuild