module.exports = {
    getFallbackTask: function(creep) {
        // Don't give fallback tasks to specialized roles
        if(['fighter', 'healer', 'invader'].includes(creep.memory.role)) {
            return null;
        }

        // Check if creep is almost dead
        if(creep.ticksToLive < 100) {
            return null;  // Let it finish its current task
        }

        const canWork = creep.getActiveBodyparts(WORK) > 0;
        const canCarry = creep.getActiveBodyparts(CARRY) > 0;

        // Priority tasks based on role and capabilities
        if(canCarry && creep.store.getUsedCapacity() > 0) {
            // Prioritize energy delivery for harvester role
            if(creep.memory.role === 'harvester') {
                const energyTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => (s.structureType == STRUCTURE_SPAWN ||
                                s.structureType == STRUCTURE_EXTENSION ||
                                s.structureType == STRUCTURE_TOWER) &&
                                s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });
                if(energyTarget) {
                    return {task: 'transfer', target: energyTarget};
                }
            }

            // Other roles can help with energy after their primary tasks
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => (s.structureType == STRUCTURE_STORAGE ||
                            s.structureType == STRUCTURE_CONTAINER) &&
                            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            if(target) {
                return {task: 'transfer', target: target};
            }
        }

        if(canWork && creep.store.getFreeCapacity() == 0) {
            // Builders and repairers shouldn't steal each other's tasks
            if(creep.memory.role !== 'repairer') {
                const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(constructionSite) {
                    return {task: 'build', target: constructionSite};
                }
            }
            
            if(creep.memory.role !== 'builder') {
                const repairTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => s.hits < s.hitsMax && s.hits < 10000
                });
                if(repairTarget) {
                    return {task: 'repair', target: repairTarget};
                }
            }

            // Upgrading is lowest priority
            if(creep.room.controller) {
                return {task: 'upgrade', target: creep.room.controller};
            }
        }

        // If can carry but empty, collect dropped resources
        if(canCarry && creep.store.getFreeCapacity() > 0 && creep.memory.role !== 'scavenger') {
            const dropped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if(dropped) {
                return {task: 'pickup', target: dropped};
            }
        }

        return null;
    },

    executeFallbackTask: function(creep, task) {
        if(!task) return false;

        switch(task.task) {
            case 'transfer':
                if(creep.transfer(task.target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(task.target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            case 'build':
                if(creep.build(task.target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(task.target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            case 'repair':
                if(creep.repair(task.target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(task.target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            case 'upgrade':
                if(creep.upgradeController(task.target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(task.target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            case 'attack':
                if(creep.attack(task.target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(task.target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            case 'heal':
                if(creep.heal(task.target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(task.target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
            case 'pickup':
                if(creep.pickup(task.target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(task.target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
        }
        return false;
    }
};
