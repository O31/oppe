class Patient {
    constructor(sysRR, dRR, breathing, pulss, SpO2, temp, turned, turnedIV, ketamineEf, TQtime, TQon) {
        this.sysRR = sysRR;
        this.dRR = dRR;
        this.breathing = breathing;
        this.pulss = pulss;
        this.SpO2 = SpO2;
        this.temp = temp;
        this.turned = turned;
        this.ketamineIV = turnedIV;
        this.ketamineEf = ketamineEf;
        this.TQtime = TQtime;
        this.TQon = TQon
    }
}

class PatientDOM {
    constructor(sysRR, dRR, breathing, pulss, SpO2, temp, turned, turnedIV, ketamineEf, TQtime, TQon) {
        this.sysRR = sysRR;
        this.dRR = dRR;
        this.breathing = breathing;
        this.pulss = pulss;
        this.SpO2 = SpO2;
        this.temp = temp;
        this.turned = turned;
        this.ketamineIV = turnedIV;
        this.ketamineEf = ketamineEf;
        this.TQtime = TQtime;
        this.TQon = TQon
    }
}

function getPatientInfoElements() {
    let patientDom = new PatientDOM(
        document.getElementById("sysRR"),
        document.getElementById("diastRR"),
        document.getElementById("breathing"),
        document.getElementById("pulss"),
        document.getElementById("SpO2"),
        document.getElementById("temp"),
        document.getElementById("turned"),
        document.getElementById("turnedIV"),
        document.getElementById("ketamineEf"),
        document.getElementById("TQtime"),
        document.getElementById("TQon"))
    return patientDom
}



let startTime = document.getElementById("startTime")
let currentDate = document.getElementById("currentDate")
var startBtn = document.getElementById("start-exec")

let patientDOM
let newPatient
let TQbutton
let TQtimerStartButton
let TQonTime
let TQtimerId
var timeLeft = 30;
var TQtimer
let timerStartTime
let secondCounter = 0
let started = false



startBtn.addEventListener('click', startExercise)
updateClock()

function startExercise() {//activates after start button click, creates a new patient, activates TQ buttons, 
    newPatient = new Patient(120, 70, 12, 70, 98, 37.0, 1, 100, 1, 0, 0)//starts updating patient data
    patientDOM = getPatientInfoElements()
    updatePatientDOM(newPatient, patientDOM)

    TQbutton = document.getElementById("TQbutton")
    TQtimerStartButton = document.getElementById("TQtimerStart")
    TQonTime = document.getElementById("TQonTime")
    TQtimer = document.getElementById('TQtimer');

    TQtimerStartButton.addEventListener('click', TQtimerStart)
    let dateAndTime = getDateAndTime()

    startTime.innerHTML = "Started at: " + dateAndTime
    started = true


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
    }

    if (secondCounter >= 60) {
        secondCounter = 0
        newPatient.turned = (newPatient.turned - 0.033).toFixed(3)
        newPatient.sysRR = (newPatient.sysRR -= 0.001).toFixed(3)
        newPatient.ketamineIV = (newPatient.ketamineIV -= 0.462).toFixed(3)

        updatePatientDOM(newPatient, patientDOM)
    }

    let dateAndTime = getDateAndTime()

    currentDate.innerHTML = dateAndTime
    setTimeout(updateClock, 1000)
}

function getDateAndTime() {
    var now = new Date()

    let newTime = now.getHours().toString().padStart(2, '0') + ":"
        + now.getMinutes().toString().padStart(2, '0') + ":"
        + now.getSeconds().toString().padStart(2, '0')

    let newDate = [now.getDate().toString().padStart(2, '0'),
    now.getMonth().toString().padStart(2, '0')
        , now.getFullYear().toString().padStart(2, '0')].join('.')

    return newDate + " " + newTime
}

let elapsedTime = 0

function updateTimer() {
    let currentTime = new Date().getTime()

    elapsedTime = currentTime - timerStartTime

    // calculate hours, minutes, and seconds
    let hours = Math.floor(elapsedTime / 3600000)
    let minutes = Math.floor((elapsedTime % 3600000) / 60000)
    let seconds = Math.floor((elapsedTime % 60000) / 1000)

    // format output with leading zeros
    let timeString = hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0')

    patientDOM["TQtime"].innerHTML = timeString
}