const getPrismaProApiList = require("./index")

describe('API List', function () {
    test("Should get list", ()=> {

        const list = getPrismaProApiList();
        expect(list).toBeTruthy()

    })

    test("Should get serialNumber", ()=> {

        const list = getPrismaProApiList();
        const serialNumber = list.find((item) => item.title === "Serial Number");
        expect(serialNumber).toBeTruthy()
        expect(serialNumber.path).toBeTruthy()
        expect(serialNumber.name).toBeTruthy()
        expect(serialNumber.set).toBeTruthy()
        expect(serialNumber.get).toBeTruthy()

    })
});
