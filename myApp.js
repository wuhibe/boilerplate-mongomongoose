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
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {
      name: personName
    },
    {
      age: ageToSet
    },
    {
      new: true
    }
  ).then(doc => {
    done(null, doc);
  })
    .catch(err => {
      console.error(err)
    })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({
    _id: personId
  })
    .then(response => {
      done(null, response);
    })
    .catch(err => {
      console.error(err)
    });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function(err, people) {
      if (err) return console.log(err);
      done(null, people);
    });
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
