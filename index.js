
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
let $data_btn_addGodModal = document.querySelector('[data-btn = "addGodModal"]')


let htmlGod = (god) => 
`<div class ="card" data-cat_id=${god.id}>
    <div class="img_avatar" style="background-image: url(${god.image})"></div>
    <h3>${god.name}</h3>
    <p>${god.description}</p>
    <button data-btn="description">Подробнее</button>
    <button data-btn="delete">Delete</button>
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
}
);

//  Присвоение имени пользователя
function userLogin(user) {
    apiGod = new Api(user);
    getAllGods();
};

// вызов модального окна добавления, нажимая на кнопку добавить
document.addEventListener('click', (e) => {
    if (e.target.dataset.btn === 'addGod'){
        $id_modal_add_god.classList.remove('hidden');
    };
});

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
        setTimeout(time, 1000, user);

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
        console.log(data);
        addGod(data);
    });