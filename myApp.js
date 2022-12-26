require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let p = new Person({
    name: 'Wuhibe Tamire',
    age: 23,
    favoriteFoods: ['rice', 'pizza', 'chicken']
  });
  p.save((err, data) => {
    if (data) done(null, data);
    else done(null, err);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  arrayOfPeople.forEach(element => {
    let p = new Person(element);
    p.save((err, data) => {
      if (data) done(null, data);
      else done(null, err);
    });
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName })
    .then(p => { done(null, p); })
    .catch(err => { done(null, err); });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food })
    .then(p => { done(null, p); })
    .catch(err => { done(null, err); });
};

const findPersonById = (personId, done) => {
  Person.findOne({ _id: personId })
    .then(p => { done(null, p); })
    .catch(err => { done(null, err); });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
 * You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
