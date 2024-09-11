export default function generateCode(): string {
    const numberLength = Math.floor(Math.random() * 5) + 3;
    const randomNumber = Math.floor(Math.random() * Math.pow(10, numberLength)).toString().padStart(numberLength, '0');
    const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return `${randomChar}${randomNumber}`;
};