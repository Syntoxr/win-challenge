const StorageManager = {
    saveState: async (participantId, challengeId, checked) => {
        try {
            const response = await fetch('/api/save-state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    participantId,
                    challengeId,
                    checked
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save state');
            }
        } catch (error) {
            console.error('Error saving state:', error);
        }
    },

    loadState: async (participantId, challengeId) => {
        try {
            const response = await fetch(`/api/get-state/${participantId}/${challengeId}`);
            if (!response.ok) {
                throw new Error('Failed to load state');
            }
            const data = await response.json();
            return data.checked;
        } catch (error) {
            console.error('Error loading state:', error);
            return false;
        }
    },

    loadAllStates: async () => {
        try {
            const response = await fetch('/api/get-all-states');
            if (!response.ok) {
                throw new Error('Failed to load states');
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading all states:', error);
            return {};
        }
    }
};