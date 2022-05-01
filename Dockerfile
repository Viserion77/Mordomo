FROM node:16.15.0
COPY ./ .
EXPOSE 3000
CMD ["npm", "start"]
