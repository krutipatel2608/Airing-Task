module.exports = (sequelize, Sequelize) => {
    const taskModel = sequelize.define(
        'task', 
        {
            title:{
                type: Sequelize.STRING,
                notNull: true
            },
            description: {
                type: Sequelize.STRING,
                notNull: false
            },
            due_date: {
                type: Sequelize.DATEONLY,
                notNull: true
            }
        },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            tableName: 'task'
          }
    )

    return taskModel
}