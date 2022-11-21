FROM nginx:latest

RUN mkdir -p /var/www/

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./gui-on-linux.nginx.conf /var/www/gui-on-linux.nginx.conf
COPY ./www/ /var/www/

RUN service nginx start
