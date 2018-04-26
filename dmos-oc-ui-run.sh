docker rm -f dmos-oc-ui 
docker run -d \
	-e BASEURL=http://192.168.1.74:8818/dmos \
	-e OCURL=https://master237.openshift.dataman:8443 \
	-e OC_VERSION=4 \
	-p 5019:8002 \
	--name="dmos-oc-ui" \
	--restart=always \
	demoregistry.dataman-inc.com/jborg/dmos-oc-ui:1.0.5
