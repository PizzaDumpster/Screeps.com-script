const roleTemplate = require('roleTemplate');
const energyUtils = require('utils.energy');

module.exports = {
    run: function(creep) {
        roleTemplate.run.call(this, creep);
    },

    runPrimaryRole: function(creep) {
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🔧 repair');
        }

        if(creep.memory.repairing) {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => {
                    const maxHits = (object.structureType === STRUCTURE_WALL || 
                                   object.structureType === STRUCTURE_RAMPART) ? 10000 : object.hitsMax;
                    return object.hits < maxHits;
                }
            });

            targets.sort((a, b) => (a.hits / a.hitsMax) - (b.hits / b.hitsMax));

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                creep.memory.currentTask = 'repair ' + Math.floor(targets[0].hits / targets[0].hitsMax * 100) + '%';
                return true;
            }
            return false;
        } else {
            if(!creep.memory.sourceId) {
                const source = energyUtils.getBestSource(creep);
                if(source) {
                    creep.memory.sourceId = source.id;
                }
            }
            
            const source = Game.getObjectById(creep.memory.sourceId);
            if(source) {
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                creep.memory.currentTask = 'harvesting';
                return true;
            }
            return false;
        }
    }
};
