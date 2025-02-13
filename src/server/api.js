const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const STORAGE_FILE = path.join(__dirname, 'data', 'challenges.json');

// Ensure data directory exists
async function ensureDataDir() {
    const dir = path.dirname(STORAGE_FILE);
    await fs.mkdir(dir, { recursive: true });
}

// Initialize empty state if file doesn't exist
async function initializeStateFile() {
    try {
        await ensureDataDir();
        const exists = await fs.access(STORAGE_FILE).then(() => true).catch(() => false);
        if (!exists) {
            const sampleData = {
                participants: [
                    { id: "1", name: "Player 1" },
                    { id: "2", name: "Player 2" }
                ],
                challenges: [
                    { id: "1", name: "Complete Tutorial" },
                    { id: "2", name: "First Achievement" },
                    { id: "3", name: "Win a Game" }
                ],
                completions: {
                    "1": {
                        "1": false,
                        "2": false,
                        "3": false
                    },
                    "2": {
                        "1": false,
                        "2": false,
                        "3": false
                    }
                }
            };
            await writeStateFile(sampleData);
        }
    } catch (error) {
        console.error('Error initializing state file:', error);
    }
}

// Read current state
async function readStateFile() {
    try {
        const data = await fs.readFile(STORAGE_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return {};
        }
        throw error;
    }
}

// Write state to file
async function writeStateFile(data) {
    await ensureDataDir();
    await fs.writeFile(STORAGE_FILE, JSON.stringify(data, null, 2));
}

// Initialize state file when server starts
initializeStateFile();

// API Routes
router.post('/save-state', async (req, res) => {
    try {
        const { participantId, challengeId, checked } = req.body;
        const currentState = await readStateFile();
        
        if (!currentState.completions) {
            currentState.completions = {};
        }
        if (!currentState.completions[participantId]) {
            currentState.completions[participantId] = {};
        }
        currentState.completions[participantId][challengeId] = checked;
        
        await writeStateFile(currentState);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/get-state/:participantId/:challengeId', async (req, res) => {
    try {
        const { participantId, challengeId } = req.params;
        const currentState = await readStateFile();
        const checked = currentState.completions?.[participantId]?.[challengeId] || false;
        res.json({ checked });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/get-all-states', async (req, res) => {
    try {
        const currentState = await readStateFile();
        res.json(currentState.completions || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add new endpoints for participants and challenges
router.get('/participants', async (req, res) => {
    try {
        const data = await readStateFile();
        res.json(data.participants || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/challenges', async (req, res) => {
    try {
        const data = await readStateFile();
        res.json(data.challenges || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;