FROM mongo:latest
COPY ./initdb.d/customers.json /customerdata.json
COPY ./initdb.d/products.json /productdata.json
COPY ./init.sh /init.sh
RUN ["chmod", "+x", "init.sh"]
CMD ./init.sh