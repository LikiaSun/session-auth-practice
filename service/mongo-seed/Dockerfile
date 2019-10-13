FROM mongo:3.6

COPY init.json /init.json
CMD mongoimport --host mongodb --db jwt --collection users --type json --file /init.json --jsonArray