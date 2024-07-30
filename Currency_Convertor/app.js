let currency_URL = "https://latest.currency-api.pages.dev/v1/currencies/usd.json";

let dropdown_select = document.querySelectorAll(".dropdown .select");

let btn = document.querySelector(".div-2 button");

let fromCurr = document.querySelector(".from select");

let toCurr = document.querySelector(".to select");

let finalAns = document.querySelector(".you-get input");

let fromCountry = 'INR';

let toCountry = 'USD';


for ( let select of dropdown_select ){

    for ( let currcode in countryList ){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.name = currcode;

        if( select.name === "from" && currcode === "INR" ){
            newOption.selected = "selected";
        }

        else if( select.name === "to" && currcode === "USD" ){
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change" , (evt) => {
        update_flag(evt.target,select.name);
    });
}


const update_flag = (element,selectName) => {

    let currcode = element.value;

    if( selectName === 'from' ){
        fromCountry = currcode;
        currency_URL = `https://latest.currency-api.pages.dev/v1/currencies/${fromCountry.toLowerCase()}.json`;
    }
    else if( selectName === 'to' ){
        toCountry = currcode;
    }

    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;   
}


btn.addEventListener("click" , async (evt) => {

    evt.preventDefault();
    let amount = document.querySelector(".you-have input").value;

    // if( amount === "" || amount < 1 ){
    //     amount = 0;
    //     amount.value = 0;
    // }

    let resultAmount = (await getValues(toCountry))*amount; // this wait is must
    // console.log(resultAmount);
    finalAns.value = resultAmount;
});

async function getValues( toCountry ){

    let response = await fetch(currency_URL);
    let data = await response.json();
    // console.log(data);
    const values = Object.values(data);
    // console.log(values);
    // console.log(values[1][toCountry.toLowerCase()]);
    return values[1][toCountry.toLowerCase()];

};