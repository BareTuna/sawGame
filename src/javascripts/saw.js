class Saw {
    constructor(x, y, isBlaster = false, ttl = -1) {
        this.x = x
        this.y = y
        this.w = 20
        this.xSpeed = 4.5
        this.ySpeed = 4.5
        this.going = false
        this.gotFar = false
        this.return = false
        this.isBlaster = isBlaster
        this.ttl = ttl
        this.hitOne = false
        this.hitCount = 0
    }
    update() {
        let hit = false
        if (this.ttl > 0) {
            this.ttl--
        }
        if (this.x >= 400 - this.w / 2) {
            this.xSpeed *= -1
            this.x = 400 - this.w / 2
            hit = true
        }
        if (this.x <= 0 + this.w / 2) {
            this.xSpeed *= -1
            this.x = 0 + this.w / 2
            hit = true
        }
        if (this.y >= 400 - this.w / 2) {
            this.ySpeed *= -1
            this.y = 400 - this.w / 2
            hit = true
        }
        if (stage == COLUMNSTAGE) {
            if (this.y <= 100 + this.w / 2) {
                this.ySpeed *= -1
                this.y = 100 + this.w / 2
                hit = true
                if (bosses.length >= 1) {
                    if (bosses[0].type == COLUMNLORD) {
                        bosses[0].health -= 2
                    }
                }
            }
        } else {
            if (this.y <= 0 + this.w / 2) {
                this.ySpeed *= -1
                this.y = 0 + this.w / 2
                hit = true
            }
        }
        if (stage == DREVILSTAGE && bosses.length > 0) {
            if (dist(this.x, this.y, 200, 0) < 150 / 2 + this.w / 2) {
                let bossPosition = createVector(200, 0)
                let sawPosition = createVector(this.x, this.y)
                let sawVelocity = createVector(this.xSpeed, this.ySpeed)
                let line = p5.Vector.sub(sawPosition, bossPosition)
                line.setMag(150 / 2 + this.w / 2)
                line.add(bossPosition)
                this.x = line.x
                this.y = line.y

                // Compute the normal vector from dome center to the ball
                let normalVector = p5.Vector.sub(sawPosition, bossPosition)
                normalVector.normalize()

                // Reflect the velocity over the normal vector
                let dot = sawVelocity.dot(normalVector)
                let reflection = p5.Vector.sub(sawVelocity, p5.Vector.mult(normalVector, 2 * dot))
                reflection.div(2)
                // Set the new velocity
                this.setSpeed(reflection.x, reflection.y)
                bosses[0].health -= 5
            }
            this.hit = true
        }
        this.x += this.xSpeed
        this.y += this.ySpeed

        if (hit == true && !this.isBlaster) {
            this.ySpeed *= 0.6
            this.xSpeed *= 0.6
            this.hitCount++
        }
        if (dist(this.x, this.y, player.x, player.y) > 40) {
            this.gotFar = true
        }
        if (dist(this.x, this.y, player.x, player.y) < 40 && this.gotFar) {
            this.going = true
        } else {
            this.going = false
        }

        if (this.going && !this.isBlaster) {
            let cringe = goToward(this.x, this.y, player.x, player.y)
            this.xSpeed = cringe.x * 4.5
            this.ySpeed = cringe.y * 4.5
        }

        this.going = false

        if (this.return && !this.isBlaster) {
            let cringe = goToward(this.x, this.y, player.x, player.y)
            this.xSpeed = cringe.x * 7
            this.ySpeed = cringe.y * 7
            if ((dist(this.x, this.y, player.x, player.y) < 40 && this.gotFar) || player.hasSaw == true) {
                this.return = false
            }
        }

        if (this.hitCount == 4) {
            for (let i = 0; i < heldPowerups.length; i++) {
                if (heldPowerups[i].type == TBOUNCE) {
                    heldPowerups[i].activate()
                }
            }
            this.hitCount++
        }
    }
    check(x, y) {
        if (dist(this.x, this.y, x, y) < 20) {
            return true
        }
    }
    show() {
        if (this.isBlaster) {
            push()
            fill(200, 200, 255)
            ellipse(this.x, this.y, 20, 20)
            pop()
        } else {
            push()
            fill(200, 255, 200)
            ellipse(this.x, this.y, 20, 20)
            pop()
        }
    }
    setSpeed(x, y) {
        this.xSpeed = x
        this.ySpeed = y
    }
}
