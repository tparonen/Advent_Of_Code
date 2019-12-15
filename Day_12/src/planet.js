class Planet {

    constructor(x, y, z) {
        this.position = {x, y, z};
        this.velocity = {x: 0, y: 0, z: 0};
    }

    equalTo(other) {
        return (
            this.position.x === other.position.x &&
            this.position.y === other.position.y &&
            this.position.z === other.position.z &&
            this.velocity.x === other.velocity.x &&
            this.velocity.y === other.velocity.y &&
            this.velocity.z === other.velocity.z
        );
    }

    toString() {
        const { x: px, y: py, z: pz } = this.position;
        const { x: vx, y: vy, z: vz } = this.velocity;
        return `pos=[x=${px}, y=${py}, z=${pz}], vel=[x=${vx}, y=${vy}, z=${vz}]`
    }
}

module.exports.Planet = Planet;