import * as React from "react";

export function getAbbreviation(name){
    if (!name) return null
    if (name.includes(" ")){
        return name.split(" ")[0][0] + name.split(" ")[1][0] // Luiz Eduardo = LE
    }
    return name.substring(0, 2)
}

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const defaultRule = [
    {
        required: true,
        message: "Preencha todos campos",
    }
]

export function downloadFile(title,base64){
    var a = document.createElement("a"); //Create <a>
    a.href = base64; //Image Base64 Goes here
    a.download = title; //File name Here
    a.click(); //Downloaded file
}

export class renderAvatar {
}