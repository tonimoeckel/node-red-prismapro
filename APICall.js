const ClientNode = require("./client");
const getPrismaProApiList = require("./lib/api");

module.exports = function (RED) {

    RED.httpNode.get("/prismapro/api",(req, res) => {
        res.json(getPrismaProApiList())
    })

    RED.nodes.registerType("prismapro-client", ClientNode(RED), {});

    function APICallNode(config) {

        RED.nodes.createNode(this, config);
        var node = this;
        const client = RED.nodes.getNode(config.client);
        node.config = {
            client,
        };

        node.on('input', function (msg) {

            let path = config.path;
            if (config.pathType === "msg"){
                path = msg[config.path];
            }

            let mode = config.mode;
            if (config.modeType === "msg"){
                mode = msg[config.mode];
            }

            let data = config.data;
            if (config.dataType === "msg"){
                data = msg[config.data];
            }

            if (!data || !data.length) {
                const apiCalls = getPrismaProApiList(path)
                if (apiCalls && apiCalls.length){
                    const apiCall = apiCalls[0];
                    if (apiCall.defaultData) data = apiCall.defaultData;
                }
            }

            let url = path+"/"+mode
            if (data){
                url = url + "?" + data;
            }

            node.config.client.sendRequest(url).then((res) => {
                return res.json();
            })
                .then((res) => {
                    msg.payload = res;
                    node.send(msg);
                })
                .catch((err) => {
                node.log(err);
            })

        });
    }
    RED.nodes.registerType("prismapro-apicall", APICallNode);
}
