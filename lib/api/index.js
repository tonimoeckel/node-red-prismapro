const raw = require("./raw");

const getPrismaProApiList = (filter) => {

    const list = raw.map((item) => {

        const hrefRegex = /(?<=\"#)(.*?)(?=\")/g
        const targetMatch = item.Target.match(hrefRegex)

        const nameRegex = /(?<=>)(.*?)(?=\<)/g
        const nameMatch = item.Target.match(nameRegex)

        const result = {
            id: item.FIELD1,
            path: targetMatch && targetMatch.length ? targetMatch[0]: null,
            title: item.Title,
            name: nameMatch && nameMatch.length ? nameMatch[0] : null,
            get: item["/get"].includes("accept"),
            set: item["/set"].includes("accept"),
            defaultData: null
        }

        if (result.name === "scanStart"){
            result.defaultData = "1"
        }
        if (result.name === "scanStop"){
            result.defaultData = "1"
        }

        return result
    }).filter((item)=>item.path);

    if (filter){
        if (typeof filter === "string"){
            return list.filter((item) => filter === item.path)
        }
    }

    return list

}

module.exports = getPrismaProApiList
