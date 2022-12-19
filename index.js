
let user;
let apiGod;



// let objGod = {
//     id: number,
//     name: "string",
//     favorite: true,
//     rate: number,
//     age: number,
//     description: "string",
//     image: "url"
// }

let $data_btn_startUser = document.querySelector('[data-btn = "startUser"]');
let $data_btn_formStartUser = document.querySelector('[data-btn = "formStartUser"]');
let $data_modal_form_login = document.querySelector('[data-modal = "modal_form_login"]');
let $data_btn_formStartUserClose = document.querySelector('[data-btn = "formStartUserClose"]');
let $data_inp_formStartUserInput = document.querySelector('[data-inp = "formStartUserInput"]');
let $id_main_page = document.querySelector('#id_main_page');
let $id_view_cards = document.querySelector('#id_view_cards');
let $id_modal_add_god = document.querySelector('[data-modal = "id_modal_add_god"]');
let $data_btn_addGodModal = document.querySelector('[data-btn = "addGodModal"]');
let $data_btn_addGodModalClose = document.querySelector('[data-btn = "addGodModalClose"]');
let $id_modal_eddit_god = document.querySelector('[data-modal = "id_modal_eddit_god"]');
let $id_above_page = document.querySelector('#id_above_page');
let $id_above_cards = document.querySelector('#id_above_cards');



let htmlGod = (god) => 
`<div class ="card" data-god_id=${god.id}>
    <div class="img_avatar" style="background-image: url(${god.image})"></div>
    <h3>${god.name}</h3>
    <p>Возраст ${god.age} лет</p>
    <button data-btn="description">Подробнее</button>
    <button data-btn="delete">Delete</button>
</div>`


let htmlAboveGod = (god) => 
`<div class ="card_above" data-god_id=${god.id}>
    <div class="img_avatar_above" style="background-image: url(${god.image})"></div>
    <h1>${god.id}</h1>
    <h1>${god.rate}</h1>
    <h3>${god.name}</h3>
    <p>${god.description}</p>
    <p>Возраст ${god.age} лет</p>
    <p>${god.favorite}</p>
</div>`


// async/await

const getAllGods = async () => {
    try {
            const res = await apiGod.getAllGods();
            const data = await res.json();
            data.forEach(god => $id_view_cards.insertAdjacentHTML("beforeend", htmlGod(god)));
        return data;
    } catch (error) {
        alert(`ОШИБКАААА!!!ВОТ ЧТО ПИШУТ: ${error}`);
    }
};

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
            $id_above_cards.insertAdjacentHTML("beforeend", htmlAboveGod(data));
        return data;
    } catch (error) {
        console.log('WATH');
        alert(`ОШИБКАААА!!!ВОТ ЧТО ПИШУТ: ${error}`);
    }
};

const addGod = async (body) => {
    try {
            const res = await apiGod.addGod(body);
            const data = await res.json();
            updateTheData();
            console.log('Информация добавлена') // вывести подтверждение
        return data;
    } catch (error) {
        alert(`ОШИБКАААА!!!ВОТ ЧТО ПИШУТ: ${error}`);
    }
};

const editGodInfo = async (body, id) => {
    try {
            const res = await apiGod.editGodInfo(body, id);
            const data = await res.json();
            updateTheData();
            $id_modal_eddit_god.classList.add('hidden');
            
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



// Открытие модального окна ввода данных о пользователе
document.addEventListener('click', (e) => {

    if (e.target.dataset.btn === "startUser") {
    
        $data_modal_form_login.classList.remove('hidden');
        $data_btn_startUser.classList.add('hidden');       
    }
    if (e.target.dataset.btn === "formStartUserClose" ) {
    
        $data_modal_form_login.classList.add('hidden');
        $data_btn_startUser.classList.remove('hidden');
    }
});

//  Присвоение имени пользователя
function userLogin(user) {
    apiGod = new Api(user);
    getAllGods();
};

// появление и закрытие модальных окон
document.addEventListener('click', (e) => {
    if (e.target.dataset.btn === 'addGod'){
        $id_modal_add_god.classList.remove('hidden');
    } 
    if (e.target.dataset.btn === "addGodModalClose"){
        $id_modal_add_god.classList.add('hidden');
    }
    if (e.target.dataset.btn === 'edditGod'){
        $id_modal_eddit_god.classList.remove('hidden');
    } 
    if (e.target.dataset.btn === 'edditGodModalClose'){
        $id_modal_eddit_god.classList.add('hidden');
    }

});

function animateStart(params) {
    
}

// реализовать изменение свечения кнопки входа по рандому
// $data_btn_startUser.classList.add('animate_err', 'btnArror');
// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
//   }


//Логика модально окна входа
//Баг пофиксить, даже когда нажимаешь отмена с введенными данными идет запуск
document.forms.form_start.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target).entries());
    let user = data.user;
    if (!!user) {
        e.target.parentNode.style.boxShadow = "0 0 30px chartreuse";
        console.log('Вход');
        //вызов функции 
        function time (user) {
            $data_modal_form_login.classList.add('hidden');
            $id_main_page.classList.remove('hidden');
            userLogin(user)
        }
        setTimeout(time, 1000, user); // указать интервал анимация входа

    } else {
        $data_inp_formStartUserInput.classList.add('animate_err', 'btnArror');
        function deleteClass(){
            $data_inp_formStartUserInput.classList.remove('animate_err','btnArror');   
        }
        setTimeout(deleteClass, 1000);
        console.log('Введите дынные');
    }
});


// Добавление Олимпийского Бога
 document.forms.form_add_god.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    data.id = Number(data.id);
    data.age = Number(data.age);
    data.rate = Number(data.rate);
    data.favorite = data.favorite === 'true';
    addGod(data);
});


// редактирование Олимпийского Бога 
//Баг удаляет прежние значения, если пустые поля оставить при редактировании
document.forms.form_eddit_god.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    data.id = Number(data.id);
    data.age = Number(data.age);
    data.rate = Number(data.rate);
    data.favorite = data.favorite === 'true';
    editGodInfo(data, data.id);
});

//карточки
document.addEventListener('click', (e) => {
    if (e.target.dataset.btn === 'delete') {
            let id = Number(e.target.parentNode.dataset.god_id);
            deleteGodById(id);
            e.target.parentNode.remove();
        } 
    if (e.target.dataset.btn === 'description') {
        $id_above_page.classList.remove('hidden');
        let id = Number(e.target.parentNode.dataset.god_id);
        console.log(id);
        getInfoAboutGodById(id);
        
    }
    if (e.target.dataset.btn === 'edditAboveGodClose') {
        $id_above_page.classList.add('hidden');
        $id_above_cards.replaceChildren();
    } 
});



//обновление карточек
let updateTheData = async () => {
    try {
        const res = await apiGod.getAllGods();
        const newData = await res.json();
        $id_view_cards.replaceChildren();
        newData.forEach(god => $id_view_cards.insertAdjacentHTML("beforeend", htmlGod(god)));
        $id_modal_add_god.classList.add('hidden');
        console.log('Отлично')
        console.log('Информация изменена');
    } catch (error) {
        alert(`ОШИБКАААА!!!ВОТ ЧТО ПИШУТ: ${error}`);
    }    
};

//Окно подробнее 
