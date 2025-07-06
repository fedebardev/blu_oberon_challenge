
FROM node:22


WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .


EXPOSE 3000

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
CMD ["./entrypoint.sh"]
