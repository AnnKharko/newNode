module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addConstraint('o_auths', {
            fields: ['user'],
            type: 'foreign key',
            name: 'custom_fkey_auth',
            references: {
                table: 'users',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    down: async (queryInterface) => {
        await queryInterface.removeConstraint('o_auth', 'custom_fkey_auth');
    }
};
