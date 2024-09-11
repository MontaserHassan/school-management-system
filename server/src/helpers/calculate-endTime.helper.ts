const addTime = (startTime: string, duration: string): string => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const totalMinutes = parseInt(duration);
    const durationHours = Math.floor(totalMinutes / 60);
    const durationMinutes = totalMinutes % 60;
    let endHours = startHours + durationHours;
    let endMinutes = startMinutes + durationMinutes;
    if (endMinutes >= 60) {
        endMinutes -= 60;
        endHours += 1;
    };
    endHours = endHours % 24;
    return `${endHours}:${endMinutes.toString().padStart(2, '0')}`;
};



export {
    addTime,
};