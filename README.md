
## Running the application
### Locally
- Build the image: `docker-compose build`
- Run the container: `docker-compose up -d`

### Production
- Build the image: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml build`
- Run the container: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`
