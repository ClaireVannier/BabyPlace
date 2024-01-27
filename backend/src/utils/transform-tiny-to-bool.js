 function transformTinyIntIntoBoolean(nursery) {
  nursery.developmental_activities = !!nursery.developmental_activities;
  nursery.homemade_meals = !!nursery.homemade_meals;
  nursery.musical_activities = !!nursery.musical_activities;
  nursery.outdoor_space = !!nursery.outdoor_space;
}

module.exports = transformTinyIntIntoBoolean;