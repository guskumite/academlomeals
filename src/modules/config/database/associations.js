import Restaurant from '../../restaurants/restaurant.model.js';
import Review from '../../reviews/review.model.js';
import User from '../../users/users.model.js';
import Meal from '../../meals/meal.model.js';

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
};
