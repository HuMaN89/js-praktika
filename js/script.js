const btn1 = document.querySelector('#btn1'),
    popup = document.querySelector('.popup'),
    popupEngineer = document.querySelector('.popup_engineer'),
    popupCalc = document.querySelector('.popup_calc'),
    popupCalcProfile = document.querySelector('.popup_calc_profile'),
    popupCalcEnd = document.querySelector('.popup_calc_end'),
    links = document.querySelectorAll('.phone_link'),
    inputNum = document.querySelectorAll('[data-num]'),
    btnsCalc = document.querySelectorAll('.popup_calc_btn'),
    calcImgs = document.querySelectorAll('[data-img-id]'),
    calcBigImgs = document.querySelectorAll('[data-bimg-id]'),
    nextToProfile = document.querySelector('#nextToProfile'),
    nextToEnd = document.querySelector('#nextToEnd'),
    windowWidth = document.querySelector('#width'),
    windowHeight = document.querySelector('#height'),
    viewType = document.querySelector('#view_type'),
    cold = document.querySelector('#cold'),
    warm = document.querySelector('#warm'),
    submitBtns = document.querySelectorAll('[type="submit"]'),
    inputs = document.querySelectorAll('.form_input'), 
    result = {
        name: '',
        phone:'',
        width: '',
        heigth: '',
        type: '1',
        viewType: 'tree',
        warmOrCold: '',
    };

btn1.addEventListener('click', () => {popupEngineer.style.display = 'block'})

document.addEventListener('click', (e) => {
    const popupModalWindow = e.target.parentNode.parentNode.parentNode.parentNode
    if (e.target.getAttribute("data-close") === "") {
        popupModalWindow.style.display = 'none'
    }
    switch (e.target) {
        case popup: popup.style.display = 'none'
        break;
        case popupEngineer: popupEngineer.style.display = 'none'
        break;
        case popupCalc: popupCalc.style.display = 'none'
        break;
        case popupCalcProfile: popupCalcProfile.style.display = 'none'
        break;
        case popupCalcEnd: popupCalcEnd.style.display = 'none'
        break;
        default:
            break;
    }
})

const openModal =() => {
    const popup = document.querySelector('.popup');
    popup.style.display = 'block'
}
links.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        openModal()
    })
})

const modalTimerId = setTimeout(() => {
    openModal()
}, 60500);
btnsCalc.forEach(item => {
    item.addEventListener('click', (e) => {
        popupCalc.style.display = 'block'
    })
})

inputNum.forEach(item => { //Ввод только цифр в input
    item.addEventListener('keydown', (event) => {
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
            // Разрешаем: home, end, влево, вправо
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        } else {
            // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault();
            }
        }
    })
})


    
const goToProfileModalWindow = () => {// проверка введеных значений на первом окне
    if (result.width !== '' && result.heigth !== '' && result.type !== ''){
        nextToProfile.disabled = false
    } else {
        nextToProfile.disabled = true
    }
}
    
const goToEndModalWindow = () => {// проверка введеных значений на первом окне
    if (result.viewType !== '' && result.warmOrCold !== '' ){
        nextToEnd.disabled = false
    } else {
        nextToEnd.disabled = true
    }
}

    const hideCalcImgs = () => {
        calcBigImgs.forEach(item => {
            item.style.display = 'none'
        })
        calcImgs.forEach(item => {
            item.parentNode.classList.remove("do_image_more");            
        })
    }
    calcImgs.forEach((item) => {
        item.addEventListener('click', (e) => {
            hideCalcImgs();
            item.parentNode.classList.add("do_image_more");            
            calcBigImgs[e.target.getAttribute("data-img-id") - 1].style.display = 'block';
            result.type = e.target.getAttribute("data-img-id");
            goToProfileModalWindow()
        })

    });
    
    nextToProfile.addEventListener('click', () => {
        popupCalcProfile.style.display = 'block';
        popupCalc.style.display = 'none'
    })
    nextToEnd.addEventListener('click', () => {
        popupCalcEnd.style.display = 'block';
        popupCalcProfile.style.display = 'none';

    })
    
    windowHeight.addEventListener('input', (e) => {
        result.heigth = e.target.value;
        goToProfileModalWindow()
    })
    windowWidth.addEventListener('input', (e) => {
        result.width = e.target.value;
        goToProfileModalWindow()
    })

    viewType.addEventListener('change', (e) => {
        result.viewType = e.target.value;
        goToEndModalWindow()
    })
    cold.addEventListener('click', () => {
        result.warmOrCold = 'Холодное';
        goToEndModalWindow()
    })
    warm.addEventListener('click', () => {
        result.warmOrCold = 'Теплое';
        goToEndModalWindow()
    })

    submitBtns.forEach(btn => {
        btn.addEventListener('click' , (e) => {
            e.preventDefault();
            if(result.name !=='' && result.phone !== '' ){
            console.log('submit' ,  result);
            }
        })
    })
    inputs.forEach(item => {
        if (item.name === 'user_name'){
            item.addEventListener('input', (e) => {
                result.name = e.target.value
            })
        } else if(item.name === 'user_phone'){
            item.addEventListener('input', (e) => {
                result.phone = e.target.value
            })}
    })

    //tabs
    function tabs(tabsSelector, tabContent, tabParentSelector, tabheader__item_active) {
            const tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabContent),
            tabsParent = document.querySelector(tabParentSelector);
          
            // console.log('tabs', tabs);
            // console.log('tabsContent', tabsContent);
            // console.log('tabsParent', tabsParent);
            // console.log('tabheader__item_active', tabheader__item_active);
          const hideTabContent = () => {
            tabsContent.forEach((item) => {
              item.style.display = 'none';
            });
            tabs.forEach((item) => {
              item.lastElementChild.classList.remove(tabheader__item_active);
            });
          };
          const showTabContent = (i = 0) => {
            tabsContent[i].style.display = 'block';
            tabs[i].lastElementChild.classList.add(tabheader__item_active);
          };
          hideTabContent();
          showTabContent();
          
          tabsParent.addEventListener("click", (event) => {
            const target = event.target;
        //   console.log('target', target);
        //   console.log('target.parentNode', target.parentNode);
              tabs.forEach((item, i) => {
                if ((target == item) || (target.parentNode == item)) {
                  hideTabContent();
                  showTabContent(i);
                }
              });
          });
          }
tabs('.glazing_block','.glazing_content','.glazing_slider', 'active');

tabs('.decoration_item','.dec_content','.decoration_slider', 'after_click');

//timer

function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  
  function timer(id, deadline) {
    function getTimeRemaning(endTime) {
      const t = Date.parse(endTime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
  
      return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    }
  
    function setClock(selector, endTime) {
      const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector("#hours"),
        minutes = timer.querySelector("#minutes"),
        seconds = timer.querySelector("#seconds"),
        timeInterval = setInterval(updateClock, 1000);
  
      updateClock();
  
      function updateClock() {
        const t = getTimeRemaning(endTime);
  
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
  
        if (t.total <= 0) {
          clearInterval(timeInterval);
        }
      }
    }
    setClock(id, deadline);
  }


timer("#timer", "2022-07-12");


//works

const preview = document.querySelectorAll('.preview');

preview.forEach(item => {
    item.addEventListener('click', (e) => {
        console.log(e.target.getAttribute('data-id'));
        const div = document.createElement('div');
        div.className = "alert";
        div.innerHTML = `
        <div class="background" >
            <img class="view" data-id="1" src="assets/img/our_works/big_img/${e.target.getAttribute('data-id')}.png" alt="window"> 
        </div> `; 
      document.body.append(div)
      const background = document.querySelector('.background');
      background.addEventListener('click', () => {
        div.style.opacity = '0'
        setTimeout(() => {
            document.body.removeChild(div)
        }, 1000)
    })
    })
})