import { startExercise } from "./script.js"

export class Patient {
    constructor(sysRR = 120, dRR = 70, breathing = 12, pulss = 70, SpO2 = 98, temp = 37.0, turned = 1, turnedIV = 100, ketamineEf = 1, TQtime = 0, TQon = 0) {
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

export class PatientDOM {
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

export const values = [
    "SysRR",
    "DiastRR",
    "Hingamissagedus",
    "Pulss",
    "SpO2",
    "Temperatuur",
    "Keeramine",
    "KetamineIV",
    "KetamineEf",
    "TQ peal olnud",
    "TQ peal"
]

export function getPatientInfoElements() {
    let patientDom = new PatientDOM(
        document.getElementById("sysRR"),
        document.getElementById("dRR"),
        document.getElementById("breathing"),
        document.getElementById("pulss"),
        document.getElementById("SpO2"),
        document.getElementById("temp"),
        document.getElementById("turned"),
        document.getElementById("ketamineIV"),
        document.getElementById("ketamineEf"),
        document.getElementById("TQtime"),
        document.getElementById("TQon"))
    return patientDom
}


export function inputForm() {
    let patientInfo = document.querySelector(".patient-info")
    let newDiv = document.createElement("div")
    newDiv.classList.add("customPatient")
    let form = document.createElement("form")
    form.id = "customPatient"
    form.classList.add("column")
    createInputs(form)
    let btn = document.createElement("button")
    btn.setAttribute("type", "submit")
    btn.innerHTML = "Create custom patient"
    form.appendChild(btn)
    newDiv.appendChild(form)
    patientInfo.appendChild(newDiv)

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        let customValues = document.querySelectorAll("input:not(.weigth #tqFromStart)")
        let newPatient = new Patient()
        for (let i = 0; i < customValues.length; i++) {
            let value = customValues[i].id.replace("Form", "")
            if (customValues[i].value != "" && value != "tqFromStart") {
                newPatient[value] = parseInt(customValues[i].value)
            }
        }
        startExercise(newPatient)
    })

}

function createInputs(parent) {
    let newPatient = new Patient()

    let patientValues = Object.keys(newPatient)
    for (let i = 0; i < patientValues.length; i++) {
        let input = document.createElement("input")
        let label = document.createElement("label")
        input.id = patientValues[i] + "Form"
        input.type = "text"
        label.setAttribute("for", input.id)
        label.innerHTML = values[i]
        parent.appendChild(label)
        parent.appendChild(input)
    }
}