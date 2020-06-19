git pull
docker-compose -p link-shortener -f docker-compose.prd.yml stop
docker-compose -p link-shortener -f docker-compose.prd.yml up -d
