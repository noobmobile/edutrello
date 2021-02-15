export function getAbbreviation(name){
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

export const currentUser = 2

export const defaultRule = [
    {
        required: true,
        message: "Preencha todos campos",
    }
]