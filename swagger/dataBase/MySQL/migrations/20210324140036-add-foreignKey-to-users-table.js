module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addConstraint('users', {
            fields: ['authId'],
            type: 'foreign key',
            name: 'custom_fkey_user',
            references: {
                table: 'o_auths',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    down: async (queryInterface) => {
        await queryInterface.removeConstraint('users', 'custom_fkey_user');
    }
};
