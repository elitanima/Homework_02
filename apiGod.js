
class Api {
    constructor (user){
        this.url = `https://cats.petiteweb.dev/api/single/${user}/`;
        this.user = user;
    }
// получить всех Богов
    getAllGods() {
        return fetch(`${this.url}show`);
        }
// получить ID  всех Богов
    getAllIdByGods() {
        return fetch(`${this.url}ids`);
    }
//получить информацию про Бога по ID
    getInfoAboutGodById(id) {
        return fetch(`${this.url}show/${id}`);
    }
//добавить Бога
    addGod(bodyOfGod) {
        return fetch(`${this.url}add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(bodyOfGod)
        });
    }
//редактировать информацию о Боге по ID
    editGodInfo(body, id) {
        return fetch (`${this.url}update/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(body)
    });
    }
//Удалить Бога по ID (что не желательно, все таки всемогущие xD)
    deleteGodById(id) {
        return fetch (`${this.url}delete/${id}`, {
        method: 'DELETE'
    });
    }
}