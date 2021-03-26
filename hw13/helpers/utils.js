module.exports = {
    nameNormalizator: (name = '') => {
        if (!name) {
            return '';
        }

        name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Crème Brulée => Creme Brulee
        name = name.replace(/[.,{}<>*+&^%@?:'"-]/g, ' ');
        name = name.split(' ').filter((char) => !!char); // John     Doe => [John, Doe]
        name = name.map((string) => string.toLowerCase());// [john, DOE]=>[john, doe]
        name = name.map((string) => string.charAt(0).toUpperCase() + string.slice(1));// [john, doe]=>[John, Doe]
        name = name.join(' ').trim();
        return name;
    }
};
