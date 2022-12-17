
let user = '';
const apiGod = new Api (user);

// let objGod = {
//     id: number,
//     name: "string",
//     favorite: true,
//     rate: number,
//     age: number,
//     description: "string",
//     image: "url"
// }






// async/await

const getAllGods = async () => {
    try {
            const res = await apiGod.getAllGods();
            const data = await res.json();
            data.forEach(god => $test.insertAdjacentHTML("beforeend", htmlGod(god)));
        return data;
    } catch (error) {
        alert(`ОШИБКАААА!!!ВОТ ЧТО ПИШУТ: ${error}`);
    }
}

const getAllIdByGods = async () => {
    try {
            const res = await apiGod.getAllIdByGods();
            const data = await res.json();
        return data;
    } catch (error) {
        alert(`ОШИБКАААА!!!ВОТ ЧТО ПИШУТ: ${error}`);
    }
};

const getInfoAboutGodById = async (id) => {
    try {
            const res = await apiGod.getInfoAboutGodById(id);
            const data = await res.json();
        return data;
    } catch (error) {
        alert(`ОШИБКАААА!!!ВОТ ЧТО ПИШУТ: ${error}`);
    }
};

const addGod = async (body) => {
    try {
            const res = await apiGod.addGod(body);
            const data = await res.json();
        return data;
    } catch (error) {
        alert(`ОШИБКАААА!!!ВОТ ЧТО ПИШУТ: ${error}`);
    }
};

const editGodInfo = async (body, id) => {
    try {
            const res = await apiGod.editGodInfo(body, id);
            const data = await res.json();
        return data;
    } catch (error) {
        alert(`ОШИБКАААА!!!ВОТ ЧТО ПИШУТ: ${error}`);
    }    
};

const deleteGodById = async (id) => {
    try {
            const res = await apiGod.deleteGodById(id);
            const data = await res.json();
        return data;
    } catch (error) {
        alert(`ОШИБКАААА!!!ВОТ ЧТО ПИШУТ: ${error}`);
    }
};


