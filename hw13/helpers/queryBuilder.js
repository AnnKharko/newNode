module.exports = (query = {}) => {
    const {
        limit = 10, page = 1, sortBy = 'age', order = 'asc', ...filters
    } = query;
    const skip = (page - 1) * limit;
    const keys = Object.keys(filters);
    // const filterObject = {};
    const orderBy = order === 'asc' ? -1 : 1;
    const sort = { [sortBy]: orderBy };
    return {
        filters,
        skip,
        keys,
        sort,
        limit,
        page
    };
};
