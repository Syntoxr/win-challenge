// Remove export and make it globally available
window.challenges = [
  { id: 1, name: "Challenge 1", completed: false },
  { id: 2, name: "Challenge 2", completed: false },
  { id: 3, name: "Challenge 3", completed: false },
  { id: 4, name: "Challenge 4", completed: false },
];

window.addChallenge = function (name) {
  const newChallenge = {
    id: challenges.length + 1,
    name: name,
    completed: false,
  };
  challenges.push(newChallenge);
};

window.toggleChallengeCompletion = function (id) {
  const challenge = challenges.find((challenge) => challenge.id === id);
  if (challenge) {
    challenge.completed = !challenge.completed;
  }
};
