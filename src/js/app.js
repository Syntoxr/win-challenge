// Initialize socket at the top level
const socket = io();

// Replace hardcoded participants and challenges with API calls
async function loadData() {
    try {
        const [participantsResponse, challengesResponse] = await Promise.all([
            fetch('/api/participants'),
            fetch('/api/challenges')
        ]);
        
        const participants = await participantsResponse.json();
        const challenges = await challengesResponse.json();
        
        return { participants, challenges };
    } catch (error) {
        console.error('Error loading data:', error);
        return { participants: [], challenges: [] };
    }
}

async function createCheckbox(participant, challenge) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `participant-${participant.id}-challenge-${challenge.id}`;
    checkbox.className = "challenge-checkbox";
    
    // Load saved state and await the result
    const state = await StorageManager.loadState(participant.id, challenge.id);
    checkbox.checked = state;

    checkbox.addEventListener("change", async (e) => {
        const data = {
            participantId: participant.id,
            challengeId: challenge.id,
            checked: e.target.checked,
        };
        // Wait for state to be saved before emitting
        await StorageManager.saveState(participant.id, challenge.id, e.target.checked);
        socket.emit("toggleCheckbox", data);
    });

    return checkbox;
}

async function createGrid(participants, challenges) {
    // Create participant headers
    const participantHeaders = document.getElementById("participant-headers");
    participants.forEach(participant => {
        const header = document.createElement("div");
        header.className = "participant-cell";
        header.textContent = participant.name;
        participantHeaders.appendChild(header);
    });

    // Create challenge rows
    const gridBody = document.getElementById("challenge-grid-body");
    for (const challenge of challenges) {
        const row = document.createElement("div");
        row.className = "challenge-row";
        
        const challengeName = document.createElement("div");
        challengeName.className = "challenge-name";
        challengeName.textContent = challenge.name;
        row.appendChild(challengeName);

        for (const participant of participants) {
            const cell = document.createElement("div");
            cell.className = "checkbox-cell";
            const checkbox = await createCheckbox(participant, challenge);
            cell.appendChild(checkbox);
            row.appendChild(cell);
        }

        gridBody.appendChild(row);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const { participants, challenges } = await loadData();
    // Wait for grid creation to complete
    await createGrid(participants, challenges);

    // Handle incoming updates
    socket.on("checkboxUpdated", async (data) => {
        const checkbox = document.getElementById(
            `participant-${data.participantId}-challenge-${data.challengeId}`
        );
        if (checkbox) {
            checkbox.checked = data.checked;
            // Update local storage when receiving updates
            await StorageManager.saveState(
                data.participantId,
                data.challengeId,
                data.checked
            );
        }
    });
});