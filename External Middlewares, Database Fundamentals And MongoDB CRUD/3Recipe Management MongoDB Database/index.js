const { MongoClient } = require("mongodb");

async function run() {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  const db = client.db("recipeDB");
  const recipes = db.collection("recipes");

  // Insert sample data (run once)
  // await recipes.insertMany([
  //   { recipe_id: 1, name: "Spaghetti Carbonara", ingredients: ["Spaghetti","Eggs","Pancetta","Parmesan","Black Pepper"], cuisine: "Italian", prep_time: 20, difficulty: "easy", price: 500 },
  //   { recipe_id: 2, name: "Chicken Biryani", ingredients: ["Rice","Chicken","Yogurt","Spices","Onion"], cuisine: "Indian", prep_time: 60, difficulty: "medium", price: 800 },
  //   { recipe_id: 3, name: "Sushi", ingredients: ["Rice","Nori","Fish","Soy Sauce","Wasabi"], cuisine: "Japanese", prep_time: 50, difficulty: "hard", price: 1200 },
  //   { recipe_id: 4, name: "Caesar Salad", ingredients: ["Romaine Lettuce","Croutons","Parmesan","Caesar Dressing"], cuisine: "American", prep_time: 15, difficulty: "easy", price: 400 },
  //   { recipe_id: 5, name: "Tacos", ingredients: ["Tortilla","Beef","Lettuce","Cheese","Tomato"], cuisine: "Mexican", prep_time: 25, difficulty: "easy", price: 450 },
  //   { recipe_id: 6, name: "Ratatouille", ingredients: ["Eggplant","Tomato","Zucchini","Bell Pepper","Onion"], cuisine: "French", prep_time: 40, difficulty: "medium", price: 700 },
  //   { recipe_id: 7, name: "Pad Thai", ingredients: ["Rice Noodles","Shrimp","Peanuts","Bean Sprouts","Egg"], cuisine: "Thai", prep_time: 30, difficulty: "medium", price: 600 },
  //   { recipe_id: 8, name: "Beef Wellington", ingredients: ["Beef","Puff Pastry","Mushrooms","Egg","Butter"], cuisine: "British", prep_time: 90, difficulty: "hard", price: 1500 },
  //   { recipe_id: 9, name: "Falafel", ingredients: ["Chickpeas","Onion","Garlic","Parsley","Spices"], cuisine: "Middle Eastern", prep_time: 35, difficulty: "medium", price: 350 },
  //   { recipe_id: 10, name: "Tom Yum Soup", ingredients: ["Shrimp","Lemongrass","Mushrooms","Lime","Chili"], cuisine: "Thai", prep_time: 25, difficulty: "medium", price: 550 },
  // ]);

  // 1. Retrieve all recipes with cuisine "Italian".
  const italian = await recipes.find({ cuisine: "Italian" }).toArray();

  // 2. Retrieve all recipes with prep_time < 30
  const prepLess30 = await recipes.find({ prep_time: { $lt: 30 } }).toArray();

  // 3. Retrieve recipes price > 500
  const priceGt500 = await recipes.find({ price: { $gt: 500 } }).toArray();

  // 4. Retrieve all recipes sorted by price ascending
  const sortedPrice = await recipes.find().sort({ price: 1 }).toArray();

  // 5. Update price of recipe_id:2 to 900
  await recipes.updateOne({ recipe_id: 2 }, { $set: { price: 900 } });

  // 6. Retrieve only name and price for all recipes
  const namePrice = await recipes.find({}, { projection: { _id: 0, name: 1, price: 1 } }).toArray();

  // 7. Retrieve recipes with difficulty "medium" and price < 600
  const mediumPriceLt600 = await recipes.find({ difficulty: "medium", price: { $lt: 600 } }).toArray();

  // 8. Retrieve all recipes sorted by prep_time descending
  const sortedPrepDesc = await recipes.find().sort({ prep_time: -1 }).toArray();

  // 9. Insert new recipe Chocolate Cake
  await recipes.insertOne({
    recipe_id: 11,
    name: "Chocolate Cake",
    ingredients: ["Flour", "Sugar", "Cocoa Powder", "Eggs", "Butter"],
    cuisine: "American",
    prep_time: 50,
    difficulty: "medium",
    price: 750,
  });

  // 10. Delete recipe with recipe_id:4 (Caesar Salad)
  await recipes.deleteOne({ recipe_id: 4 });

  // 11. Retrieve all recipes with cuisine "Japanese" or "Thai"
  const japOrThai = await recipes.find({ cuisine: { $in: ["Japanese", "Thai"] } }).toArray();

  // 12. Retrieve recipes where ingredients include "Egg"
  const containsEgg = await recipes.find({ ingredients: "Egg" }).toArray();

  // 13. Update prep_time of recipe_id:7 (Pad Thai) to 35
  await recipes.updateOne({ recipe_id: 7 }, { $set: { prep_time: 35 } });

  // 14. Delete all recipes where price > 1000
  await recipes.deleteMany({ price: { $gt: 1000 } });

  // 15. Retrieve first 3 recipes using limit
  const first3 = await recipes.find().limit(3).toArray();

  // 16. Skip first 2 recipes and retrieve rest
  const skip2 = await recipes.find().skip(2).toArray();

  // 17. Retrieve recipes with cuisine "Thai" sorted by price descending
  const thaiSortedPriceDesc = await recipes.find({ cuisine: "Thai" }).sort({ price: -1 }).toArray();

  // 18. Insert another new recipe Hummus
  await recipes.insertOne({
    recipe_id: 12,
    name: "Hummus",
    ingredients: ["Chickpeas", "Tahini", "Garlic", "Olive Oil", "Lemon Juice"],
    cuisine: "Middle Eastern",
    prep_time: 15,
    difficulty: "easy",
    price: 300,
  });

  // 19. Count number of recipes with difficulty "easy"
  const easyCount = await recipes.countDocuments({ difficulty: "easy" });

  // 20. Retrieve recipes with prep_time > 40
  const prepGt40 = await recipes.find({ prep_time: { $gt: 40 } }).toArray();

  console.log({
    italian,
    prepLess30,
    priceGt500,
    sortedPrice,
    namePrice,
    mediumPriceLt600,
    sortedPrepDesc,
    japOrThai,
    containsEgg,
    first3,
    skip2,
    thaiSortedPriceDesc,
    easyCount,
    prepGt40,
  });

  await client.close();
}

run();
