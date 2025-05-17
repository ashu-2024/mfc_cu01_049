const { MongoClient } = require("mongodb");

async function run() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("order_management");
    const orders = db.collection("orders");

    const shippedOrders = await orders.find({ order_status: "shipped" }).toArray();
    console.log(shippedOrders);

    await orders.updateOne({ order_id: 1 }, { $set: { total_amount: 70000 } });

    await orders.deleteOne({ order_id: 4 });

    const aliceOrder = await orders.findOne({ customer_name: "Alice Johnson" });
    console.log(aliceOrder);

    await orders.updateOne({ order_id: 2 }, { $set: { order_status: "delivered" } });

    const highValueOrders = await orders.find({ total_amount: { $gte: 15000 } }).toArray();
    console.log(highValueOrders);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
