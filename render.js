function setRender(page, obj = page, key = "data", keys = "") {
    var data = obj[key];
    Object.keys(data).forEach(childKey => {
        if (data[childKey] != null && typeof data[childKey] === "object") {
            var childKeys;
            if (Array.isArray(data)) {
                childKeys = keys + "[" + childKey + "]";
            } else {
                childKeys = keys + "." + childKey;
            }
            this.setRender(page, data, childKey, childKeys);
        }
        obj[key] = new Proxy(data, {
            get: function (childObj, childKey) {
                return childObj[childKey];
            },
            set: function (childObj, childKey, value) {
                if (childObj[childKey] !== value) {
                    if (Array.isArray(childObj[childKey])) {
                        if (Array.from(childObj[childKey]).toString() == value.toString()) {
                            return true;
                        }
                    } else if (Object.prototype.toString.call(childObj[childKey]) == '[object Object]') {
                        if (JSON.stringify(childObj[childKey]) == JSON.stringify(value)) {
                            return true;
                        }
                    }
                    let temp = {};
                    let setKey = "";
                    childObj[childKey] = value;
                    if (Array.isArray(childObj)) {
                        if (childKey == "length") {
                            setKey = keys.substring(1, keys.length);
                            temp[setKey] = childObj;
                            page.setData(temp);
                            return true;
                        } else {
                            setKey = keys + "[" + childKey + "]";
                        }
                    } else {
                        setKey = keys + "." + childKey;
                    }
                    setKey = setKey.substring(1, setKey.length);
                    temp[setKey] = value;
                    page.setData(temp);
                }
                return true;
            }
        });
    })
}

module.exports = {
    setRender: setRender
}