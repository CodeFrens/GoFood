const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoURL = "mongodb://gofood:prabhatkg2003@ac-dx4ihwv-shard-00-00.e7afmpb.mongodb.net:27017,ac-dx4ihwv-shard-00-01.e7afmpb.mongodb.net:27017,ac-dx4ihwv-shard-00-02.e7afmpb.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-t4vfah-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDB = async () => {
    await mongoose.connect(
        mongoURL, { useNewUrlParser: true },
        async (err, res) => {
            if (err) console.log("---", err);
            else {
                console.log("connected");
                const fetched_data = await mongoose.connection.db.collection("food_items");
                fetched_data.find({}).toArray(async function (err, data) {
                    const foodCategory = await mongoose.connection.db.collection("foodCategory");
                    foodCategory.find({}).toArray(function (err, catData) {
                        if (err) console.log(err);
                        else{
                            global.food_items = data;
                            global.foodCategory = catData;
                        }
                    })
                });
            }
        }
    );
};

module.exports = mongoDB;
