const roleTemplate = require('roleTemplate');
const energyUtils = require('utils.energy');

module.exports = {
    run: function(creep) {
        roleTemplate.run.call(this, creep);
    },

    runPrimaryRole: function(creep) {
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.memory.currentTask = 'harvesting';
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.memory.currentTask = 'building';
        }

        if(creep.memory.building) {
            const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(constructionSite) {
                if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite, {
                        visualizePathStyle: {stroke: '#ffffff'}
                    });
                }
                creep.memory.currentTask = `building ${constructionSite.structureType} ${Math.floor(constructionSite.progress / constructionSite.progressTotal * 100)}%`;
                return true;
            }
            return false;  // No construction sites found
        } else {
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(source) {
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {
                        visualizePathStyle: {stroke: '#ffaa00'}
                    });
                }
                creep.memory.currentTask = 'harvesting';
                return true;
            }
            return false;  // No source found
        }
    }
};