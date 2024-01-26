import p5 from 'p5'
import React, { useEffect } from 'react'

export const HomeProcessing: React.FC = () => {

    useEffect(() => {
        new p5(processing)
    }, [processing])

    return (<></>)
}

const processing = (p: p5) => {

    const Stage = {
        SCALING: 0,
        CIRCLE: 1,
        LINE: 2,
    };

    let alphabetArray = Array.from(Array(26)).map((_, i) => String.fromCharCode(65 + i))
    let particles: Particle[] = [];
    let getTogether = false;
    const english = "ENGLISH";
    const textSize = 32;


    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        alphabetArray.sort(() => Math.random() - 0.5);
        alphabetArray.forEach((alphabet, index) => {
            let x = xPosition();
            let y = yPosition();

            const particle = new Particle(alphabet, p.createVector(x, y));
            particles.push(particle);
        })
    }

    p.draw = () => {
        p.background(255);
        if (getTogether) {
            arrangeInCircle();
        }

        particles.forEach((particle, index) => {
            particle.update(particles.filter((value) => value !== particle));
        });
    }

    p.mousePressed = () => {
        getTogether = true;
    }

    p.mouseReleased = () => {
        getTogether = false;
    }

    function xPosition() {
        return p.random(p.width);
    }

    function yPosition() {
        return p.random(p.height);
    }

    function circleXPosition(index: number, alphabetArrayLength = alphabetArray.length) {
        return p.width / 2 + p.width / 3 * Math.cos(index / alphabetArrayLength * 2 * Math.PI);
    }

    function circleYPosition(index: number, alphabetArrayLength = alphabetArray.length) {
        return p.height / 2 + p.height / 3 * Math.sin(index / alphabetArrayLength * 2 * Math.PI);
    }

    function arrangeInCircle() {
        for (let i = 0; i < english.length; i++) {
            let particle = particles.find(particle => particle.word == english[i]);

            if (!particle) { continue; }
            const expectX = p.width / 2 + i * 2 * textSize - (english.length * textSize - textSize);
            const expectY = p.height / 2;
            const diffX = expectX - particle.position.x;
            const diffY = expectY - particle.position.y;
            const newPosition = p.createVector(particle.position.x + diffX / 10, particle.position.y + diffY / 10);
            particle.position = newPosition;
        }

        const particlesWithoutEnglish = particles.filter(particle => !english.includes(particle.word));
        particlesWithoutEnglish.forEach((particle, index) => {
            const expectX = circleXPosition(index, particlesWithoutEnglish.length);
            const expectY = circleYPosition(index, particlesWithoutEnglish.length);
            const diffX = expectX - particle.position.x;
            const diffY = expectY - particle.position.y;
            const newPosition = p.createVector(particle.position.x + diffX / 10, particle.position.y + diffY / 10);
            particle.position = newPosition;
        });
    }

    class Particle {
        word: string;
        position: p5.Vector;
        velocity: p5.Vector;
        acceleration: p5.Vector;
        maxSpeed: number;
        maxForce: number;
        rotation: number = 0.01;
        color: p5.Color = p.color(0, 0, 0);
        scale: number = 1;

        constructor(word: string, position: p5.Vector) {
            this.word = word;
            this.position = position;
            this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
            this.acceleration = p.createVector();
            this.maxSpeed = 2;
            this.maxForce = 0.1;
        }

        update(particles: Particle[]) {
            this.expand();

            let angleChange = this.rotation >= 0 ? p.random(0, this.rotation) : p.random(this.rotation, 0);
            this.velocity.rotate(angleChange);

            if (this.position.x > p.width) {
                this.position.x = p.width;
                this.velocity.x *= -1;
            } else if (this.position.x < 0) {
                this.position.x = 0;
                this.velocity.x *= -1;
            }
            if (this.position.y > p.height) {
                this.position.y = p.height;
                this.velocity.y *= -1;
            } else if (this.position.y < 0) {
                this.position.y = 0;
                this.velocity.y *= -1;
            }

            this.velocity.add(this.acceleration);
            this.velocity.limit(this.maxSpeed);
            this.position.add(this.velocity);
            this.acceleration.mult(0);

            this.flock(particles);

            this.display();
        }

        applyForce(force: p5.Vector) {
            this.acceleration.add(force);
        }

        flock(particles: Particle[]) {

            let separationRadius = textSize * 2 * this.scale;
            let separationForce = p.createVector(); // Initialize separation force vector

            // Check each particle for proximity
            particles.forEach(otherParticle => {
                if (otherParticle !== this) {
                    let distance = p5.Vector.dist(this.position, otherParticle.position);
                    if (distance < separationRadius) {
                        let diff = p5.Vector.sub(this.position, otherParticle.position);
                        diff.normalize();
                        diff.div(distance); // Weight by distance
                        separationForce.add(diff);
                    }
                }
            });

            if (separationForce.mag() > 0) {
                this.color = p.color(0, 0, 0);
                this.rotation = this.rotation * -1;
                separationForce.setMag(this.maxSpeed);
                separationForce.sub(this.velocity);
                separationForce.limit(this.maxForce);
                this.applyForce(separationForce);
            }
        }

        display() {
            p.push();
            p.translate(this.position.x, this.position.y);
            p.rotate(this.velocity.heading());

            this.displayCircle();

            p.fill(this.color);
            p.textSize(textSize * this.scale);
            p.text(this.word, 0 - p.textWidth(this.word) / 2, 12 * this.scale);

            p.pop();
        }

        displayCircle() {
            p.noFill();
            p.stroke(this.color);
            p.strokeWeight(1);
            p.circle(0, 0, textSize * 2 * this.scale);
        }

        expand() {
            const isMouseXInRange = p.mouseX > this.position.x - textSize * this.scale && p.mouseX < this.position.x + textSize * this.scale;
            const isMouseYInRange = p.mouseY > this.position.y - textSize * this.scale && p.mouseY < this.position.y + textSize * this.scale;
            if (isMouseXInRange && isMouseYInRange) {
                this.scale = 2;
                if (english.includes(this.word)) {
                    this.color = p.color(255, 0, 0);
                    const eParticle = particles.find((particle) => particle.word === "E");
                    const nParticle = particles.find((particle) => particle.word === "N");
                    const gParticle = particles.find((particle) => particle.word === "G");
                    const lParticle = particles.find((particle) => particle.word === "L");
                    const iParticle = particles.find((particle) => particle.word === "I");
                    const sParticle = particles.find((particle) => particle.word === "S");
                    const hParticle = particles.find((particle) => particle.word === "H");
                    if (eParticle && nParticle && gParticle && lParticle && iParticle && sParticle && hParticle) {
                        eParticle.color = p.color(255, 0, 0);
                        nParticle.color = p.color(255, 0, 0);
                        gParticle.color = p.color(255, 0, 0);
                        lParticle.color = p.color(255, 0, 0);
                        iParticle.color = p.color(255, 0, 0);
                        sParticle.color = p.color(255, 0, 0);
                        hParticle.color = p.color(255, 0, 0);
                    }
                }
            } else {
                this.scale = 1;
            }
        }
    }
}