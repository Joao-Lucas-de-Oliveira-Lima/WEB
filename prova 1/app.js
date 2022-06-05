const travelHistory = document.getElementById("travelHistory")
const transportOption = document.getElementById('transport')
const typeOption = document.getElementById('type')
const checkBox = document.getElementById("roundTrip")
const sendButton = document.getElementById("sendButton")
const currentBalance = document.getElementById("currentBalance")
const pointsSpent = document.getElementById("pointsSpent")
const totalTrips = document.getElementById("totalTrips")

let createTravelHistoryDecision = true;

const tripsPrice = [
    {
        dataId: "international",
        total: 5000
    },
    {
        dataId: "national",
        total: 500
    },
    {
        dataId: "interstate",
        total: 150
    },
    {
        dataId: "intercity",
        total: 50
    },
    {
        dataId: "municipal",
        total: 25
    }
]

function updateTypeOptions(transportOptionValue, typeOption){
    typeOption.innerHTML = ""
    if(transportOptionValue == "airplane"){
        const option1 = document.createElement("option")
        option1.setAttribute("value", "national")
        option1.innerHTML = "Nacional"
        
        const option2 = document.createElement("option")
        option2.setAttribute("value", "international")
        option2.innerHTML = "Internacional"

        typeOption.appendChild(option1)
        typeOption.appendChild(option2)
    }else{
        const option3 = document.createElement("option")
        option3.setAttribute("value", "interstate")
        option3.innerHTML = "Interestadual"
        
        const option4 = document.createElement("option")
        option4.setAttribute("value", "intercity")
        option4.innerHTML = "Intermunicipal"

        const option5 = document.createElement("option")
        option5.setAttribute("value", "municipal")
        option5.innerHTML = "Municipal"

        typeOption.appendChild(option3)
        typeOption.appendChild(option4)
        typeOption.appendChild(option5)
    }
}


function calculateTripPrice(typeOption, tripsPrice, checkBox){
    let price;
    for(let cont=0; cont<tripsPrice.length; cont++){
        if(typeOption == tripsPrice[cont].dataId){
            price = tripsPrice[cont].total
        }
    }
    if(checkBox.checked){
        price*=2;
    }
    return price
}

function validatePurchace(purchacePrice, currentBalance){
    const total = currentBalance - purchacePrice;
    if(total < 0){
        return {validate: false, remainingAmount: total}
    }else{
        return {validate: true, remainingAmount: total}
    }
}

function updateCurrentBalance(currentBalance, newValue){
    currentBalance.innerHTML = newValue
}

function updatePointsSpent(pointsSpent, newValue){
    pointsSpent.innerHTML = newValue
}

function updateTotalTrips(totalTrips){
    totalTrips.innerHTML = parseInt(totalTrips.innerHTML)+1
}

function createTravelHistory(travelHistory){
    travelHistory.setAttribute("class", "travelHistory d-flex justify-content-around")
    
    const tableColumn1 = document.createElement("div")
    tableColumn1.setAttribute("id", "tableColumn1")

    const tableColumn2 = document.createElement("div")
    tableColumn2.setAttribute("id", "tableColumn2")

    const tableColumn3 = document.createElement("div")
    tableColumn3.setAttribute("id", "tableColumn3")

    const tableColumn4 = document.createElement("div")
    tableColumn4.setAttribute("id", "tableColumn4")

    const tableColumn1FirstRow = document.createElement("h4")
    tableColumn1FirstRow.setAttribute("class", "d-flex justify-content-around")
    tableColumn1FirstRow.innerHTML = "Meio de transporte"
    tableColumn1.appendChild(tableColumn1FirstRow)

    const tableColumn2FirstRow = document.createElement("h4")
    tableColumn2FirstRow.setAttribute("class", "d-flex justify-content-around")
    tableColumn2FirstRow.innerHTML = "Tipo"
    tableColumn2.appendChild(tableColumn2FirstRow)
    
    const tableColumn3FirstRow = document.createElement("h4")
    tableColumn3FirstRow.setAttribute("class", "d-flex justify-content-around")
    tableColumn3FirstRow.innerHTML = "Ida-e-volta"
    tableColumn3.appendChild(tableColumn3FirstRow)
    
    const tableColumn4FirstRow = document.createElement("h4")
    tableColumn4FirstRow.setAttribute("class", "d-flex justify-content-around")
    tableColumn4FirstRow.innerHTML = "Custo em pontos"
    tableColumn4.appendChild(tableColumn4FirstRow)


    travelHistory.appendChild(tableColumn1)
    travelHistory.appendChild(tableColumn2)
    travelHistory.appendChild(tableColumn3)
    travelHistory.appendChild(tableColumn4)

    return false;
}

function updateTravelHistory(transportOption, typeOption, checkBox, purchacePrice){
    const tableColumn1 = document.getElementById("tableColumn1")
    const tableColumn2 = document.getElementById("tableColumn2")
    const tableColumn3 = document.getElementById("tableColumn3")
    const tableColumn4 = document.getElementById("tableColumn4")

    const tableColumn1NewRow = document.createElement("h5")
    tableColumn1NewRow.innerHTML = transportOption.options[transportOption.selectedIndex].text

    const tableColumn2NewRow = document.createElement("h5")
    tableColumn2NewRow.innerHTML = typeOption.options[typeOption.selectedIndex].text

    const tableColumn3NewRow = document.createElement("h5")
    if(checkBox.checked){
        tableColumn3NewRow.innerHTML = "Sim"
    }else{
        tableColumn3NewRow.innerHTML = "Não"
    }

    const tableColumn4NewRow = document.createElement("h5")
    tableColumn4NewRow.innerHTML = purchacePrice

    tableColumn1.appendChild(tableColumn1NewRow)
    tableColumn2.appendChild(tableColumn2NewRow)
    tableColumn3.appendChild(tableColumn3NewRow)
    tableColumn4.appendChild(tableColumn4NewRow)
}

transportOption.addEventListener("click", (e) => {
    updateTypeOptions(e.target.value, typeOption)
});

sendButton.addEventListener("click", () => {
    const purchacePrice = calculateTripPrice(typeOption.value, tripsPrice, checkBox)
    console.log(purchacePrice)
    const conditional = validatePurchace(purchacePrice, parseInt(currentBalance.innerHTML))
    console.log(conditional.remainingAmount)
    if(conditional.validate){
        updateCurrentBalance(currentBalance, conditional.remainingAmount)
        updateCurrentBalance(pointsSpent, 20000-conditional.remainingAmount)
        updateTotalTrips(totalTrips)
        if(createTravelHistoryDecision){
            createTravelHistoryDecision = createTravelHistory(travelHistory)
        }
        updateTravelHistory(transportOption, typeOption, checkBox, purchacePrice)
        
        if(conditional.remainingAmount == 0){
            sendButton.setAttribute("disabled", "")
        }
    }else{
        alert("Infelizmente você não possui saldo suficiente")
    }
})
