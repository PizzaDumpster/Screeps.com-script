module.exports = {
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            // Find mineral deposit
            const mineral = creep.room.find(FIND_MINERALS)[0];
            if(mineral) {
                // Check if extractor exists
                const extractor = mineral.pos.lookFor(LOOK_STRUCTURES).find(
                    structure => structure.structureType === STRUCTURE_EXTRACTOR
                );
                
                if(!extractor) {
                    // Build extractor if none exists
                    mineral.pos.createConstructionSite(STRUCTURE_EXTRACTOR);
                    creep.say('🏗️ Need Extractor');
                    return;
                }

                if(creep.harvest(mineral) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mineral, {visualizePathStyle: {stroke: '#ff00ff'}});
                }
            }
        }
        else {
            // Find storage or terminal
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE ||
                            structure.structureType == STRUCTURE_TERMINAL) &&
                            structure.store.getFreeCapacity() > 0;
                }
            });
            
            if(target) {
                if(creep.transfer(target, Object.keys(creep.store)[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};
