export default function calculateSkillDegree(activities) {
    const total = activities.length;
    const colorCounts = {
        blue: activities.filter(activity => activity.degree === 'blue').length,
        yellow: activities.filter(activity => activity.degree === 'yellow').length,
        green: activities.filter(activity => activity.degree === 'green').length,
    };
    const percentages = {
        blue: (colorCounts.blue / total) * 100,
        yellow: (colorCounts.yellow / total) * 100,
        green: (colorCounts.green / total) * 100,
    };
    const dominantColor = Object.keys(percentages).reduce((a, b) => percentages[a] > percentages[b] ? a : b);
    return dominantColor;
};