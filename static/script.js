import { inputForm, Patient, getPatientInfoElements, values } from "./script2.js";

inputForm()





let startTime = document.getElementById("startTime")
let currentDate = document.getElementById("currentDate")
let startBtn = document.getElementById("start-exec")
let stopBtn = document.getElementById("stop-exec")

let patientDOM
let newPatient
let TQbutton
let TQtimerStartButton
let TQonTime
let TQtimerId
let timeLeft = 30;
let TQtimer
let timerStartTime
let secondCounter = 0
let started = false
let startingPulss
let startingBreathing


startBtn.addEventListener('click', startNew)
updateClock()

function startNew() {
    startExercise(new Patient(), false)
}

export function startExercise(patient, tqTimerStart) {//activates after start button click, creates a new patient, activates TQ buttons, 
    let removeDiv = document.querySelector(".customPatient")
    let weigth = document.querySelector(".weigth")
    let weigthParent = document.querySelector(".weigthParent")
    if (!isNaN(parseInt(weigth.value))) {
        weigthParent.innerHTML = "Patsiendi kaal: " + weigth.value + "kg"
        weigth.remove()
        removeDiv.remove()
        newPatient = patient
        startingPulss = patient.pulss
        startingBreathing = patient.breathing
        createTable(patient)

        patientDOM = getPatientInfoElements()
        updatePatientDOM(patient, patientDOM)

        TQbutton = document.getElementById("TQbutton")
        TQtimerStartButton = document.getElementById("TQtimerStart")
        TQonTime = document.getElementById("TQonTime")
        TQtimer = document.getElementById('TQtimer');

        TQtimerStartButton.addEventListener('click', TQtimerStart)
        let dateAndTime = getDateAndTime()

        startTime.innerHTML = "Started at: " + dateAndTime
        started = true
        stopBtn.addEventListener('click', () => {
            started = false
        })
        startBtn.removeEventListener('click', startNew)
        if (tqTimerStart) {
            TQtimerStartButton.click()
        }
    } else {
        weigthParent.innerHTML = "Use only numbers"
        weigthParent.appendChild(weigth)
    }
}

function TQtimerStart(event) {//starts the TQ timer, removes the event listener, so it cant be pressed more than once
    TQtimerId = setInterval(countdown, 20);
    TQtimerStartButton.removeEventListener('click', TQtimerStart)
    TQbutton.addEventListener('click', TQbuttonOnClick)
}

function TQbuttonOnClick(event) {//marks that the patient has a TQ on, starts a timer counting how long it has been on
    var TQonIn = (30 - parseFloat(TQtimer.innerHTML)).toFixed(2)
    TQonTime.innerHTML = currentDate.innerHTML + " TQ on in:" + TQonIn + " seconds"
    newPatient.TQon = true
    updatePatientDOM(newPatient, patientDOM)
    timerStartTime = new Date().getTime()
    clearInterval(TQtimerId)
    TQbutton.removeEventListener('click', TQbuttonOnClick)
}



function countdown() {//the timer function, activates after tq timer has been started
    TQtimer.innerHTML = timeLeft.toFixed(2) + ' seconds';
    timeLeft -= 0.02;
}

function updatePatientDOM(patient, patientDOM) {//updates patient data in the DOM
    let patientValues = Object.keys(patient)
    for (let i = 0; i < patientValues.length; i++) {
        patientDOM[patientValues[i]].innerHTML = patient[patientValues[i]]
    }
}

function updateClock() {//real time clock update, every second
    if (started) {
        secondCounter++
        if (newPatient.TQon) {
            updateTimer()
        }
        if (secondCounter >= 60) {
            secondCounter = 0
            newPatient.turned = (newPatient.turned - 0.033).toFixed(3)
            newPatient.sysRR = (newPatient.sysRR -= 0.001).toFixed(3)
            newPatient.ketamineIV = (newPatient.ketamineIV -= 0.462).toFixed(3)
            updatePatientDOM(newPatient, patientDOM)
        }

        if (secondCounter % 15 == 0) {
            startingBreathing = -startingBreathing
            newPatient.breathing = randomIntFromInterval(startingBreathing, startingBreathing - 2)
            if (newPatient.breathing < 0) {
                newPatient.breathing = - newPatient.breathing
            }
            patientDOM["breathing"].innerHTML = newPatient.breathing
        }
        if (secondCounter % 5 == 0) {
            startingPulss = -startingPulss
            newPatient.pulss = randomIntFromInterval(startingPulss, startingPulss + 3)
            if (newPatient.pulss < 0) {
                newPatient.pulss = -newPatient.pulss
            }
            patientDOM["pulss"].innerHTML = newPatient.pulss
        }
    }

    let dateAndTime = getDateAndTime()

    currentDate.innerHTML = dateAndTime
    setTimeout(updateClock, 1000)
}

function getDateAndTime() {
    var now = new Date()

    let newTime = formatTime(now.getHours(), now.getMinutes(), now.getSeconds())

    let newDate = [now.getDate().toString().padStart(2, '0'),
    now.getMonth().toString().padStart(2, '0')
        , now.getFullYear().toString().padStart(2, '0')].join('.')

    return newDate + " " + newTime
}

let elapsedTime = 0

function formatTime(hours, minutes, seconds) {
    let timeString = hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0')

    return timeString
}

function updateTimer() {
    let currentTime = new Date().getTime()

    elapsedTime = currentTime - timerStartTime

    // calculate hours, minutes, and seconds
    let hours = Math.floor(elapsedTime / 3600000)
    let minutes = Math.floor((elapsedTime % 3600000) / 60000)
    let seconds = Math.floor((elapsedTime % 60000) / 1000)

    // format output with leading zeros
    let timeString = formatTime(hours, minutes, seconds)

    patientDOM["TQtime"].innerHTML = timeString
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}



function createTable(patient) {
    let patientInfo = document.querySelector(".patient-info")
    patientInfo.style.border = "1px solid black"
    let patientValues = Object.keys(patient)

    for (let i = 0; i < patientValues.length; i++) {
        let rowDiv = document.createElement("div")
        rowDiv.classList.add("row")
        let colDiv = document.createElement("div")
        colDiv.classList.add("column")
        rowDiv.appendChild(colDiv)
        let p = document.createElement("p")
        p.textContent = values[i]
        colDiv.appendChild(p)
        patientInfo.appendChild(rowDiv)
        let updateDiv = document.createElement("div")
        updateDiv.classList.add("column")
        let updateP = document.createElement("p")
        let span = document.createElement("span")
        span.innerHTML = patient[patientValues[i]]
        span.id = patientValues[i]
        updateP.appendChild(span)
        updateDiv.appendChild(updateP)
        let editButton = document.createElement("button")
        editButton.classList.add("editButton")
        const editButtonListener = e => {
            let input = document.createElement("input")
            input.type = "text"
            let btn = document.createElement("button")
            btn.innerHTML = "edit"
            const btnEventListener = e => {
                input.remove()
                btn.remove()
                let newValue = parseInt(input.value)
                if (!isNaN(newValue)) {
                    span.innerHTML = input.value
                }
                btn.removeEventListener('click', btnEventListener)
                editButton.addEventListener('click', editButtonListener)
            }
            btn.addEventListener('click', btnEventListener)
            editButton.removeEventListener('click', editButtonListener)
            updateDiv.appendChild(input)
            updateDiv.appendChild(btn)
        }
        editButton.addEventListener('click', editButtonListener)
        updateDiv.appendChild(editButton)
        rowDiv.appendChild(updateDiv)
    }
}
