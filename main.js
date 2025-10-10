import './assets/scss/all.scss';
import "bootstrap/dist/js/bootstrap.min.js";

let data = [
    {
        "id": 0,
        "name": "肥宅心碎賞櫻3日",
        "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
        "area": "高雄",
        "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
        "group": 87,
        "price": 1400,
        "rate": 10
    },
    {
        "id": 1,
        "name": "貓空纜車雙程票",
        "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台北",
        "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
        "group": 99,
        "price": 240,
        "rate": 2
    },
    {
        "id": 2,
        "name": "台中谷關溫泉會1日",
        "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台中",
        "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
        "group": 20,
        "price": 1765,
        "rate": 7
    }
];

function init() {
    const list = document.querySelector(".list");
    let str = "";
    data.forEach(function (item, index) {
        let priceFormatted = Number(item.price).toLocaleString();
        let content =
            `
        <div id="${item.id}" class="col-4">
            <div class="card rounded-1 shadow" style="height:529px;">
                <div class="position-relative">
                    <div class="location-tag">${item.area}</div>
                    <div class="score-tag">${item.rate}</div>
                    <img src="${item.imgUrl}" class="card-img-top" alt="travel_1">
                </div>
                <div class="card-body py-5 px-20">
                    <h5 class="card-title card-title-line text-primary-400 mb-4 fs-4 fw-medium">${item.name}</h5>
                    <p class="card-text mb-5 text-neutral-600">
                    ${item.description}
                    </p>
                </div>
                <div class="px-20 pb-5">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <div style="width: 24px;height: 24px;" class="d-flex justify-content-center align-items-center me-1">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
                          fill="#00807E" />
                      </svg>
                    </div>
                    <p class="fw-medium text-primary-400">剩下最後 ${item.group} 組</p>
                  </div>
                  <div class="d-flex align-items-center">
                    <p class="text-primary-400 me-1 fw-medium">TWD</p>
                    <P class="text-primary-400 fw-medium fs-2">$${priceFormatted}</P>
                  </div>
                </div>
              </div>
            </div>
        </div>
        `
        str += content;

    });
    list.innerHTML = str;
}

init();

// 景點地區
document.querySelectorAll('.location-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        const btn = document.getElementById('location');
        btn.childNodes[0].textContent = item.textContent;
    });
});

// 篩選功能
const searchBtn = document.getElementById('search');
const dropdownItems = document.querySelectorAll('.search-menu .dropdown-item');
const noFound = document.querySelector('.no_found');
const searchNum = document.querySelector('#searchNum');


function search(selected) {
    const colItems = document.querySelectorAll('.col-4');
    searchNum.textContent = colItems.length;
    let count = 0;
    let anyVisible = false;
    colItems.forEach(col => {
        const locationTag = col.querySelector('.location-tag');

        if (selected === "全部地區" || locationTag.textContent.includes(selected)) {
            col.style.display = 'block';
            count++;
            anyVisible = true;
        } else {
            col.style.display = 'none';
        }
    });

    if (anyVisible) {
        noFound.style.setProperty('display', 'none', 'important');
    } else {
        noFound.style.setProperty('display', 'flex', 'important');
    }
    searchNum.textContent = count;
}

dropdownItems.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        const selected = item.textContent.trim();
        search(selected);
    });
});


const form = document.getElementById('addTicket');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const imgName = document.getElementById('imgName').value;
    const imgUrl = document.getElementById('imgUrl').value;
    const location = document.getElementById('location').textContent.trim();
    const tickerPrice = document.getElementById('tickerPrice').value;
    const tickerGroup = document.getElementById('tickerGroup').value;
    const tickerRate = document.getElementById('tickerRate').value;
    const tickerDescription = document.getElementById('tickerDescription').value;
    let dataNum = data.length;
    let new_id = dataNum + 1;
    // 只加入 data
    data.push({
        id: new_id,
        name: imgName,
        imgUrl,
        area: location,
        description: tickerDescription,
        group: tickerGroup,
        price: tickerPrice,
        rate: tickerRate
    });

    console.log(data);
    init();
    document.getElementById('imgName').value = "";
    document.getElementById('imgUrl').value = "";
    document.getElementById('tickerPrice').value = "";
    document.getElementById('tickerGroup').value = "";
    document.getElementById('tickerRate').value = "";
    document.getElementById('tickerDescription').value = "";
});
