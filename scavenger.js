const energyUtils = require('utils.energy');
const roleTemplate = require('roleTemplate');

module.exports = {
    run: function(creep) {
        roleTemplate.run.call(this, creep);
    },

    runPrimaryRole: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            const target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                return true;
            }
            
            // Check tombstones and ruins
            const tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                filter: t => t.store.getUsedCapacity() > 0
            });
            if(tombstone) {
                const resourceType = Object.keys(tombstone.store)[0];
                if(creep.withdraw(tombstone, resourceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tombstone, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                return true;
            }
            
            return false;
        } else {
            // Transfer to storage or spawn
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => (s.structureType == STRUCTURE_STORAGE ||
                            s.structureType == STRUCTURE_SPAWN) &&
                            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            }
            return false;
        }
    }
};
