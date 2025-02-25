const creepUtils = require('utils.creep');
const roleTemplate = require('roleTemplate');

module.exports = {
    run: function(creep) {
        roleTemplate.run.call(this, creep);
    },

    runPrimaryRole: function(creep) {
        const target = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
            filter: c => c.hits < c.hitsMax
        });
        if(target) {
            if(creep.heal(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            creep.say('💉');
            return true;
        }
        return false;
    }
};
