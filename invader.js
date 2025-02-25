module.exports = {
    run: function(creep) {
        // If not in target room, move to it
        if(creep.room.name !== creep.memory.targetRoom) {
            const exitDir = Game.map.findExit(creep.room, creep.memory.targetRoom);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit, {
                visualizePathStyle: {stroke: '#ff00ff'},
                reusePath: 50
            });
            creep.say('🏃 ' + creep.memory.targetRoom);
            return;
        }

        // Once in target room, claim or reserve controller
        const controller = creep.room.controller;
        if(controller) {
            if(!controller.my) {
                if(creep.claimController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('🎯');
                }
            }
        }
    }
};
