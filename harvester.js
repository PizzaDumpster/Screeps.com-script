const roleTemplate = require('roleTemplate');
const energyUtils = require('utils.energy');

module.exports = {
    run: function(creep) {
        roleTemplate.run.call(this, creep);
    },

    runPrimaryRole: function(creep) {
        creep.memory.currentTask = creep.store.getFreeCapacity() > 0 ? 'harvesting' : 'transferring';
        
        if(creep.store.getFreeCapacity() > 0) {
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(source) {
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                return true;
            }
        } else {
            // First try to transfer to Spawn1
            const spawn = Game.spawns['Spawn1'];
            if(spawn && spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                creep.memory.currentTask = 'transferring to Spawn1';
                return true;
            }

            // If Spawn1 is full, then look for other structures
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            }
        }
        
        return false;
    }
};