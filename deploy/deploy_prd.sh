git pull
docker-compose -p link-shortener -f docker-compose.prd stop
docker-compose -p link-shortener -f docker-compose.prd up -d
