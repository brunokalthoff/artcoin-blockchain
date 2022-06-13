export const users = ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'];

export const selectRandomUser = () => {
    return users[Math.floor(Math.random() * 9)];
};