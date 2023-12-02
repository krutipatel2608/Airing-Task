module.exports = (sequelize,Sequelize) => {
   const userModel = sequelize.define(
    'user',
    {
        name: {
            type: Sequelize.STRING(150),
            notNull : true
        },
        email: {
            type: Sequelize.STRING(50),
            notNull: true,
            unique: true
        },
        phone: {
            type: Sequelize.STRING(10),
            notNull : true 
        },
        password: {
            type: Sequelize.STRING(250),
            notNull : true 
        }
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'user'
      }
   )

   return userModel
}