module.exports = {
    shouldReturnToSpawn: function(creep) {
        // Don't return to spawn if being renewed
        if(creep.memory.beingRenewed) return false;
        return creep.ticksToLive < 100;  // Increased threshold to start renewal earlier
    },

    returnToSpawn: function(creep) {
        const spawn = Game.spawns['Spawn1'];
        creep.moveTo(spawn, {
            visualizePathStyle: {stroke: '#ff0000'},
            reusePath: 5
        });
        creep.say('☠️ ' + creep.ticksToLive);
        return true;
    },

    needsRenewal: function(creep) {
        return creep.ticksToLive < 1000;
    },

    calculateBodyCost: function(body) {
        return body.reduce((cost, part) => cost + BODYPART_COST[part], 0);
    },

    logBodyInfo: function(bodyParts) {
        if(!bodyParts || bodyParts.length === 0) return;
        
        let cost = _.sum(bodyParts.map(part => BODYPART_COST[part]));
        console.log(`Body parts: ${bodyParts.join(', ')} (Cost: ${cost})`);
    },
    
    debugMovement: function(creep) {
        // Visualize the creep's path and target
        if(creep.memory._move) {
            const pos = creep.memory._move.dest;
            creep.room.visual.circle(pos.x, pos.y, {fill: 'transparent', radius: 0.25, stroke: 'red'});
            
            if(creep.memory._move.path) {
                const path = Room.deserializePath(creep.memory._move.path);
                for(let i = 0; i < path.length; i++) {
                    creep.room.visual.circle(path[i].x, path[i].y, {
                        fill: 'transparent',
                        radius: 0.15,
                        stroke: 'yellow',
                        opacity: 0.3
                    });
                }
            }
        }
    },

    visualizeState: function(creep) {
        // Show role and status above creep
        let roleEmoji = {
            harvester: '⛏️',
            builder: '🏗️',
            upgrader: '⚡',
            fighter: '⚔️',
            healer: '💉',
            mineralHarvester: '⛏️',
            scavenger: '📦',
            repairer: '🔧',
            invader: '🚩'
        }[creep.memory.role] || '❓';

        // Show energy status if applicable
        let energyStatus = '';
        if(creep.store.getCapacity() > 0) {
            let percentage = Math.floor((creep.store.getUsedCapacity() / creep.store.getCapacity()) * 100);
            energyStatus = ` ${percentage}%`;
        }

        // Show current action
        let status = creep.memory.currentTask || creep.memory.lastFallbackTask || 'idle';
        
        creep.room.visual.text(
            `${roleEmoji} ${status}${energyStatus}`,
            creep.pos.x,
            creep.pos.y - 0.5,
            {align: 'center', opacity: 0.8}
        );

        // Show health bar if damaged
        if(creep.hits < creep.hitsMax) {
            let percentage = creep.hits / creep.hitsMax;
            creep.room.visual.rect(
                creep.pos.x - 0.5,
                creep.pos.y - 0.75,
                1,
                0.1,
                {fill: 'transparent', stroke: '#ff0000'}
            );
            creep.room.visual.rect(
                creep.pos.x - 0.5,
                creep.pos.y - 0.75,
                percentage,
                0.1,
                {fill: '#ff0000', stroke: 'transparent'}
            );
        }
    }
};
