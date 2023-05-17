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

let patientDOM = getPatientInfoElements()
let TQbutton = document.getElementById("TQbutton")
let start = document.getElementById("start")
let newPatient = new Patient(120, 70, 12, 70, 98, 37.0, 1, 100, 1, 0, 0)
var clock = document.getElementById("time")
var date = document.getElementById("date")
console.log(newPatient)

TQbutton.addEventListener('click', () => {
    newPatient.TQtime = clock.innerHTML
    newPatient.TQon = true
    updatePatientDOM(newPatient, patientDOM)
})

console.log(patientDOM)

function updatePatientDOM(patient, patientDOM) {
    let patientValues = Object.keys(patient)
    for (let i = 0; i < patientValues.length; i++) {
        patientDOM[patientValues[i]].innerHTML = patient[patientValues[i]]
    }
}

updatePatientDOM(newPatient, patientDOM)

var minute = 0

function updateClock() {
    var now = new Date()
    var newMinute = now.getMinutes()
    if (newMinute != minute) {
        minute = newMinute
        newPatient.turned = (newPatient.turned - 0.033).toFixed(3)
        newPatient.sysRR = (newPatient.sysRR -= 0.001).toFixed(3)
        newPatient.ketamineIV = (newPatient.ketamineIV -= 0.462).toFixed(3)

        updatePatientDOM(newPatient, patientDOM)
    }
    let time = now.getHours() + ":" + newMinute + ":" + now.getSeconds()
    let newDate = [now.getDate(), now.getMonth(), now.getFullYear()].join('.')
    if (start.innerHTML == 0) {
        start.innerHTML = newDate + time
    }
    clock.innerHTML = time
    date.innerHTML = newDate
    setTimeout(updateClock, 1000)
}

updateClock()