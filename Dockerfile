FROM node:18-alpine
WORKDIR /app
RUN apk update && apk add --no-cache tzdata ffmpeg git
ENV TZ Asia/Kolkata
ENV PATH /app/node_modules/.bin:$PATH
RUN npm i -g @nestjs/cli -y
RUN apk add ffmpeg
# Only for development
RUN apk update && apk add --no-cache git