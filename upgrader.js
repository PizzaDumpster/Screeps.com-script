const roleTemplate = require('roleTemplate');
const energyUtils = require('utils.energy');

module.exports = {
    run: function(creep) {
        roleTemplate.run.call(this, creep);
    },

    runPrimaryRole: function(creep) {
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        } else {
            if(!creep.memory.sourceId) {
                const source = energyUtils.getBestSource(creep);
                if(source) {
                    creep.memory.sourceId = source.id;
                }
            }
            
            const source = Game.getObjectById(creep.memory.sourceId);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return true;
        }
    }
};