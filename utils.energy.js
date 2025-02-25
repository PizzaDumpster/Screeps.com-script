module.exports = {
    getBestSource: function(creep) {
        // Find all sources in the room
        const sources = creep.room.find(FIND_SOURCES_ACTIVE);
        
        if(sources.length === 0) return null;
        
        // Simple fix: just return the closest source
        return creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    },

    getEnergyTarget: function(creep) {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                if(structure.structureType == STRUCTURE_SPAWN ||
                   structure.structureType == STRUCTURE_EXTENSION) {
                    return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
                if(structure.structureType == STRUCTURE_TOWER) {
                    return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 100;
                }
                if(structure.structureType == STRUCTURE_STORAGE) {
                    return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                           creep.room.energyAvailable == creep.room.energyCapacityAvailable;
                }
                return false;
            }
        });
    }
};
