"use strict";

//////////////////////////////////////////////////////////////
//////////////////// Input variables /////////////////////////
//////////////////////////////////////////////////////////////

const heightInput = document.querySelector(".height--input");
const weightInput = document.querySelector(".weight--input");
const ageInput = document.querySelector(".age--input");
const genderInput = document.querySelector(".gender--input");
const activityInput = document.querySelector(".activity--input");
const workoutsInput = document.querySelector(".workouts--input");
const calDistributionInput = document.querySelector(
  ".cal--distribution--input"
);
const mealsInput = document.querySelector(".meals--input");
const goalInput = document.querySelector(".goal--input");
const goalWeightInput = document.querySelector(".goal--weight--input");

//////////////////////////////////////////////////////////////
//////////////////// Results variables ///////////////////////
//////////////////////////////////////////////////////////////

const kcalResult = document.querySelector(".kcal--result");
const kcalPerMealResult = document.querySelector(".kcal--meal--result");
const tdeeResult = document.querySelector(".tdee--result");
const bmiResult = document.querySelector(".bmi--result");
const bmiCategory = document.querySelector(".bmi--category");
const timeToGoalDaysResult = document.querySelector(".goal--days--result");
const timeToGoalDateResult = document.querySelector(".goal--date--result");
const waterIntakeResult = document.querySelector(".water--intake--result");
const proteinResult = document.querySelector(".protein--result");
const proteinPerMealResult = document.querySelector(".protein--meal--result");
const proteinKcalResult = document.querySelector(".protein--kcal--result");
const proteinPercentResult = document.querySelector(
  ".protein--percent--result"
);
const carbsResult = document.querySelector(".carbs--result");
const carbsPerMealResult = document.querySelector(".carbs--meal--result");
const carbsKcalResult = document.querySelector(".carbs--kcal--result");
const carbsPercentResult = document.querySelector(".carbs--percent--result");
const fatsResult = document.querySelector(".fats--result");
const fatsPerMealResult = document.querySelector(".fats--meal--result");
const fatsKcalResult = document.querySelector(".fats--kcal--result");
const fatsPercentResult = document.querySelector(".fats--percent--result");

//////////////////////////////////////////////////////////////
///////////////////// Button variables ///////////////////////
//////////////////////////////////////////////////////////////

const btnCalc = document.querySelector(".btn--calc");
const btnReset = document.querySelector(".btn--reset");

//////////////////////////////////////////////////////////////
/////////////////////// Functions ////////////////////////////
//////////////////////////////////////////////////////////////

const gender = () => {
  if (genderInput.value === "male") return 5;
  if (genderInput.value === "female") return -161;
};

//////////////////////////////////////////////////////////////
//////////////////////// Calc kcal ///////////////////////////
//////////////////////////////////////////////////////////////

const kcal = () => {
  const goal = +goalInput.value;
  const kcal = Math.trunc(
    (+weightInput.value * 10 +
      +heightInput.value * 6.25 -
      +ageInput.value * 5 +
      gender()) *
      +activityInput.value *
      goal
  );
  return kcal;
};

const calcKcal = () => {
  kcalResult.textContent = `${kcal()} kcal`;
  tdeeResult.textContent = `${Math.round(kcal() / activityInput.value)} kcal`;
  kcalPerMealResult.textContent = `${Math.round(
    kcal() / mealsInput.value
  )} kcal/meal`;
};

//////////////////////////////////////////////////////////////
///////////////////////// Calc bmi ///////////////////////////
//////////////////////////////////////////////////////////////

const calcBmi = () => {
  const bmi = +weightInput.value / (+heightInput.value / 100) ** 2;
  bmiResult.textContent = +bmi.toFixed(2);
  return bmi;
};

const bmiLevel = () => {
  if (calcBmi() < 18.5) bmiCategory.textContent = "Underweight";
  else if (calcBmi() >= 18.5 && calcBmi() < 25)
    bmiCategory.textContent = "Normal weight";
  else if (calcBmi() >= 25 && calcBmi() < 30)
    bmiCategory.textContent = "Overweight";
  else if (calcBmi() >= 30) bmiCategory.textContent = "Obese";
};

//////////////////////////////////////////////////////////////
///////////////////////// Calc days //////////////////////////
//////////////////////////////////////////////////////////////

// const calcDays = () => {
//   const goalPlan = () => {
//     if
//   };
//   const days =
//     Math.abs(+goalWeightInput.value - +weightInput.value) /
//     (+goalInput.value / 7);
//   return days;
// };

//////////////////////////////////////////////////////////////
////////////////////// Water intake //////////////////////////
//////////////////////////////////////////////////////////////

const waterIntake = () => {
  const waterIntake =
    (+weightInput.value * 2.2046 * 0.67 +
      ((+workoutsInput.value * 60) / 30 / 7) * 12) /
    33.814;
  waterIntakeResult.textContent = `${waterIntake.toFixed(2)} L/day`;
};

//////////////////////////////////////////////////////////////
/////////////////// Calc micronutrients //////////////////////
//////////////////////////////////////////////////////////////

const calcMicronutrients = () => {
  let proteinPercent;
  let carbsPercent;
  let fatsPercent;
  if (calDistributionInput.value === "1") {
    proteinPercent = 0.3;
    carbsPercent = 0.4;
    fatsPercent = 0.3;
  }
  if (calDistributionInput.value === "2") {
    proteinPercent = 0.4;
    carbsPercent = 0.4;
    fatsPercent = 0.2;
  }
  if (calDistributionInput.value === "3") {
    proteinPercent = 0.4;
    carbsPercent = 0.2;
    fatsPercent = 0.4;
  }
  if (calDistributionInput.value === "4") {
    proteinPercent = 0.3;
    carbsPercent = 0.1;
    fatsPercent = 0.6;
  }

  proteinResult.textContent = `${Math.round((kcal() * proteinPercent) / 4)}g`;
  proteinPerMealResult.textContent = `${Math.round(
    (kcal() * proteinPercent) / 4 / +mealsInput.value
  )}g/meal`;
  proteinKcalResult.textContent = `${Math.round(kcal() * proteinPercent)}kcal`;
  proteinPercentResult.textContent = `${proteinPercent * 100}%`;
  carbsResult.textContent = `${Math.round((kcal() * carbsPercent) / 4)}g`;
  carbsPerMealResult.textContent = `${Math.round(
    (kcal() * carbsPercent) / 4 / +mealsInput.value
  )}g/meal`;
  carbsKcalResult.textContent = `${Math.round(kcal() * carbsPercent)}kcal`;
  carbsPercentResult.textContent = `${carbsPercent * 100}%`;
  fatsResult.textContent = `${Math.round((kcal() * fatsPercent) / 9)}g`;
  fatsPerMealResult.textContent = `${Math.round(
    (kcal() * fatsPercent) / 9 / +mealsInput.value
  )}g/meal`;
  fatsKcalResult.textContent = `${Math.round(kcal() * fatsPercent)}kcal`;
  fatsPercentResult.textContent = `${fatsPercent * 100}%`;
};

//////////////////////////////////////////////////////////////
/////////////////////// Event handlers ///////////////////////
//////////////////////////////////////////////////////////////

document.querySelector(".btn--calc").addEventListener("click", function () {
  calcKcal();
  calcBmi();
  bmiLevel();
  calcMicronutrients();
  waterIntake();
});

document.querySelector(".btn--reset").addEventListener("click", function () {
  document.querySelector("form").reset();
  kcalResult.textContent = "";
  kcalPerMealResult.textContent = "";
  tdeeResult.textContent = "";
  bmiResult.textContent = "";
  bmiCategory.textContent = "";
  waterIntakeResult.textContent = "";
  proteinResult.textContent = "";
  proteinPerMealResult.textContent = "";
  proteinKcalResult.textContent = "";
  proteinPercentResult.textContent = "";
  carbsResult.textContent = "";
  carbsPerMealResult.textContent = "";
  carbsKcalResult.textContent = "";
  carbsPercentResult.textContent = "";
  fatsResult.textContent = "";
  fatsPerMealResult.textContent = "";
  fatsKcalResult.textContent = "";
  fatsPercentResult.textContent = "";
});

//TODO Validation
