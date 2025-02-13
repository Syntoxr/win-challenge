// Remove export and make it globally available
window.participants = [
  { id: 1, name: "Alice", completedChallenges: [] },
  { id: 2, name: "Bob", completedChallenges: [] },
  { id: 3, name: "Charlie", completedChallenges: [] },
  { id: 4, name: "Diana", completedChallenges: [] },
];

window.addParticipant = function (name) {
  const newId = participants.length
    ? participants[participants.length - 1].id + 1
    : 1;
  participants.push({ id: newId, name, completedChallenges: [] });
};

window.toggleParticipantChallenge = function (participantId, challengeId) {
  const participant = participants.find((p) => p.id === participantId);
  if (participant) {
    const index = participant.completedChallenges.indexOf(challengeId);
    if (index === -1) {
      participant.completedChallenges.push(challengeId);
    } else {
      participant.completedChallenges.splice(index, 1);
    }
  }
};
