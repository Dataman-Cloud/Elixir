sed -i "s#BASEURL#$BASEURL#g" /etc/dist/dataman-ui/conf.js 
sed -i "s#OCURL#$OCURL#g" /etc/dist/dataman-ui/conf.js
sed -i "s#OC_VERSION#$OC_VERSION#g" /etc/dist/dataman-ui/conf.js

nginx -g "daemon off;"
