
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
let $data_above_god_id = document.querySelector('[data-above_god_id]');
let $status = document.querySelector('#status');
let $btn_status = document.querySelector('#btn_status');


// формирование html
let htmlGod = (god) => 
`<div class ="card" data-god_id=${god.id}>
    <button class="basket" data-btn="delete" data-tooltip="Удалить?">&#10008</button>
    <div class="img_avatar" style="background-image: url(${god.image})"></div>
    <h3>${god.name}</h3>
    <p>Возраст ${god.age} лет</p>
    <button data-btn="description">Подробнее</button>
</div>`


let htmlAboveGod = (god) => 
`<div class ="card_above" data-above_god_id=${god.id} type =${god.favorite}>
        <div class="img_avatar_above" style="background-image: url(${god.image})"></div>
        <div class="god_rate"><h2>${god.rate}</h2></div>
        <div class="god_name"><h1> ${god.name}</h1></div>
        <div class="god_age"><h2>${god.age} млрд. лет</h2></div>
        <div class="god_description"><p>${god.description}</p></div>
</div>`


// async/await

const getAllGods = async () => {
    try {
            const res = await apiGod.getAllGods();
            const data = await res.json();
            data.forEach(god => $id_view_cards.insertAdjacentHTML("beforeend", htmlGod(god)));
            
        return data;
    } catch (error) {
        timerNoOk();
    }
};

const getAllIdByGods = async () => {
    try {
            const res = await apiGod.getAllIdByGods();
            const data = await res.json();
            
        return data;
    } catch (error) {
        timerNoOk();
    }
};

const getInfoAboutGodById = async (id) => {
    try {
            const res = await apiGod.getInfoAboutGodById(id);
            const data = await res.json();
            updateTheDataAbove(id); //Показ окна подробнее
            
        return data;
    } catch (error) {
        timerNoOk();
    }
};

const addGod = async (body) => {
    try {
            const res = await apiGod.addGod(body);
            const data = await res.json();
            updateTheData(); //обновление карточек
            // console.log('Информация добавлена') // вывести подтверждение
            timerOk ();
        return data;
    } catch (error) {
        timerNoOk();
    }
};

const editGodInfo = async (body, id) => {
    try {
            const res = await apiGod.editGodInfo(body, id);
            const data = await res.json();
            $id_modal_eddit_god.classList.add('hidden');
            getInfoAboutGodById(id);
            timerOk();        
        return data;
    } catch (error) {
        timerNoOk();
    }    
};

const deleteGodById = async (id) => {
    try {
            const res = await apiGod.deleteGodById(id);
            const data = await res.json();
            timerOk();
        return data;
    } catch (error) {
        timerNoOk();
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
        let $card_above = e.target.closest('div').firstElementChild.firstElementChild
        let id = Number($card_above.dataset.above_god_id);
    } 
    if (e.target.dataset.btn === 'edditGodModalClose'){
        $id_modal_eddit_god.classList.add('hidden');
    }

});

//Логика модального окна входа

function timerOk () {
        $btn_status.textContent = "Все сделано! Такие дела"
    setTimeout(() => {
        $btn_status.classList.remove('ok');
        $status.classList.add('hidden');
    }, 1000);
        $btn_status.classList.add('ok');
        $status.classList.remove('hidden');
};

function timerNoOk () {
        $btn_status.textContent = "Упс, бэкендер снова заснул"
    setTimeout(() => {
        $btn_status.classList.remove('noOk');
        $status.classList.add('hidden');
    }, 5000);
        $btn_status.classList.add('noOk')
        $status.classList.remove('hidden');
};


document.forms.form_start.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target).entries());
    let user = data.user;
    if (!!user) {
        e.target.parentNode.style.boxShadow = "0 0 30px greenyellow";

        //отложенный вход для показа анимации
        function time (user) {
            $data_modal_form_login.classList.add('hidden');
            $id_main_page.classList.remove('hidden');
            userLogin(user)
        }
        setTimeout(time,1000, user); // интервал анимации входа
    } else {
        $data_inp_formStartUserInput.classList.add('animate_err', 'btnArror');
        function deleteClass(){
            $data_inp_formStartUserInput.classList.remove('animate_err','btnArror');   
        }
        setTimeout(deleteClass, 1000);
    }
});

// Модальное окно добавления
 document.forms.form_add_god.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    data.id = Number(data.id);
    data.age = Number(data.age);
    data.rate = Number(data.rate);
    data.favorite = data.favorite === 'true';
    addGod(data);
    Form.reset();
});

// Модальное окно редактирования
document.forms.form_eddit_god.addEventListener('submit', (e) => {
    e.preventDefault();
    $idEditCard = document.querySelector('[data-above_god_id]');
    let id = Number($idEditCard.dataset.above_god_id);
    const data = Object.fromEntries(new FormData(e.target).entries());
    data.age = Number(data.age);
    data.rate = Number(data.rate);
    data.favorite = data.favorite === 'true';
    editGodInfo(data, id);
    addGod(data);         
});
        // { once: true });    

//Логика кнопок удаления, подробнее, закрытия модального окна редактирования
document.addEventListener('click', (e) => {
    if (e.target.dataset.btn === 'delete') {
            let id = Number(e.target.parentNode.dataset.god_id);
            deleteGodById(id);
            e.target.parentNode.classList.add('animate_delete')
            e.target.parentNode.remove();
        } 
    if (e.target.dataset.btn === 'description') {
            $id_above_page.classList.remove('hidden');
            $id_main_page.classList.add('hidden');
            let id = Number(e.target.parentNode.dataset.god_id);
            getInfoAboutGodById(id);
        }
    if (e.target.dataset.btn === 'edditAboveGodClose') {
            $id_above_page.classList.add('hidden');
            $id_main_page.classList.remove('hidden');
             
        } 
});

//Функция обновления карточек после добавления
let updateTheData = async () => {
    try {
        const res = await apiGod.getAllGods();
        const newData = await res.json();
        $id_view_cards.replaceChildren();
        newData.forEach(god => $id_view_cards.insertAdjacentHTML("beforeend", htmlGod(god)));
        $id_modal_add_god.classList.add('hidden');
        
    } catch (error) {
        timerNoOk();
    }    
};

//Функция обновления карточки после редактирования
let updateTheDataAbove = async (id) => {
    try {
        const res = await apiGod.getInfoAboutGodById(id);
        const data = await res.json();
        $id_above_cards.replaceChildren();
        $id_above_cards.insertAdjacentHTML("beforeend", htmlAboveGod(data));
        timerOk();
        return data;
    } catch (error) {
        timerNoOk();
    }
};

// Хранение

const dataFromStorage = localStorage.getItem(document.forms.form_add_god.name);
const parsedData = dataFromStorage ? JSON.parse(dataFromStorage) : null;

    if (parsedData) {
        Object.keys(parsedData).forEach( el => {
            document.forms.form_add_god[el].value = parsedData[el];
        });
    };

document.forms.form_add_god.addEventListener('input', () => {
    const formData = Object.fromEntries( new FormData(document.forms.form_add_god).entries())
        localStorage.setItem(document.forms.form_add_god.name, JSON.stringify(formData));
});

const editGod = async (godIdEdit) => {
    const response = await api.getInfoAboutGodById(godIdEdit);
    const data = await response.json();
    Object.keys(data).forEach((key) => {
    document.forms.form_eddit_god[key].value = data[key];
    })
};
getInfoAboutGodById(godIdEdit);