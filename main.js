const roleHarvester = require('harvester');
const roleBuilder = require('builder');
const roleUpgrader = require('upgrader');
const roleFighter = require('fighter');
const roleMineralHarvester = require('mineralHarvester');
const roleHealer = require('healer');
const roleScavenger = require('scavenger');
const roleInvader = require('invader');
const roleRepairer = require('repairer');
const creepUtils = require('./utils.creep');  // Fix the path

function getBodyParts(role, energyAvailable) {
    // Base configurations
    const baseParts = {
        harvester: [WORK, CARRY, MOVE],  // Basic harvester (300 energy)
        upgrader: [WORK, CARRY, MOVE],
        builder: [WORK, CARRY, MOVE],
        fighter: [TOUGH, ATTACK, MOVE],
        healer: [HEAL, MOVE],
        mineralHarvester: [WORK, CARRY, MOVE],
        scavenger: [CARRY, CARRY, MOVE, MOVE],
        invader: [CLAIM, MOVE, MOVE],
        repairer: [WORK, CARRY, MOVE]
    };

    // Advanced configurations for when we have more energy
    const advancedParts = {
        harvester: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],  // Advanced harvester (700 energy)
        upgrader: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],  // 850 energy
        builder: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],  // Advanced builder (700 energy)
        repairer: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]  // Advanced repairer (500 energy)
    };

    let parts = [];
    
    // If we have enough energy and role has advanced config, use it
    if((role === 'harvester' && energyAvailable >= 700) || 
       (role === 'upgrader' && energyAvailable >= 850) ||
       (role === 'builder' && energyAvailable >= 700) ||
       (role === 'repairer' && energyAvailable >= 500)) {
        const advancedCost = _.sum(advancedParts[role].map(part => BODYPART_COST[part]));
        const numberOfSets = Math.floor(energyAvailable / advancedCost);
        for(let i = 0; i < Math.min(numberOfSets, 2); i++) {
            parts = parts.concat(advancedParts[role]);
        }
    } else {
        // Otherwise use basic parts
        const baseCost = _.sum(baseParts[role].map(part => BODYPART_COST[part]));
        const numberOfSets = Math.floor(energyAvailable / baseCost);
        for(let i = 0; i < Math.min(numberOfSets, 3); i++) {
            parts = parts.concat(baseParts[role]);
        }
    }
    
    return parts;
}

module.exports.loop = function() {
    // Reset memory if it's from an old game, but preserve creep memory
    if(!Memory.gameStartTime) {
        // Save creep memory
        const creepMemory = Memory.creeps;
        
        // Clear all memory except creeps
        for(let key in Memory) {
            if(key !== 'creeps') {
                delete Memory[key];
            }
        }
        
        // Restore creep memory
        Memory.creeps = creepMemory;
        
        // Initialize fresh memory
        Memory.gameStartTime = Game.time;
        Memory.creepCounts = {
            harvester: _.filter(Game.creeps, c => c.memory.role == 'harvester').length,
            builder: _.filter(Game.creeps, c => c.memory.role == 'builder').length,
            upgrader: _.filter(Game.creeps, c => c.memory.role == 'upgrader').length,
            fighter: _.filter(Game.creeps, c => c.memory.role == 'fighter').length,
            healer: _.filter(Game.creeps, c => c.memory.role == 'healer').length,
            mineralHarvester: _.filter(Game.creeps, c => c.memory.role == 'mineralHarvester').length,
            scavenger: _.filter(Game.creeps, c => c.memory.role == 'scavenger').length,
            repairer: _.filter(Game.creeps, c => c.memory.role == 'repairer').length,
            invader: _.filter(Game.creeps, c => c.memory.role == 'invader').length
        };
        Memory.rooms = {};
        console.log('🎮 New game started! Memory initialized (creep memory preserved).');
    }

    // Clear memory of dead creeps
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Count all creeps
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    let fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter');
    let mineralHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'mineralHarvester');
    let healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
    let scavengers = _.filter(Game.creeps, (creep) => creep.memory.role == 'scavenger');
    let invaders = _.filter(Game.creeps, (creep) => creep.memory.role == 'invader');
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

    // Set target room for invasion (modify this as needed)
    const targetRoom = 'W1N1';  // Example room name

    // Get all rooms under our control
    for(let roomName in Game.rooms) {
        let room = Game.rooms[roomName];
        
        // Only process rooms we own
        if(room.controller && room.controller.my) {
            // Add container construction sites near sources
            let sources = room.find(FIND_SOURCES);
            for(let source of sources) {
                // Find nearby positions
                let positions = room.lookForAtArea(LOOK_TERRAIN, 
                    source.pos.y-1, source.pos.x-1, 
                    source.pos.y+1, source.pos.x+1, true);
                
                // Filter walkable positions
                positions = positions.filter(pos => pos.terrain !== 'wall');
                
                // Check if there's already a container nearby
                let nearbyContainers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                });
                
                let nearbyConstructionSites = source.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                });
                
                // If no container or construction site exists, create one
                if(nearbyContainers.length == 0 && nearbyConstructionSites.length == 0 && positions.length > 0) {
                    // Place at the first available position
                    let pos = new RoomPosition(positions[0].x, positions[0].y, room.name);
                    room.createConstructionSite(pos, STRUCTURE_CONTAINER);
                }
            }
            
            // Check for hostiles and construction sites
            const hostiles = room.find(FIND_HOSTILE_CREEPS);
            const constructionSites = room.find(FIND_CONSTRUCTION_SITES);
            
            // Check if we have storage or terminal before spawning mineral harvesters
            const hasStorage = room.find(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_STORAGE || 
                            s.structureType == STRUCTURE_TERMINAL
            }).length > 0;

            // Check for lootable resources
            const hasLoot = room.find(FIND_DROPPED_RESOURCES).length > 0 ||
                          room.find(FIND_TOMBSTONES, {filter: t => t.store.getUsedCapacity() > 0}).length > 0 ||
                          room.find(FIND_RUINS, {filter: r => r.store.getUsedCapacity() > 0}).length > 0;

            // Check for structures needing repair
            const structuresNeedingRepair = room.find(FIND_STRUCTURES, {
                filter: object => {
                    const maxHits = (object.structureType === STRUCTURE_WALL || 
                                   object.structureType === STRUCTURE_RAMPART) ? 10000 : object.hitsMax;
                    return object.hits < maxHits;
                }
            });

            // Predict next spawn
            let nextRole = '';
            if(harvesters.length < 3) {  // Changed from 4 to 3
                nextRole = 'harvester';
            }
            else if(upgraders.length < 2) {  // Changed from 3 to 2
                nextRole = 'upgrader';
            }
            else if(constructionSites.length > 0 && builders.length < 2) {
                nextRole = 'builder';
            }
            else if(structuresNeedingRepair.length > 0 && repairers.length < 2) {  // Only if repairs needed
                nextRole = 'repairer';
            }
            else if(hasLoot && scavengers.length < 2) {  // Only spawn if there's loot
                nextRole = 'scavenger';
            }
            else if(healers.length < 2) {  // Moved before fighters
                nextRole = 'healer';
            }
            else if(hostiles.length > 0 && fighters.length < 4) {  // Only spawn fighters if there are hostiles
                nextRole = 'fighter';
            }
            else if(hasStorage && mineralHarvesters.length < 1 && room.controller.level >= 6) {
                nextRole = 'mineralHarvester';
            }

            if(nextRole && !Game.spawns['Spawn1'].spawning) {
                const isAdvanced = (nextRole === 'harvester' && room.energyAvailable >= 700) ||
                                  (nextRole === 'upgrader' && room.energyAvailable >= 850) ||
                                  (nextRole === 'builder' && room.energyAvailable >= 700) ||
                                  (nextRole === 'repairer' && room.energyAvailable >= 500);
                console.log('🛠️ Next spawn will be: ' + nextRole + (isAdvanced ? '⭐' : '') +
                    ' (Current counts - H:' + harvesters.length + 
                    ' S:' + scavengers.length +
                    ' F:' + fighters.length +
                    ' HL:' + healers.length +
                    ' U:' + upgraders.length +
                    ' B:' + builders.length +
                    ' M:' + mineralHarvesters.length + 
                    ' R:' + repairers.length + ')');
            }

            // Spawn more creeps if needed
            if(harvesters.length < 3) {  // Changed from 4 to 3
                spawnCreep('harvester');
            }
            else if(upgraders.length < 2) {  // Changed from 3 to 2
                spawnCreep('upgrader');
            }
            else if(constructionSites.length > 0 && builders.length < 2) {
                spawnCreep('builder');
            }
            else if(structuresNeedingRepair.length > 0 && repairers.length < 2) {  // Only if repairs needed
                spawnCreep('repairer');
            }
            else if(hasLoot && scavengers.length < 2) {  // Only spawn if there's loot
                spawnCreep('scavenger');
            }
            else if(healers.length < 2) {  // Moved before fighters
                spawnCreep('healer');
            }
            else if(hostiles.length > 0 && fighters.length < 4) {  // Only spawn fighters if there are hostiles
                spawnCreep('fighter');
            }
            else if(hasStorage && mineralHarvesters.length < 1 && room.controller.level >= 6) {
                spawnCreep('mineralHarvester');
            }
            // Spawn invader if we have enough energy and need one
            if(room.energyAvailable >= 1300 && invaders.length < 1) {  // CLAIM part costs 600
                spawnCreep('invader', {targetRoom: targetRoom});
            }

            // Run spawning visual
            if(Game.spawns['Spawn1'].spawning) { 
                let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
                Game.spawns['Spawn1'].room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    Game.spawns['Spawn1'].pos.x + 1, 
                    Game.spawns['Spawn1'].pos.y, 
                    {align: 'left', opacity: 0.8});
            }

            // Display energy info
            room.visual.text(
                `Energy: ${room.energyAvailable}/${room.energyCapacityAvailable}`,
                1, 1, {align: 'left'}
            );
        }
    }

    // Run creep roles
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        
        // Debug movement and show state
        creepUtils.debugMovement(creep);
        creepUtils.visualizeState(creep);

        // Track confused behavior
        if(!creep.memory.lastPos) {
            creep.memory.lastPos = {x: creep.pos.x, y: creep.pos.y};
            creep.memory.stuckTicks = 0;
        } else if(creep.memory.lastPos.x === creep.pos.x && 
                 creep.memory.lastPos.y === creep.pos.y) {
            creep.memory.stuckTicks = (creep.memory.stuckTicks || 0) + 1;
        } else {
            creep.memory.stuckTicks = 0;
            creep.memory.lastPos = {x: creep.pos.x, y: creep.pos.y};
        }
        
        // Recycle if stuck or confused
        if((creep.memory.stuckTicks > 20 || 
            creep.memory.currentTask === 'idle' && Game.time % 10 === 0) && 
           harvesters.length >= 2 && 
           Game.spawns['Spawn1'].room.energyAvailable >= 300) {
            
            console.log(`Recycling stuck creep: ${creep.name} (${creep.memory.role})`);
            console.log(`   Stuck for ${creep.memory.stuckTicks} ticks`);
            console.log(`   Position: ${creep.pos}, Energy: ${creep.store.getUsedCapacity()}, Age: ${creep.ticksToLive}`);
            console.log(`   Last task: ${creep.memory.lastFallbackTask || 'none'}`);
            creep.memory.currentTask = 'recycling';
            creep.suicide();
            Memory.creepCounts[creep.memory.role]--;
            continue;
        }
        
        // Run role logic
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'fighter') {
            roleFighter.run(creep);
        }
        if(creep.memory.role == 'mineralHarvester') {
            roleMineralHarvester.run(creep);
        }
        if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
        if(creep.memory.role == 'scavenger') {
            roleScavenger.run(creep);
        }
        if(creep.memory.role == 'invader') {
            roleInvader.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }

        // Add debug logging
        if(creep.memory.currentTask === 'idle') {
            console.log(`${creep.name} is idle! Role: ${creep.memory.role}, Pos: ${creep.pos}, Energy: ${creep.store.getUsedCapacity()}`);
        }
    }
}

function spawnCreep(role, extraMemory = {}) {
    // Initialize creep counters if they don't exist
    if(!Memory.creepCounts) {
        Memory.creepCounts = {
            harvester: 0,
            builder: 0,
            upgrader: 0,
            fighter: 0
        };
    }
    
    // Increment the counter for this role
    Memory.creepCounts[role]++;
    
    // Create name based on role prefix and count
    const prefixes = {
        harvester: '🔨 Harvester_',
        builder: '🏗️ Builder_',
        upgrader: '⚡ Upgrader_',
        fighter: '⚔️ Fighter_',
        mineralHarvester: '⛏️ Mineral_',
        healer: '💉 Healer_',
        scavenger: '📦 Scavenger_',
        repairer: '🔧 Repairer_'
    };
    
    const energy = Game.spawns['Spawn1'].room.energyAvailable;
    const bodyParts = getBodyParts(role, energy);
    
    // Log body part information before spawning
    creepUtils.logBodyInfo(bodyParts);
    
    const isAdvanced = (role === 'harvester' && energy >= 700) ||
                      (role === 'upgrader' && energy >= 850) ||
                      (role === 'builder' && energy >= 700) ||
                      (role === 'repairer' && energy >= 500);
    
    let newName = prefixes[role];
    newName += isAdvanced ? '⭐' : '';  // Add star to advanced names
    newName += Memory.creepCounts[role];
    
    return Game.spawns['Spawn1'].spawnCreep(bodyParts, newName, 
        {memory: {...extraMemory, role: role, advanced: isAdvanced}});
}