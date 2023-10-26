import Restaurant from '../../restaurants/restaurant.model.js';
import Review from '../../reviews/review.model.js';
import User from '../../users/users.model.js';
import Meal from '../../meals/meal.model.js';
import Order from '../../orders/order.model.js';

export const initModel = () => {
  User.hasMany(Review, {
    foreignKey: 'userId',
    as: 'UserToReviews',
  });
  Review.belongsTo(User, {
    foreignKey: 'userId',
    as: 'ReviewToUser',
  });

  Restaurant.hasMany(Review, {
    foreignKey: 'restaurantId',
    as: 'RestaurantToReviews',
  });
  Review.belongsTo(Restaurant, {
    foreignKey: 'restaurantId',
    as: 'ReviewToRestaurant',
  });

  Restaurant.hasMany(Meal, {
    foreignKey: 'restaurantId',
    as: 'RestaurantToMeals',
  });

  Meal.belongsTo(Restaurant, {
    foreignKey: 'restaurantId',
    as: 'MealToRestaurant',
  });

  User.hasMany(Order, {
    foreignKey: 'userId',
    as: 'UserToOrders',
  });

  Order.belongsTo(User, {
    foreignKey: 'userId',
    as: 'OrderToUser',
  });

  Meal.hasMany(Order, {
    foreignKey: 'mealId',
    as: 'MealToOrders',
  });

  Order.belongsTo(Meal, {
    foreignKey: 'mealId',
    as: 'OrderToMeal',
  });
};
