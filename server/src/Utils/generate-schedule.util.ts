export default function generateSchedule(): string {
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    return `#${randomNumber}`;
};