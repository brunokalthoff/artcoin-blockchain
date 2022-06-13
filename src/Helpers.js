
export const startUpperCase = str => {
    const upper = str.charAt(0).toUpperCase() + str.slice(1);
    return upper;
}

export const getTitle = (from, to, amount) => {
    const title = 'From: ' + from + '\nTo: ' + to + '\nAmount: ' + amount;
    document.querySelector("#txInfo").title = title;
}