const energyUtils = require('utils.energy');
const taskUtils = require('utils.tasks');

module.exports = {
    run: function(creep) {
        // Clear current task at start of tick
        creep.memory.currentTask = null;
        
        // Primary role logic first
        const primaryResult = this.runPrimaryRole(creep);
        if(primaryResult) {
            creep.memory.currentTask = creep.memory.currentTask || creep.memory.role;
            return;
        }

        // If primary role had nothing to do, try fallback tasks
        const fallbackTask = taskUtils.getFallbackTask(creep);
        if(fallbackTask) {
            if(taskUtils.executeFallbackTask(creep, fallbackTask)) {
                creep.memory.currentTask = fallbackTask.task;
                return;
            }
        }

        // If truly idle, move randomly
        creep.memory.currentTask = 'idle';
        
        if(!creep.memory.idlePosition || 
           (creep.pos.x === creep.memory.idlePosition.x && creep.pos.y === creep.memory.idlePosition.y)) {
            creep.memory.idlePosition = {
                x: 25 + Math.floor(Math.random() * 20),
                y: 25 + Math.floor(Math.random() * 20)
            };
        }
        
        creep.moveTo(creep.memory.idlePosition.x, creep.memory.idlePosition.y, {
            visualizePathStyle: {stroke: '#ffffff', opacity: 0.3}
        });
    },

    runPrimaryRole: function(creep) {
        // Override this method in each role file
        return false;
    }
};
