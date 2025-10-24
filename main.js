import './assets/scss/all.scss';
import "bootstrap/dist/js/bootstrap.min.js";
import axios from 'axios';
import * as d3 from 'd3';
import c3 from 'c3';
import 'c3/c3.css';

let data = [];
let totalObj = {};
let newData = [];
function init() {
    axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
        .then(function (response) {
            data = response.data['data'];
            render(data); // 只在成功取得資料後渲染
        })
        .catch(function (err) {
            console.error("取得資料失敗", err);
        });
}

function render(data) {
    const list = document.querySelector(".list");
    let str = "";
    totalObj = {};
    newData = [];

    data.forEach(function (item) {
        let priceFormatted = Number(item.price).toLocaleString();
        str += `
        <div id="${item.id}" class="col-4">
          <div class="card rounded-1 shadow" style="height:529px;">
            <div class="position-relative">
              <div class="location-tag">${item.area}</div>
              <div class="score-tag">${item.rate}</div>
              <img src="${item.imgUrl}" class="card-img-top" alt="travel_1">
            </div>
            <div class="card-body py-5 px-20">
              <h5 class="card-title card-title-line text-primary-400 mb-4 fs-4 fw-medium">${item.name}</h5>
              <p class="card-text mb-5 text-neutral-600">${item.description}</p>
            </div>
            <div class="px-20 pb-5">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <p class="fw-medium text-primary-400">剩下最後 ${item.group} 組</p>
                </div>
                <div class="d-flex align-items-center">
                  <p class="text-primary-400 me-1 fw-medium">TWD</p>
                  <p class="text-primary-400 fw-medium fs-2">$${priceFormatted}</p>
                </div>
              </div>
            </div>
          </div>
        </div>`;
        if (totalObj[item.area] == undefined) {
            totalObj[item.area] = 1;
        } else {
            totalObj[item.area] += 1;
        }
    });

    list.innerHTML = str;

    Object.keys(totalObj).forEach(function (key) {
        newData.push([key, totalObj[key]]);
    });
    chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: newData,
            type: 'donut',
            colors: {
                "台北": '#26C0C7',
                "台中": '#5151D3',
                "高雄": '#E68618'
            }
        },
        donut: {
            title: "套票地區比重",
            width: 12,
            label: { 
                show: false
            }
        },
        size: { width: 162, height: 192 },
        tooltip: {
            format: {
                value: function(value, ratio, id) {
                    return `${value} (${(ratio*100).toFixed(1)}%)`;
                }
            }
        },
    });
}

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
    let filteredData = data.filter(item => {
        return selected === "全部地區" || item.area.includes(selected);
    });
    colItems.forEach(col => {
        const locationTag = col.querySelector('.location-tag');

        if (selected === "全部地區" || locationTag.textContent.includes(selected)) {
            col.style.display = 'block';
            count++;
            anyVisible = true;
            searchBtn.textContent = selected;
        } else {
            col.style.display = 'none';
            searchBtn.textContent = selected;
        }
    });

    if (anyVisible) {
        noFound.style.setProperty('display', 'none', 'important');
    } else {
        noFound.style.setProperty('display', 'flex', 'important');
    }
    searchNum.textContent = count;
    render(filteredData);
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
    form.reset();
    document.getElementById('location').textContent = "全部地區";
    render(data);

});

init();